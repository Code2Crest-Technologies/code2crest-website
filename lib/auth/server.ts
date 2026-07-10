import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MembershipRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { getPortalHref } from "@/lib/config/public-url";
import {
  SESSION_COOKIE_NAME,
  type AuthSession,
  verifySessionToken,
} from "@/lib/auth/session";

export async function getCurrentSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  return verifySessionToken(token);
}

export async function requirePortalSession() {
  const session = await getCurrentSession();

  if (!session) {
    redirect(getPortalHref("/login"));
  }

  return session;
}

export async function getCurrentUser() {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getCurrentCompany() {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  const membership = await prisma.membership.findFirst({
    where: {
      userId: session.userId,
      companyId: session.activeCompanyId,
      isActive: true,
    },
    include: {
      company: {
        include: {
          owner: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: { memberships: true },
          },
        },
      },
    },
  });

  if (!membership) {
    return null;
  }

  return {
    company: {
      id: membership.company.id,
      name: membership.company.name,
      slug: membership.company.slug,
      workspace: "Code2Crest Hub",
      plan: "Founder Preview",
      members: membership.company._count.memberships,
      status: membership.company.status,
      website: membership.company.website,
      phone: membership.company.phone,
      address: membership.company.address,
      city: membership.company.city,
      state: membership.company.state,
      country: membership.company.country,
      postalCode: membership.company.postalCode,
      gstin: membership.company.gstin,
      timezone: membership.company.timezone,
      logoUrl: membership.company.logoUrl,
      createdAt: membership.company.createdAt.toISOString(),
      owner: membership.company.owner,
    },
    membershipRole: membership.role,
  };
}

export async function getAuthContext() {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return null;
  }

  const membership = await prisma.membership.findFirst({
    where: {
      userId: session.userId,
      companyId: session.activeCompanyId,
      isActive: true,
    },
    include: {
      company: {
        include: {
          owner: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: { memberships: true },
          },
        },
      },
    },
  });

  if (!membership) {
    return null;
  }

  return {
    session,
    user,
    activeCompany: {
      id: membership.company.id,
      name: membership.company.name,
      slug: membership.company.slug,
      workspace: "Code2Crest Hub",
      plan: "Founder Preview",
      members: membership.company._count.memberships,
      status: membership.company.status,
      website: membership.company.website,
      phone: membership.company.phone,
      address: membership.company.address,
      city: membership.company.city,
      state: membership.company.state,
      country: membership.company.country,
      postalCode: membership.company.postalCode,
      gstin: membership.company.gstin,
      timezone: membership.company.timezone,
      logoUrl: membership.company.logoUrl,
      createdAt: membership.company.createdAt.toISOString(),
      owner: membership.company.owner,
    },
    membershipRole: membership.role as MembershipRole,
    companyId: membership.company.id,
  };
}

export async function requireAuth() {
  const context = await getAuthContext();

  if (!context) {
    redirect(getPortalHref("/login"));
  }

  return {
    session: context.session,
    user: context.user,
  };
}

export async function requireCompany() {
  const context = await getAuthContext();

  if (!context) {
    redirect(getPortalHref("/login"));
  }

  return {
    session: context.session,
    user: context.user,
    company: context.activeCompany,
    activeCompany: context.activeCompany,
    membershipRole: context.membershipRole,
    companyId: context.companyId,
  };
}
