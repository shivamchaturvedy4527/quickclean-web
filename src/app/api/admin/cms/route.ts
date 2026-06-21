import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveCMS, invalidateCMSCache, cmsStorageMode } from "@/lib/cms-store";
import { isAuthenticated } from "@/lib/auth";
import type { CMSData } from "@/types/cms";

const REVALIDATE_PATHS = [
  "/",
  "/products",
  "/contact-us",
  "/about-us",
  "/sustainability",
  "/solutions",
];

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  invalidateCMSCache();
  const { getCMS } = await import("@/lib/cms-store");
  const data = await getCMS();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CMSData;
    invalidateCMSCache();
    const saved = await saveCMS(body);
    invalidateCMSCache();
    revalidatePath("/", "layout");
    for (const path of REVALIDATE_PATHS) revalidatePath(path);

    return NextResponse.json({
      success: true,
      data: saved,
      storage: cmsStorageMode(),
      savedAt: new Date().toISOString(),
      confirm: {
        products: saved.products.length,
        solutions: saved.solutions.length,
        testimonials: saved.testimonials.length,
        blog: saved.blog.length,
      },
      warning:
        cmsStorageMode() === "tmp"
          ? "Changes are temporary on Vercel. Add BLOB_READ_WRITE_TOKEN in Vercel env for permanent saves."
          : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
