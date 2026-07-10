"use client";

import {
  membershipRoles,
  type MembershipRole,
} from "@/modules/portal/data/roles";
import { useEffect, useMemo, useState } from "react";
import { FaCopy, FaPaperPlane, FaTriangleExclamation, FaUserMinus } from "react-icons/fa6";

type TeamMember = {
  id: string;
  role: MembershipRole;
  isActive: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type TeamResponse = {
  currentUserId: string;
  currentUserRole: MembershipRole;
  members: TeamMember[];
  invites: PendingInvite[];
};

type PendingInvite = {
  id: string;
  email: string;
  role: MembershipRole;
  status: string;
  expiresAt: string;
  createdAt: string;
  inviteLink: string;
  invitedBy: {
    name: string;
    email: string;
  };
};

const inviteRoles = ["ADMIN", "MANAGER", "SALES", "VIEWER"];

const allRoles = ["OWNER", "ADMIN", "MANAGER", "SALES", "VIEWER"];

function formatRole(role: MembershipRole) {
  return role.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState<MembershipRole | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MembershipRole>("VIEWER");
  const [inviteLink, setInviteLink] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [pendingRemoval, setPendingRemoval] = useState<TeamMember | null>(null);

  const canManage = useMemo(
    () => currentUserRole === "OWNER" || currentUserRole === "ADMIN",
    [currentUserRole],
  );

  async function loadTeam() {
    setIsLoading(true);
    const response = await fetch("/api/team", { cache: "no-store" });
    const data = (await response
      .json()
      .catch(() => null)) as TeamResponse | null;

    if (response.ok && data) {
      setMembers(data.members);
      setInvites(data.invites);
      setCurrentUserId(data.currentUserId);
      setCurrentUserRole(data.currentUserRole);
    } else {
      setMessage("Unable to load team members.");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    void loadTeam();
  }, []);

  async function handleInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setInviteLink("");
    setIsInviting(true);

    const response = await fetch("/api/team/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
      inviteLink?: string;
    } | null;

    setIsInviting(false);

    if (!response.ok) {
      setMessage(data?.message ?? "Unable to create invite.");
      return;
    }

    setInviteLink(data?.inviteLink ?? "");
    setEmail("");
    setRole("VIEWER");
    await loadTeam();
  }

  async function updateRole(membershipId: string, nextRole: MembershipRole) {
    setMessage("");
    const response = await fetch(`/api/team/${membershipId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: nextRole }),
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setMessage(data?.message ?? "Unable to update role.");
      return;
    }

    await loadTeam();
  }

  async function removeMember(membershipId: string) {
    setMessage("");
    const response = await fetch(`/api/team/${membershipId}`, {
      method: "DELETE",
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setMessage(data?.message ?? "Unable to remove member.");
      return;
    }

    await loadTeam();
    setPendingRemoval(null);
  }

  async function cancelInvite(inviteId: string) {
    setMessage("");
    const response = await fetch(`/api/team/invite/${inviteId}`, {
      method: "DELETE",
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      setMessage(data?.message ?? "Unable to cancel invite.");
      return;
    }

    await loadTeam();
  }

  async function copyInviteLink(link: string) {
    await navigator.clipboard.writeText(link);
    setMessage("Invite link copied.");
  }

  return (
    <div className="space-y-6">
      {canManage ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <form
            className="grid gap-4 lg:grid-cols-[1fr_180px_auto]"
            onSubmit={handleInvite}
          >
            <div>
              <label
                htmlFor="inviteEmail"
                className="text-sm font-semibold text-slate-700"
              >
                Invite Email
              </label>
              <input
                id="inviteEmail"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="teammate@company.com"
                className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              />
            </div>
            <div>
              <label
                htmlFor="inviteRole"
                className="text-sm font-semibold text-slate-700"
              >
                Role
              </label>
              <select
                id="inviteRole"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as MembershipRole)
                }
                className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              >
                {inviteRoles.map((inviteRole) => (
                  <option key={inviteRole} value={inviteRole}>
                    {formatRole(inviteRole as MembershipRole)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isInviting}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 lg:w-auto"
              >
                {isInviting ? "Creating..." : "Invite"}
              </button>
            </div>
          </form>

          {inviteLink ? (
            <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm font-semibold text-blue-900">Invite link</p>
              <p className="mt-1 break-all text-sm text-blue-700">
                {inviteLink}
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {membershipRoles.map((memberRole) => (
          <div
            key={memberRole}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70"
          >
            <h3 className="text-sm font-semibold text-slate-950">
              {formatRole(memberRole)}
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {memberRole === "OWNER"
                ? "Full company, billing, product, and team control."
                : memberRole === "ADMIN"
                  ? "Manage settings, billing readiness, products, and team access."
                  : memberRole === "MANAGER"
                    ? "Manage sales workflows and operational activity."
                    : memberRole === "SALES"
                      ? "Work with contacts, deals, tasks, and follow-ups."
                      : "Read-only workspace visibility."}
            </p>
          </div>
        ))}
      </section>

      {message ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {message}
        </p>
      ) : null}

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-200/70">
        <div className="hidden grid-cols-[1.2fr_1.4fr_180px_120px] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase text-slate-500 lg:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Actions</span>
        </div>

        {isLoading ? (
          <div className="px-5 py-6 text-sm text-slate-600">
            Loading team...
          </div>
        ) : null}

        {!isLoading && members.length === 0 ? (
          <div className="px-5 py-6 text-sm text-slate-600">
            No team members found.
          </div>
        ) : null}

        {members.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-1 gap-3 border-b border-slate-100 px-5 py-4 text-sm last:border-b-0 lg:grid-cols-[1.2fr_1.4fr_180px_120px] lg:items-center"
          >
            <span className="font-semibold text-slate-950">
              {member.user.name}
            </span>
            <span className="text-slate-600">{member.user.email}</span>
            {canManage ? (
              <select
                value={member.role}
                onChange={(event) =>
                  updateRole(member.id, event.target.value as MembershipRole)
                }
                className="h-10 rounded-md border-slate-300 text-sm text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              >
                {allRoles.map((memberRole) => (
                  <option key={memberRole} value={memberRole}>
                    {formatRole(memberRole as MembershipRole)}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-slate-600">{formatRole(member.role)}</span>
            )}
            {canManage ? (
              <button
                type="button"
                onClick={() => setPendingRemoval(member)}
                disabled={member.user.id === currentUserId && member.role === "OWNER"}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                <FaUserMinus className="h-3.5 w-3.5" />
                Remove
              </button>
            ) : (
              <span className="text-slate-400">-</span>
            )}
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-200/70">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
          <h2 className="text-sm font-semibold text-slate-950">Pending invites</h2>
        </div>
        {invites.length === 0 ? (
          <div className="px-5 py-6 text-sm text-slate-600">
            No pending invites.
          </div>
        ) : (
          invites.map((invite) => (
            <div
              key={invite.id}
              className="grid gap-3 border-b border-slate-100 px-5 py-4 text-sm last:border-b-0 lg:grid-cols-[1fr_140px_1fr_220px] lg:items-center"
            >
              <span className="font-semibold text-slate-950">{invite.email}</span>
              <span className="text-slate-600">{formatRole(invite.role)}</span>
              <span className="truncate text-slate-500">{invite.inviteLink}</span>
              {canManage ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyInviteLink(invite.inviteLink)}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <FaCopy className="h-3 w-3" />
                    Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => copyInviteLink(invite.inviteLink)}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <FaPaperPlane className="h-3 w-3" />
                    Resend
                  </button>
                  <button
                    type="button"
                    onClick={() => cancelInvite(invite.id)}
                    className="inline-flex h-9 items-center rounded-md border border-red-200 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </section>

      {pendingRemoval ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <FaTriangleExclamation className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Remove team member?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {pendingRemoval.user.name} will lose access to this workspace.
                  Only-owner protection remains enforced server-side.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingRemoval(null)}
                className="inline-flex h-10 items-center rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => removeMember(pendingRemoval.id)}
                className="inline-flex h-10 items-center rounded-md bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Remove member
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
