import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();

  const vercelCountry = headersList.get("x-vercel-ip-country");
  if (vercelCountry) {
    return NextResponse.json({ country: vercelCountry, source: "vercel" });
  }

  const cfCountry = headersList.get("cf-ipcountry");
  if (cfCountry && cfCountry !== "XX") {
    return NextResponse.json({ country: cfCountry, source: "cloudflare" });
  }

  const acceptLang = headersList.get("accept-language") ?? "en-IN";
  const locale = acceptLang.split(",")[0]?.trim() ?? "en-IN";
  const region = locale.split("-")[1]?.toUpperCase() ?? "IN";

  return NextResponse.json({ country: region, source: "locale" });
}
