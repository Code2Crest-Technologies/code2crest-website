import { randomBytes } from "crypto";
import { InviteStatus, MembershipRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { checkPlanLimit } from "@/modules/subscription/server";

export const INVITE_EXPIRES_IN_DAYS = 7;

const allowedInviteRoles = [
  MembershipRole.ADMIN,
  MembershipRole.MANAGER,
  MembershipRole.SALES,
  MembershipRole.VIEWER,
] as const;

export function canManageTeam(role: MembershipRole) {
  return role === MembershipRole.OWNER || role === MembershipRole.ADMIN;
}

export function isMembershipRole(value: unknown): value is MembershipRole {
  return (
    typeof value === "string" &&
    Object.values(MembershipRole).includes(value as MembershipRole)
  );
}

function createInviteToken() {
  return randomBytes(32).toString("base64url");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function teamError(status: number, message: string) {
  return { ok: false as const, status, message };
}

function teamSuccess<T extends object>(status: number, data: T) {
  return { ok: true as const, status, ...data };
}

async function countActiveOwners(companyId: string) {
  return prisma.membership.count({
    where: {
      companyId,
      role: MembershipRole.OWNER,
      isActive: true,
    },
  });
}

async function assertNotOnlyOwner(membershipId: string, companyId: string) {
  const membership = await prisma.membership.findFirst({
    where: { id: membershipId, companyId, isActive: true },
  });

  if (!membership) {
    return teamError(404, "Membership not found.");
  }

  if (membership.role === MembershipRole.OWNER) {
    const ownerCount = await countActiveOwners(companyId);

    if (ownerCount <= 1) {
      return teamError(400, "Cannot change or remove the only OWNER.");
    }
  }

  return teamSuccess(200, { membership });
}

export async function listTeamMembers(companyId: string) {
  return prisma.membership.findMany({
    where: {
      companyId,
      isActive: true,
    },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      role: true,
      isActive: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function createInvite(input: {
  companyId: string;
  email: string;
  role: MembershipRole;
  invitedById: string;
  inviterRole: MembershipRole;
  origin: string;
}) {
  if (!canManageTeam(input.inviterRole)) {
    return teamError(403, "Only OWNER and ADMIN members can invite teammates.");
  }

  if (!allowedInviteRoles.includes(input.role as (typeof allowedInviteRoles)[number])) {
    return teamError(
      400,
      "Invites can be created for ADMIN, MANAGER, SALES, or VIEWER roles.",
    );
  }

  const email = normalizeEmail(input.email);
  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: {
      memberships: {
        where: { companyId: input.companyId, isActive: true },
      },
    },
  });

  if (existingUser?.memberships.length) {
    return teamError(409, "This user is already a member of the company.");
  }

  const userLimit = await checkPlanLimit(input.companyId, "users");

  if (!userLimit.ok) {
    return teamError(userLimit.status, userLimit.message);
  }

  await prisma.invite.updateMany({
    where: {
      companyId: input.companyId,
      email,
      status: InviteStatus.PENDING,
    },
    data: { status: InviteStatus.CANCELLED },
  });

  const invite = await prisma.invite.create({
    data: {
      companyId: input.companyId,
      email,
      role: input.role,
      token: createInviteToken(),
      status: InviteStatus.PENDING,
      expiresAt: new Date(Date.now() + INVITE_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000),
      invitedById: input.invitedById,
    },
  });

  return teamSuccess(201, {
    invite,
    inviteLink: `${input.origin}/register?inviteToken=${invite.token}`,
  });
}

export async function acceptInvite(input: {
  token: string;
  name?: string;
  email?: string;
  password?: string;
}) {
  const invite = await prisma.invite.findUnique({
    where: { token: input.token },
  });

  if (!invite) {
    return teamError(404, "Invite not found.");
  }

  if (invite.status !== InviteStatus.PENDING) {
    return teamError(400, "Invite is no longer pending.");
  }

  if (invite.expiresAt < new Date()) {
    await prisma.invite.update({
      where: { id: invite.id },
      data: { status: InviteStatus.EXPIRED },
    });

    return teamError(400, "Invite has expired.");
  }

  const email = normalizeEmail(input.email ?? invite.email);

  if (email !== invite.email) {
    return teamError(400, "Invite email does not match.");
  }

  let user = await prisma.user.findUnique({ where: { email } });
  const existingMembership = user
    ? await prisma.membership.findUnique({
        where: {
          companyId_userId: {
            companyId: invite.companyId,
            userId: user.id,
          },
        },
      })
    : null;

  if (!existingMembership?.isActive) {
    const userLimit = await checkPlanLimit(invite.companyId, "users");

    if (!userLimit.ok) {
      return teamError(userLimit.status, userLimit.message);
    }
  }

  if (!user) {
    if (!input.name || !input.password) {
      return teamError(
        400,
        "Name and password are required to accept this invite.",
      );
    }

    user = await prisma.user.create({
      data: {
        name: input.name.trim(),
        email,
        passwordHash: await hashPassword(input.password),
      },
    });
  }

  const result = await prisma.$transaction(async (tx) => {
    const membership = await tx.membership.upsert({
      where: {
        companyId_userId: {
          companyId: invite.companyId,
          userId: user!.id,
        },
      },
      update: {
        role: invite.role,
        isActive: true,
      },
      create: {
        companyId: invite.companyId,
        userId: user!.id,
        role: invite.role,
      },
    });

    const acceptedInvite = await tx.invite.update({
      where: { id: invite.id },
      data: { status: InviteStatus.ACCEPTED },
      include: { company: true },
    });

    return { membership, invite: acceptedInvite };
  });

  return teamSuccess(200, {
    user,
    membership: result.membership,
    company: result.invite.company,
  });
}

export async function updateMemberRole(input: {
  companyId: string;
  membershipId: string;
  role: MembershipRole;
  actorRole: MembershipRole;
}) {
  if (!canManageTeam(input.actorRole)) {
    return teamError(403, "Only OWNER and ADMIN members can change roles.");
  }

  const ownerCheck = await assertNotOnlyOwner(input.membershipId, input.companyId);

  if (!ownerCheck.ok) {
    return ownerCheck;
  }

  const membership = await prisma.membership.update({
    where: { id: input.membershipId },
    data: { role: input.role },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return teamSuccess(200, { membership });
}

export async function removeMember(input: {
  companyId: string;
  membershipId: string;
  actorRole: MembershipRole;
}) {
  if (!canManageTeam(input.actorRole)) {
    return teamError(403, "Only OWNER and ADMIN members can remove members.");
  }

  const ownerCheck = await assertNotOnlyOwner(input.membershipId, input.companyId);

  if (!ownerCheck.ok) {
    return ownerCheck;
  }

  const membership = await prisma.membership.update({
    where: { id: input.membershipId },
    data: { isActive: false },
  });

  return teamSuccess(200, { membership });
}
