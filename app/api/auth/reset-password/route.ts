import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { validatePasswordPolicy } from "@/lib/auth/policy";
import { hashToken } from "@/lib/auth/tokens";
import { createAuditLog } from "@/lib/audit/log";
import { getRequestMeta } from "@/lib/http/request";
import { sendEmail } from "@/lib/email/client";
import { passwordChangedEmail } from "@/lib/email/templates";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    token?: string;
    password?: string;
  } | null;
  const requestMeta = getRequestMeta(request);
  const rate = checkRateLimit({
    key: `reset:${requestMeta.ip ?? "unknown"}`,
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });

  if (!rate.ok) {
    return NextResponse.json(
      { message: "Too many reset attempts. Please try again shortly." },
      { status: 429 },
    );
  }

  if (!body?.token || !body.password) {
    return NextResponse.json({ message: "Reset token and password are required." }, { status: 400 });
  }

  const policy = validatePasswordPolicy(body.password);

  if (!policy.ok) {
    return NextResponse.json({ message: policy.message }, { status: 400 });
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(body.token) },
    include: { user: true },
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ message: "Reset link is invalid or expired." }, { status: 400 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: resetToken.userId },
      data: {
        passwordHash: await hashPassword(body.password!),
        sessionVersion: { increment: 1 },
      },
    });
    await tx.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    });
  });

  await createAuditLog({
    action: "PASSWORD_CHANGED",
    actorId: resetToken.userId,
    entityType: "User",
    entityId: resetToken.userId,
    metadata: { source: "password_reset" },
    ...requestMeta,
  });
  await sendEmail({
    to: resetToken.user.email,
    ...passwordChangedEmail(),
    previewLabel: "password-changed",
  });

  return NextResponse.json({ message: "Password updated." });
}
