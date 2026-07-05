import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { activateCompanyProduct } from "@/modules/products/server";

type RouteContext = {
  params: Promise<{
    productKey: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const authContext = await getAuthContext();

  if (!authContext) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const { productKey } = await context.params;
  const activation = await activateCompanyProduct(authContext.companyId, productKey);

  if (!activation.ok) {
    return NextResponse.json(
      { message: activation.message },
      { status: activation.status },
    );
  }

  return NextResponse.json({ companyProduct: activation.companyProduct });
}
