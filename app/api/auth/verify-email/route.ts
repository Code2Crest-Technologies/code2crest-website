import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/tokens";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const redirectUrl = new URL("/settings", url.origin);

  if (!token) {
    redirectUrl.searchParams.set("verified", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });

  if (!verificationToken || verificationToken.usedAt || verificationToken.expiresAt < new Date()) {
    redirectUrl.searchParams.set("verified", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerifiedAt: new Date() },
    });
    await tx.emailVerificationToken.update({
      where: { id: verificationToken.id },
      data: { usedAt: new Date() },
    });
  });

  redirectUrl.searchParams.set("verified", "true");
  return NextResponse.redirect(redirectUrl);
}

