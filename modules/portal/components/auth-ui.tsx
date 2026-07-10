"use client";

import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowLeft,
  FaCircleCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSpinner,
} from "react-icons/fa6";
import { useMemo, useState } from "react";
import logoIcon from "@/public/images/logo-icon.png";

type AuthShellProps = {
  children: React.ReactNode;
  title: string;
  eyebrow: string;
  subtitle: string;
  trustItems?: {
    label: string;
    description?: string;
    icon: IconType;
  }[];
};

export function Code2CrestLogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-white shadow-sm ${className}`}
    >
      <Image src={logoIcon} alt="Code2Crest" width={34} height={34} priority />
    </span>
  );
}

export function AuthBrandPanel({
  eyebrow,
  title,
  subtitle,
  trustItems = [],
}: Omit<AuthShellProps, "children">) {
  return (
    <div className="relative overflow-hidden bg-[#020617] p-7 text-white sm:p-9 lg:min-h-[620px]">
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-slate-500/10 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <Code2CrestLogoMark />
          <p className="mt-8 text-sm font-semibold text-blue-300">{eyebrow}</p>
          <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="mt-1 block text-xs leading-5 text-slate-400">
                      {item.description}
                    </span>
                  ) : null}
                </span>
              </div>
            );
          })}
          <Link
            href="https://www.code2crest.com"
            className="inline-flex items-center gap-2 pt-3 text-sm font-semibold text-blue-200 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AuthShell({
  children,
  title,
  eyebrow,
  subtitle,
  trustItems,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30 lg:grid-cols-[0.95fr_1fr]">
        <AuthBrandPanel
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          trustItems={trustItems}
        />
        <div className="flex items-center justify-center p-4 sm:p-7">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  icon: IconType;
  error?: string;
  required?: boolean;
};

export function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  icon: Icon,
  error,
  required,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type PasswordFieldProps = Omit<FormFieldProps, "type" | "icon"> & {
  value?: string;
  onChange?: (value: string) => void;
};

export function PasswordField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  error,
  required,
  value,
  onChange,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative mt-2">
        <FaLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          name={name}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-11 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
        <button
          type="button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={() => setIsVisible((current) => !current)}
          className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          {isVisible ? (
            <FaEyeSlash className="h-4 w-4" />
          ) : (
            <FaEye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function PasswordStrength({ password }: { password: string }) {
  const checks = useMemo(
    () => [
      { label: "Minimum 8 characters", ok: password.length >= 8 },
      { label: "At least one uppercase letter", ok: /[A-Z]/.test(password) },
      { label: "At least one lowercase letter", ok: /[a-z]/.test(password) },
      { label: "At least one number", ok: /\d/.test(password) },
    ],
    [password],
  );
  const score = checks.filter((check) => check.ok).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex gap-1.5">
        {checks.map((check, index) => (
          <span
            key={check.label}
            className={
              index < score
                ? "h-1.5 flex-1 rounded-full bg-blue-600"
                : "h-1.5 flex-1 rounded-full bg-slate-200"
            }
          />
        ))}
      </div>
      <div className="mt-3 grid gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
        {checks.map((check) => (
          <span key={check.label} className="flex items-center gap-2">
            <span
              className={
                check.ok
                  ? "h-1.5 w-1.5 rounded-full bg-blue-600"
                  : "h-1.5 w-1.5 rounded-full bg-slate-300"
              }
            />
            {check.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export function LoadingButton({
  isLoading,
  loadingText,
  children,
}: {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
    >
      {isLoading ? (
        <>
          <FaSpinner className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
