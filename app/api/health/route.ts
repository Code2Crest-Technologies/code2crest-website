import { NextResponse } from "next/server";
import { validateProductionEnv } from "@/lib/config/env";

export function GET() {
  const env = validateProductionEnv();

  return NextResponse.json(
    {
      ok: env.ok,
      service: "code2crest-platform",
      environment: process.env.NODE_ENV ?? "development",
      env: {
        ok: env.ok,
        missing: env.missing,
        warnings: env.warnings,
      },
      timestamp: new Date().toISOString(),
    },
    { status: env.ok ? 200 : 500 },
  );
}
