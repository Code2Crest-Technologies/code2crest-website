"use client";

import { useState } from "react";
import {
  FaBell,
  FaCalendar,
  FaLock,
  FaPalette,
  FaShieldHalved,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import type { AuthUser } from "@/lib/auth/session";
import { PasswordField, PasswordStrength } from "@/modules/portal/components/auth-ui";

export default function SettingsPanel({ user }: { user: AuthUser }) {
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);
    const response = await fetch("/api/settings/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsSaving(false);

    if (!response.ok) {
      setError(data?.message ?? "Unable to update profile.");
      return;
    }

    setMessage("Profile updated.");
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsChangingPassword(true);
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsChangingPassword(false);

    if (!response.ok) {
      setError(data?.message ?? "Unable to change password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setMessage(data?.message ?? "Password changed.");
  }

  async function resendVerification() {
    setMessage("");
    setError("");
    const response = await fetch("/api/auth/resend-verification", { method: "POST" });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setError(data?.message ?? "Unable to resend verification email.");
      return;
    }

    setMessage(data?.message ?? "Verification email sent.");
  }

  return (
    <div className="space-y-6">
      {message ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaUser className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-950">Account</h2>
            <p className="mt-1 text-sm text-slate-500">
              Update your Hub profile details.
            </p>
            <form onSubmit={updateProfile} className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 text-sm text-slate-950 shadow-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  value={user.email}
                  disabled
                  className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-slate-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isSaving ? "Saving..." : "Update profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {!user.emailVerifiedAt ? (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-sm font-semibold text-amber-900">
            Email verification recommended
          </h2>
          <p className="mt-2 text-sm text-amber-800">
            Your email is not verified yet. Founder testing is not blocked, but
            verification is recommended before beta use.
          </p>
          <button
            type="button"
            onClick={resendVerification}
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-amber-600 px-4 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Resend verification email
          </button>
        </section>
      ) : null}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <FaShieldHalved className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-950">Security</h2>
            <p className="mt-1 text-sm text-slate-500">
              Change your password and revoke other sessions.
            </p>
            <form onSubmit={changePassword} className="mt-5 grid gap-4 lg:grid-cols-2">
              <PasswordField
                id="currentPassword"
                name="currentPassword"
                label="Current password"
                placeholder="Enter current password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={setCurrentPassword}
                required
              />
              <PasswordField
                id="newPassword"
                name="newPassword"
                label="New password"
                placeholder="Create a secure password"
                autoComplete="new-password"
                value={newPassword}
                onChange={setNewPassword}
                required
              />
              <div className="lg:col-span-2">
                <PasswordStrength password={newPassword} />
              </div>
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isChangingPassword ? "Changing..." : "Change password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {[
        {
          title: "Notifications",
          icon: FaBell,
          items: ["Product updates", "Team invites", "Billing alerts", "Security alerts"],
        },
        {
          title: "Preferences",
          icon: FaPalette,
          items: ["Timezone", "Date format", "Theme preference", "Default product"],
        },
        {
          title: "Danger Zone",
          icon: FaTrash,
          items: ["Leave workspace", "Delete account", "Delete company"],
        },
      ].map((section) => {
        const Icon = section.icon;

        return (
          <section
            key={section.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  {section.title}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      disabled
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-400"
                    >
                      {section.title === "Security" ? (
                        <FaLock className="h-3 w-3" />
                      ) : section.title === "Preferences" ? (
                        <FaCalendar className="h-3 w-3" />
                      ) : null}
                      {item} - coming soon
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
