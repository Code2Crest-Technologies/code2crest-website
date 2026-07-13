import { prisma } from "@/lib/db/prisma";
import {
  EMAIL_VERIFICATION_TOKEN_TTL_MS,
  createSecureToken,
  hashToken,
} from "@/lib/auth/tokens";
import { sendEmail } from "@/lib/email/client";
import { emailVerificationEmail } from "@/lib/email/templates";

export async function sendVerificationEmail(input: {
  userId: string;
  email: string;
  origin: string;
}) {
  const token = createSecureToken();
  const verificationLink = `${input.origin}/api/auth/verify-email?token=${token}`;

  await prisma.emailVerificationToken.updateMany({
    where: {
      userId: input.userId,
      usedAt: null,
    },
    data: { usedAt: new Date() },
  });

  await prisma.emailVerificationToken.create({
    data: {
      userId: input.userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_MS),
    },
  });

  const emailContent = emailVerificationEmail({ verificationLink });

  await sendEmail({
    to: input.email,
    ...emailContent,
    previewLabel: "email-verification",
  });
}
