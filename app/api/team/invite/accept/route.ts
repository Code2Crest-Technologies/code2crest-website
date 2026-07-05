import { NextResponse } from "next/server";
import { acceptInvite } from "@/modules/team/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    token?: string;
    name?: string;
    email?: string;
    password?: string;
  } | null;

  if (!body?.token) {
    return NextResponse.json({ message: "Invite token is required." }, { status: 400 });
  }

  const result = await acceptInvite({
    token: body.token,
    name: body.name,
    email: body.email,
    password: body.password,
  });

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({
    user: {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
    },
    company: {
      id: result.company.id,
      name: result.company.name,
      slug: result.company.slug,
    },
    membership: result.membership,
  });
}
