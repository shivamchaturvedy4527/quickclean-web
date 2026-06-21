import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";
import { getCMS } from "@/lib/cms-store";
import { collectImagePaths } from "@/lib/cms-images";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cms = await getCMS();
  const images = collectImagePaths(cms);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "uploads/", limit: 200 });
      blobs.forEach((blob) => images.add(blob.url));
    } catch {
      // ignore blob list errors
    }
  }

  const sorted = [...images].sort((a, b) => a.localeCompare(b));
  return NextResponse.json({ images: sorted });
}
