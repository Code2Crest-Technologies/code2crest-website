"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import {
  AuthShell,
  FormField,
  LoadingButton,
} from "@/modules/portal/components/auth-ui";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email") }),
    });

    setIsSubmitting(false);
    setMessage("If an account exists, a password reset email has been sent.");
  }

  return (
    <AuthShell
      eyebrow="Code2Crest Hub"
      title="Recover your workspace access"
      subtitle="Request a secure password reset link for your Code2Crest Hub account."
    >
      <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            Forgot password
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter your email and we will send reset instructions if the account
            exists.
          </p>
        </div>
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          icon={FaEnvelope}
          required
        />
        {message ? (
          <p className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
            {message}
          </p>
        ) : null}
        <LoadingButton isLoading={isSubmitting} loadingText="Sending...">
          Send reset link
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

