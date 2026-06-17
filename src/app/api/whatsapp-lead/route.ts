import { NextRequest, NextResponse } from "next/server";
import { getCMS, saveCMS, invalidateCMSCache } from "@/lib/cms-store";
import type { ContactSubmission } from "@/types/cms";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      message?: string;
    };

    if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    const data = await getCMS();
    const submission: ContactSubmission = {
      id: `wa_${Date.now()}`,
      name: body.name.trim(),
      email: "whatsapp-lead",
      phone: body.phone.trim(),
      company: "",
      message: `[WhatsApp] ${body.message.trim()}`,
      createdAt: new Date().toISOString(),
    };

    data.contactSubmissions = [submission, ...data.contactSubmissions].slice(
      0,
      100
    );

    invalidateCMSCache();
    await saveCMS(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
