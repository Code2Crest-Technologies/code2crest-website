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
