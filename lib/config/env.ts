const requiredServerEnv = ["DATABASE_URL", "AUTH_SECRET"] as const;

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
