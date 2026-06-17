import { NextResponse } from "next/server";
import { getCMS } from "@/lib/cms-store";

export async function GET() {
  const data = await getCMS();
  return NextResponse.json(data);
}
