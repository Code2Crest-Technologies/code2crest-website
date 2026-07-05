import { NextResponse } from "next/server";
import { getProducts } from "@/modules/products/server";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json({ products });
}
