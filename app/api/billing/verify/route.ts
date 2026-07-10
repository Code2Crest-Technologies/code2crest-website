import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";

export async function POST() {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json(
    { message: "Server-side payment verification is not enabled for beta." },
    { status: 503 },
  );
}
