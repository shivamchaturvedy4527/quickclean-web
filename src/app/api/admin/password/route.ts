import { NextRequest, NextResponse } from "next/server";
import { changePassword, isAuthenticated } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
  };

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Current and new password are required" }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
  }

  const changed = await changePassword(currentPassword, newPassword);
  if (!changed) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
