import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

const ALLOWED_VIDEO = new Set(["video/mp4", "video/webm", "video/ogg"]);

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No video uploaded" }, { status: 400 });
    }

    if (!ALLOWED_VIDEO.has(file.type)) {
      return NextResponse.json({ error: "Only MP4, WebM, OGG videos are allowed" }, { status: 400 });
    }

    const ext = path.extname(file.name) || ".mp4";
    const safeName = `video-${Date.now()}${ext.toLowerCase()}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`videos/${safeName}`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    }

    const dir = path.join(process.cwd(), "public", "videos", "uploads");
    await mkdir(dir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, safeName), buffer);

    return NextResponse.json({ url: `/videos/uploads/${safeName}` });
  } catch {
    return NextResponse.json({ error: "Video upload failed" }, { status: 500 });
  }
}
