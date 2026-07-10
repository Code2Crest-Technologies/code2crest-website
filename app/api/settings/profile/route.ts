import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/server";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(request: Request) {
  const context = await getAuthContext();

  if (!context) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { name?: string } | null;
  const name = body?.name?.trim();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { message: "Name must be at least 2 characters." },
      { status: 400 },
    );
  }

  const user = await prisma.user.update({
    where: { id: context.user.id },
    data: { name },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json({ user });
}
