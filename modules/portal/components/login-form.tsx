"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      setError(result?.message ?? "Unable to login.");
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");
    const safeNextPath = nextPath?.startsWith("/") ? nextPath : null;

    router.replace(safeNextPath ?? result?.redirectTo ?? "/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5 p-8 sm:p-10" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="barath@code2crest.com"
          className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-semibold text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue="password"
          className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
        />
      </div>
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
      <p className="text-center text-sm text-slate-600">
        New to Code2Crest?{" "}
        <Link href="/register" className="font-semibold text-blue-600">
          Create account
        </Link>
      </p>
    </form>
  );
}
