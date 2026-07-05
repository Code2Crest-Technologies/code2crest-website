"use client";

import { MembershipRole } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

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
  currentUserRole: MembershipRole;
  members: TeamMember[];
};

const inviteRoles = [
  MembershipRole.ADMIN,
  MembershipRole.MANAGER,
  MembershipRole.SALES,
  MembershipRole.VIEWER,
];

const allRoles = [
  MembershipRole.OWNER,
  MembershipRole.ADMIN,
  MembershipRole.MANAGER,
  MembershipRole.SALES,
  MembershipRole.VIEWER,
];

function formatRole(role: MembershipRole) {
  return role
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<MembershipRole | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MembershipRole>(MembershipRole.VIEWER);
  const [inviteLink, setInviteLink] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);

  const canManage = useMemo(
    () =>
      currentUserRole === MembershipRole.OWNER ||
      currentUserRole === MembershipRole.ADMIN,
    [currentUserRole],
  );

  async function loadTeam() {
    setIsLoading(true);
    const response = await fetch("/api/team", { cache: "no-store" });
    const data = (await response.json().catch(() => null)) as TeamResponse | null;

    if (response.ok && data) {
      setMembers(data.members);
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
    setRole(MembershipRole.VIEWER);
  }

  async function updateRole(membershipId: string, nextRole: MembershipRole) {
    setMessage("");
    const response = await fetch(`/api/team/${membershipId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: nextRole }),
    });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;

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
    const data = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setMessage(data?.message ?? "Unable to remove member.");
      return;
    }

    await loadTeam();
  }

  return (
    <div className="space-y-6">
      {canManage ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
          <form className="grid gap-4 lg:grid-cols-[1fr_180px_auto]" onSubmit={handleInvite}>
            <div>
              <label htmlFor="inviteEmail" className="text-sm font-semibold text-slate-700">
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
              <label htmlFor="inviteRole" className="text-sm font-semibold text-slate-700">
                Role
              </label>
              <select
                id="inviteRole"
                value={role}
                onChange={(event) => setRole(event.target.value as MembershipRole)}
                className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              >
                {inviteRoles.map((inviteRole) => (
                  <option key={inviteRole} value={inviteRole}>
                    {formatRole(inviteRole)}
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
              <p className="mt-1 break-all text-sm text-blue-700">{inviteLink}</p>
            </div>
          ) : null}
        </section>
      ) : null}

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
          <div className="px-5 py-6 text-sm text-slate-600">Loading team...</div>
        ) : null}

        {!isLoading && members.length === 0 ? (
          <div className="px-5 py-6 text-sm text-slate-600">No team members found.</div>
        ) : null}

        {members.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-1 gap-3 border-b border-slate-100 px-5 py-4 text-sm last:border-b-0 lg:grid-cols-[1.2fr_1.4fr_180px_120px] lg:items-center"
          >
            <span className="font-semibold text-slate-950">{member.user.name}</span>
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
                    {formatRole(memberRole)}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-slate-600">{formatRole(member.role)}</span>
            )}
            {canManage ? (
              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Remove
              </button>
            ) : (
              <span className="text-slate-400">-</span>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
