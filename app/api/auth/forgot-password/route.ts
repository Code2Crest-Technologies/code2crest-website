import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  PASSWORD_RESET_TOKEN_TTL_MS,
  createSecureToken,
  hashToken,
} from "@/lib/auth/tokens";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getRequestMeta, getRequestOrigin } from "@/lib/http/request";
import { createAuditLog } from "@/lib/audit/log";
import { sendEmail } from "@/lib/email/client";
import { passwordResetEmail } from "@/lib/email/templates";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const requestMeta = getRequestMeta(request);
  const rate = checkRateLimit({
    key: `forgot:${requestMeta.ip ?? "unknown"}:${email ?? "missing"}`,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rate.ok) {
    return NextResponse.json({ message: "If an account exists, a password reset email has been sent." });
  }

  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = createSecureToken();
      const resetLink = `${getRequestOrigin(request)}/reset-password?token=${token}`;
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash: hashToken(token),
          expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_MS),
        },
      });
      const emailContent = passwordResetEmail({ resetLink });
      await sendEmail({
        to: user.email,
        ...emailContent,
        previewLabel: "password-reset",
      });
      await createAuditLog({
        action: "PASSWORD_RESET_REQUESTED",
        actorId: user.id,
        entityType: "User",
        entityId: user.id,
        ...requestMeta,
      });
    }
  }

  return NextResponse.json({ message: "If an account exists, a password reset email has been sent." });
}

