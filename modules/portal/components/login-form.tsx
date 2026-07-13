"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import {
  FormError,
  FormField,
  LoadingButton,
  PasswordField,
} from "@/modules/portal/components/auth-ui";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const result = (await response.json().catch(() => null)) as {
      message?: string;
      redirectTo?: string;
    } | null;

    setIsSubmitting(false);

    if (!response.ok) {
      setError(
        response.status === 401
          ? "The email or password is incorrect."
          : "We could not sign you in. Please try again.",
      );
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");
    const safeNextPath =
      nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : null;

    router.replace(safeNextPath ?? result?.redirectTo ?? "/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-semibold text-blue-600">Code2Crest Hub</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          Sign in to your workspace
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Access your products, team, subscription, and business tools.
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
      <PasswordField
        id="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Protected with secure sessions.</span>
        <Link
          href="/forgot-password"
          className="font-semibold text-blue-600 transition hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>
      <FormError message={error} />
      <LoadingButton isLoading={isSubmitting} loadingText="Signing in...">
        Login
      </LoadingButton>
      <p className="text-center text-sm text-slate-600">
        New to Code2Crest?{" "}
        <Link href="/register" className="font-semibold text-blue-600">
          Create workspace
        </Link>
      </p>
      <p className="text-center text-sm">
        <Link href="https://www.code2crest.com" className="font-semibold text-slate-600">
          Back to website
        </Link>
      </p>
    </form>
  );
}
