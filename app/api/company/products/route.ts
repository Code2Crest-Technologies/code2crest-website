import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { getCompanyProductAccess } from "@/modules/products/server";

export async function GET() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const products = await getCompanyProductAccess(context.companyId);

  return NextResponse.json({
    companyId: context.companyId,
    products,
  });
}
