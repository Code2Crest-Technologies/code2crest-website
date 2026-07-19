"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBuilding, FaEnvelope, FaUser } from "react-icons/fa6";
import {
  FormError,
  FormField,
  LoadingButton,
  PasswordField,
  PasswordStrength,
} from "@/modules/portal/components/auth-ui";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      setError("Use at least 8 characters with uppercase, lowercase, and a number.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions and Privacy Policy to continue.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        companyName: formData.get("companyName"),
        email: formData.get("email"),
        password,
        acceptedTerms,
      }),
    });
    const result = (await response.json().catch(() => null)) as {
      message?: string;
      redirectTo?: string;
    } | null;

    setIsSubmitting(false);

    if (!response.ok) {
      setError(
        response.status === 409
          ? "An account already exists for this email."
          : "We could not create your workspace. Please check the details and try again.",
      );
      return;
    }

    router.replace(result?.redirectTo ?? "/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-semibold text-blue-600">Code2Crest Hub</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
          Create workspace
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Your company, owner membership, trial subscription, and LeadFlow access
          are created together.
        </p>
      </div>
      <FormField
        id="name"
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        autoComplete="name"
        icon={FaUser}
        required
      />
      <FormField
        id="companyName"
        name="companyName"
        label="Company"
        placeholder="Enter your company name"
        autoComplete="organization"
        icon={FaBuilding}
        required
      />
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
        placeholder="Create a secure password"
        autoComplete="new-password"
        value={password}
        onChange={setPassword}
        required
      />
      <PasswordStrength password={password} />
      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
        <input
          type="checkbox"
          name="acceptedTerms"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span>
          I agree to the{" "}
          <Link
            href="https://www.code2crest.com/terms-and-conditions"
            className="font-semibold text-blue-600 underline underline-offset-4"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="https://www.code2crest.com/privacy-policy"
            className="font-semibold text-blue-600 underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      <FormError message={error} />
      <LoadingButton isLoading={isSubmitting} loadingText="Creating workspace...">
        Register
      </LoadingButton>
      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-blue-600">
          Login
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
