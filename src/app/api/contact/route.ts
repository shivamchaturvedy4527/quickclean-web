import { NextRequest, NextResponse } from "next/server";
import { getCMS, saveCMS, invalidateCMSCache } from "@/lib/cms-store";
import type { ContactSubmission } from "@/types/cms";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      message?: string;
    };

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const data = await getCMS();
    const submission: ContactSubmission = {
      id: `sub_${Date.now()}`,
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      company: body.company ?? "",
      message: body.message,
      createdAt: new Date().toISOString(),
    };

    data.contactSubmissions = [submission, ...data.contactSubmissions].slice(
      0,
      100
    );

    invalidateCMSCache();
    await saveCMS(data);

    if (process.env.CONTACT_EMAIL_TO) {
      // Email hook — configure SMTP or Resend in production
      console.log(
        `[Contact] New submission from ${submission.email} to ${process.env.CONTACT_EMAIL_TO}`
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
