import { NextResponse } from "next/server";
import { getCMS } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getCMS();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}
