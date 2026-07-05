"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        companyName: formData.get("companyName"),
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
      setError(result?.message ?? "Unable to register.");
      return;
    }

    router.replace(result?.redirectTo ?? "/dashboard");
    router.refresh();
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-slate-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Barath Rahav"
          className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
        />
      </div>
      <div>
        <label htmlFor="companyName" className="text-sm font-semibold text-slate-700">
          Company
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          placeholder="Code2Crest Technologies"
          className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
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
          placeholder="Create a secure password"
          className="mt-2 w-full rounded-md border-slate-300 text-slate-950 shadow-sm focus:border-blue-600 focus:ring-blue-600"
        />
      </div>
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {isSubmitting ? "Creating..." : "Register"}
      </button>
      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-blue-600">
          Login
        </Link>
      </p>
    </form>
  );
}
