import { NextResponse } from "next/server";
import { CompanyProductStatus } from "@prisma/client";
import { getAuthContext } from "@/lib/auth/server";
import { createLeadFlowSsoToken } from "@/lib/auth/sso";
import { prisma } from "@/lib/db/prisma";

const leadFlowCallbackUrl = "https://leadflow.code2crest.com/sso/callback";

export async function GET(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", "/dashboard");
    return NextResponse.redirect(loginUrl);
  }

  const leadFlowAccess = await prisma.companyProduct.findFirst({
    where: {
      companyId: context.companyId,
      product: { key: "leadflow" },
      status: {
        in: [CompanyProductStatus.TRIAL, CompanyProductStatus.ACTIVE],
      },
    },
    include: {
      product: true,
    },
  });

  if (!leadFlowAccess) {
    return NextResponse.json(
      { message: "Company does not have active LeadFlow access." },
      { status: 403 },
    );
  }

  const token = createLeadFlowSsoToken({
    userId: context.user.id,
    name: context.user.name,
    email: context.user.email,
    companyId: context.companyId,
    companyName: context.activeCompany.name,
    role: context.membershipRole,
    product: "leadflow",
  });
  const callbackUrl = new URL(leadFlowCallbackUrl);
  callbackUrl.searchParams.set("token", token);

  return NextResponse.redirect(callbackUrl);
}
