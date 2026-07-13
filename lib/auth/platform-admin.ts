import { PlatformRole } from "@prisma/client";

export function isPlatformAdminEmail(email: string) {
  const configured = process.env.PLATFORM_ADMIN_EMAILS ?? "";
  const allowedEmails = configured
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.trim().toLowerCase());
}

export function getPlatformRoleForEmail(email: string) {
  return isPlatformAdminEmail(email) ? PlatformRole.PLATFORM_ADMIN : PlatformRole.USER;
}

