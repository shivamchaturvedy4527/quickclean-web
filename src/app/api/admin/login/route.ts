import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };

  if (!password || !(await verifyPassword(password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
