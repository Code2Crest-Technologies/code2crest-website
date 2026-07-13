import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getRequestMeta, getRequestOrigin } from "@/lib/http/request";
import { sendVerificationEmail } from "@/modules/auth/email-verification";

export async function POST(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  if (context.user.emailVerifiedAt) {
    return NextResponse.json({ message: "Email is already verified." });
  }

  const meta = getRequestMeta(request);
  const rate = checkRateLimit({
    key: `verify:${context.user.id}:${meta.ip ?? "unknown"}`,
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });

  if (!rate.ok) {
    return NextResponse.json({ message: "Please wait before requesting another verification email." }, { status: 429 });
  }

  await sendVerificationEmail({
    userId: context.user.id,
    email: context.user.email,
    origin: getRequestOrigin(request),
  });

  return NextResponse.json({ message: "Verification email sent." });
}

