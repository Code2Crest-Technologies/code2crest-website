import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import {
  buildPortalSession,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
  } | null;

  if (!body?.email || !body.password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email.trim().toLowerCase() },
    include: {
      memberships: {
        where: { isActive: true },
        include: { company: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const activeMembership = user.memberships[0];

  if (!activeMembership) {
    return NextResponse.json(
      { message: "No active company membership found." },
      { status: 403 },
    );
  }

  const session = buildPortalSession({
    userId: user.id,
    activeCompanyId: activeMembership.companyId,
    membershipRole: activeMembership.role,
  });
  const token = await createSessionToken(session);
  const response = NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    activeCompany: {
      id: activeMembership.company.id,
      name: activeMembership.company.name,
      slug: activeMembership.company.slug,
    },
    membershipRole: activeMembership.role,
    redirectTo: "/dashboard",
  });

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
