import { NextResponse } from "next/server";
import { MembershipRole } from "@prisma/client";
import { createUniqueCompanySlug } from "@/lib/company/slug";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { validatePasswordPolicy } from "@/lib/auth/policy";
import { ensureDefaultProducts } from "@/modules/products/server";
import { getRequestOrigin } from "@/lib/http/request";
import { sendVerificationEmail } from "@/modules/auth/email-verification";
import { getPlatformRoleForEmail } from "@/lib/auth/platform-admin";
import {
  buildPortalSession,
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    password?: string;
    companyName?: string;
    acceptedTerms?: boolean;
  } | null;

  if (!body?.name || !body.email || !body.password || !body.companyName) {
    return NextResponse.json(
      { message: "Name, email, password, and company name are required." },
      { status: 400 },
    );
  }

  if (body.acceptedTerms !== true) {
    return NextResponse.json(
      { message: "You must accept the Terms & Conditions and Privacy Policy." },
      { status: 400 },
    );
  }

  const email = body.email.trim().toLowerCase();
  const passwordPolicy = validatePasswordPolicy(body.password);

  if (!passwordPolicy.ok) {
    return NextResponse.json({ message: passwordPolicy.message }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { message: "An account already exists for this email." },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(body.password);
  await ensureDefaultProducts();
  const companySlug = await createUniqueCompanySlug(body.companyName);
  const registration = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: body.name!.trim(),
        email,
        passwordHash,
        emailVerifiedAt: null,
        platformRole: getPlatformRoleForEmail(email),
      },
    });
    const company = await tx.company.create({
      data: {
        name: body.companyName!.trim(),
        slug: companySlug,
        ownerId: user.id,
      },
    });
    const membership = await tx.membership.create({
      data: {
        companyId: company.id,
        userId: user.id,
        role: MembershipRole.OWNER,
      },
    });
    const leadFlow = await tx.product.findUniqueOrThrow({
      where: { key: "leadflow" },
    });
    await tx.companyProduct.create({
      data: {
        companyId: company.id,
        productId: leadFlow.id,
        status: "TRIAL",
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });
    const trialStartedAt = new Date();
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    await tx.subscription.create({
      data: {
        companyId: company.id,
        plan: "TRIAL",
        status: "TRIALING",
        trialEndsAt,
        currentPeriodStart: trialStartedAt,
        currentPeriodEnd: trialEndsAt,
      },
    });

    return { user, company, membership };
  });
  const session = buildPortalSession({
    userId: registration.user.id,
    activeCompanyId: registration.company.id,
    membershipRole: registration.membership.role,
    sessionVersion: registration.user.sessionVersion,
  });
  const token = await createSessionToken(session);
  const response = NextResponse.json({
    user: {
      id: registration.user.id,
      name: registration.user.name,
      email: registration.user.email,
    },
    activeCompany: {
      id: registration.company.id,
      name: registration.company.name,
      slug: registration.company.slug,
    },
    membershipRole: registration.membership.role,
    redirectTo: "/dashboard",
  });

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  await sendVerificationEmail({
    userId: registration.user.id,
    email: registration.user.email,
    origin: getRequestOrigin(request),
  });

  return response;
}
