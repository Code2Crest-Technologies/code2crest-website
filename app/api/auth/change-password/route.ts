import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { validatePasswordPolicy } from "@/lib/auth/policy";
import { createAuditLog } from "@/lib/audit/log";
import { getRequestMeta } from "@/lib/http/request";
import { sendEmail } from "@/lib/email/client";
import { passwordChangedEmail } from "@/lib/email/templates";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    currentPassword?: string;
    newPassword?: string;
  } | null;

  if (!body?.currentPassword || !body.newPassword) {
    return NextResponse.json({ message: "Current and new password are required." }, { status: 400 });
  }

  const user = await prisma.user.findUniqueOrThrow({ where: { id: context.user.id } });

  if (!(await verifyPassword(body.currentPassword, user.passwordHash))) {
    return NextResponse.json({ message: "Current password is incorrect." }, { status: 400 });
  }

  const policy = validatePasswordPolicy(body.newPassword);

  if (!policy.ok) {
    return NextResponse.json({ message: policy.message }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(body.newPassword),
      sessionVersion: { increment: 1 },
    },
  });

  await createAuditLog({
    action: "PASSWORD_CHANGED",
    actorId: user.id,
    companyId: context.companyId,
    entityType: "User",
    entityId: user.id,
    metadata: { source: "settings" },
    ...getRequestMeta(request),
  });
  await sendEmail({
    to: user.email,
    ...passwordChangedEmail(),
    previewLabel: "password-changed",
  });

  const response = NextResponse.json({ message: "Password changed. Please sign in again." });

  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
