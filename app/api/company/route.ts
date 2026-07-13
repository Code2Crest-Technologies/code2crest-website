import { NextResponse } from "next/server";
import { MembershipRole } from "@prisma/client";
import { getAuthContext } from "@/lib/auth/server";
import { prisma } from "@/lib/db/prisma";
import { createAuditLog } from "@/lib/audit/log";
import { getRequestMeta } from "@/lib/http/request";

const editableFields = [
  "name",
  "website",
  "phone",
  "address",
  "city",
  "state",
  "country",
  "postalCode",
  "gstin",
  "timezone",
] as const;

type EditableField = (typeof editableFields)[number];

function cleanOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function canEditCompany(role: MembershipRole) {
  return role === MembershipRole.OWNER || role === MembershipRole.ADMIN;
}

export async function PATCH(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  if (!canEditCompany(context.membershipRole)) {
    return NextResponse.json(
      { message: "Only OWNER and ADMIN members can update company details." },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | Partial<Record<EditableField, unknown>>
    | null;

  if (!body) {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = cleanOptionalString(body.name);

  if (!name || name.length < 2) {
    return NextResponse.json(
      { message: "Company name must be at least 2 characters." },
      { status: 400 },
    );
  }

  const updatedCompany = await prisma.company.update({
    where: { id: context.companyId },
    data: {
      name,
      website: cleanOptionalString(body.website),
      phone: cleanOptionalString(body.phone),
      address: cleanOptionalString(body.address),
      city: cleanOptionalString(body.city),
      state: cleanOptionalString(body.state),
      country: cleanOptionalString(body.country),
      postalCode: cleanOptionalString(body.postalCode),
      gstin: cleanOptionalString(body.gstin),
      timezone: cleanOptionalString(body.timezone),
    },
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      website: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      country: true,
      postalCode: true,
      gstin: true,
      timezone: true,
      logoUrl: true,
      updatedAt: true,
    },
  });

  await createAuditLog({
    action: "COMPANY_UPDATED",
    actorId: context.user.id,
    companyId: context.companyId,
    entityType: "Company",
    entityId: context.companyId,
    metadata: { fields: editableFields.filter((field) => field in body) },
    ...getRequestMeta(request),
  });

  return NextResponse.json({ company: updatedCompany });
}
