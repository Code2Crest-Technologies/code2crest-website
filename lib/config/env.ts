const requiredServerEnv = ["DATABASE_URL", "AUTH_SECRET", "SSO_SECRET"] as const;
const optionalBillingEnv = [
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "APP_URL",
  "RAZORPAY_PLAN_STARTER",
  "RAZORPAY_PLAN_GROWTH",
  "RAZORPAY_PLAN_BUSINESS",
] as const;
const optionalPlatformEnv = [
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "APP_URL",
  "PLATFORM_ADMIN_EMAILS",
] as const;

export type EnvValidationResult = {
  ok: boolean;
  missing: string[];
  warnings: string[];
};

export function validateProductionEnv(): EnvValidationResult {
  const missing =
    process.env.NODE_ENV === "production"
      ? requiredServerEnv.filter((name) => !process.env[name])
      : [];
  const warnings: string[] = [];

  if (
    process.env.NODE_ENV === "production" &&
    process.env.AUTH_SECRET &&
    process.env.AUTH_SECRET.length < 32
  ) {
    warnings.push("AUTH_SECRET should be at least 32 characters.");
  }

  if (
    process.env.NODE_ENV === "production" &&
    process.env.SSO_SECRET &&
    process.env.SSO_SECRET.length < 32
  ) {
    warnings.push("SSO_SECRET should be at least 32 characters.");
  }

  const hasSomeRazorpayEnv = optionalBillingEnv.some((name) => process.env[name]);
  const hasAllRazorpayEnv = optionalBillingEnv.every((name) => process.env[name]);

  if (process.env.NODE_ENV === "production" && hasSomeRazorpayEnv && !hasAllRazorpayEnv) {
    warnings.push("All Razorpay variables must be configured together before enabling checkout.");
  }

  if (process.env.NODE_ENV === "production" && !process.env.EMAIL_FROM) {
    warnings.push("EMAIL_FROM should be configured before beta email delivery.");
  }

  if (process.env.NODE_ENV === "production" && !process.env.RESEND_API_KEY) {
    warnings.push("RESEND_API_KEY should be configured before beta email delivery.");
  }

  if (process.env.NODE_ENV === "production" && !process.env.APP_URL) {
    warnings.push("APP_URL should be configured for auth and email links.");
  }

  if (process.env.NODE_ENV === "production" && !process.env.PLATFORM_ADMIN_EMAILS) {
    warnings.push("PLATFORM_ADMIN_EMAILS should list trusted internal admins.");
  }

  return {
    ok: missing.length === 0 && warnings.length === 0,
    missing,
    warnings,
  };
}

export function getRequiredEnv(name: (typeof requiredServerEnv)[number]) {
  const value = process.env[name];

  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`${name} is required in production.`);
  }

  return value;
}

export function isRazorpayConfigured() {
  return optionalBillingEnv.every((name) => Boolean(process.env[name]));
}

export function getOptionalPlatformEnvNames() {
  return optionalPlatformEnv;
}
