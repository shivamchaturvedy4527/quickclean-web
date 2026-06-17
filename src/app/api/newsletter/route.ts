import { NextResponse } from "next/server";
import { getCMS, saveCMS } from "@/lib/cms-store";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const { name, email } = (await request.json()) as {
      name?: string;
      email?: string;
    };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const cms = await getCMS();
    cms.newsletterSubmissions.unshift({
      id: randomUUID(),
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
    });
    await saveCMS(cms);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
