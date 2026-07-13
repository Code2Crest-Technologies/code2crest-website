"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  AuthShell,
  FormError,
  LoadingButton,
  PasswordField,
  PasswordStrength,
} from "@/modules/portal/components/auth-ui";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data?.message ?? "Unable to reset password.");
      return;
    }

    setMessage("Password updated. You can now sign in.");
  }

  return (
    <AuthShell
      eyebrow="Code2Crest Hub"
      title="Set a new password"
      subtitle="Reset links expire in 30 minutes and can only be used once."
    >
      <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            Reset password
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Choose a strong new password for your account.
          </p>
        </div>
        <PasswordField
          id="password"
          name="password"
          label="New password"
          placeholder="Create a secure password"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
          required
        />
        <PasswordStrength password={password} />
        <FormError message={error} />
        {message ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            {message}
          </p>
        ) : null}
        <LoadingButton isLoading={isSubmitting} loadingText="Updating...">
          Update password
        </LoadingButton>
        <p className="text-center text-sm">
          <Link href="/login" className="font-semibold text-blue-600">
            Back to login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
