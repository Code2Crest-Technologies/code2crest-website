import { NextResponse } from "next/server";

export function safeErrorResponse(error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unexpected error.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Something went wrong. Please try again later." },
    { status: 500 },
  );
}

export function withApiErrorHandling(
  handler: () => Response | Promise<Response>,
) {
  return async () => {
    try {
      return await handler();
    } catch (error) {
      console.error("[api:error]", error);
      return safeErrorResponse(error);
    }
  };
}
