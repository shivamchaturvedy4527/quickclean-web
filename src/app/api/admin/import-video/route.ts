import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import ytdl from "@distube/ytdl-core";
import { isAuthenticated } from "@/lib/auth";

function isYoutubeUrl(url: string) {
  return /(?:youtube\.com|youtu\.be)/i.test(url);
}

function sanitizeName(input: string) {
  return input.replace(/[^a-z0-9-_]/gi, "-").replace(/-+/g, "-").slice(0, 60);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { url?: string };
    const url = body.url?.trim();

    if (!url) {
      return NextResponse.json({ error: "YouTube URL is required" }, { status: 400 });
    }

    if (!isYoutubeUrl(url) || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: "Please provide a valid YouTube URL" }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const title = sanitizeName(info.videoDetails.title || "youtube-video");
    const safeName = `${title}-${Date.now()}.mp4`;

    const stream = ytdl(url, {
      quality: "highest",
      filter: (format) => format.container === "mp4" && format.hasAudio && format.hasVideo,
    });

    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    if (!buffer.length) {
      return NextResponse.json({ error: "Could not download video from YouTube" }, { status: 500 });
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`videos/${safeName}`, buffer, {
        access: "public",
        addRandomSuffix: false,
        contentType: "video/mp4",
      });
      return NextResponse.json({ url: blob.url });
    }

    const dir = path.join(process.cwd(), "public", "videos", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, safeName), buffer);

    return NextResponse.json({ url: `/videos/uploads/${safeName}` });
  } catch {
    return NextResponse.json({ error: "YouTube video import failed" }, { status: 500 });
  }
}
