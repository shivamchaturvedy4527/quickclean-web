import type { Area } from "react-easy-crop";

export type CropOutputFormat = "image/png" | "image/jpeg" | "image/webp";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image for cropping"));
    img.src = src;
  });
}

export function detectCropFormat(source: { file?: File; src?: string }): CropOutputFormat {
  const type = source.file?.type?.toLowerCase() ?? "";
  if (type === "image/png") return "image/png";
  if (type === "image/webp") return "image/webp";
  if (type === "image/jpeg" || type === "image/jpg") return "image/jpeg";

  const src = (source.src ?? "").toLowerCase();
  if (src.includes("image/png") || src.endsWith(".png") || src.includes(".png?")) return "image/png";
  if (src.includes("image/webp") || src.endsWith(".webp") || src.includes(".webp?")) return "image/webp";
  if (src.includes("image/jpeg") || src.endsWith(".jpg") || src.endsWith(".jpeg")) return "image/jpeg";

  // Default PNG so transparent logos never get a black JPEG background.
  return "image/png";
}

export function cropFileExtension(format: CropOutputFormat): string {
  if (format === "image/jpeg") return "jpg";
  if (format === "image/webp") return "webp";
  return "png";
}

export async function getCroppedImageBlob(
  imageSrc: string,
  crop: Area,
  mimeType: CropOutputFormat = "image/png"
): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas not supported");

  canvas.width = Math.max(1, Math.round(crop.width));
  canvas.height = Math.max(1, Math.round(crop.height));

  if (mimeType === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Crop failed"));
        else resolve(blob);
      },
      mimeType,
      mimeType === "image/jpeg" ? 0.92 : mimeType === "image/webp" ? 0.9 : undefined
    );
  });
}

export function isSvgPath(src: string): boolean {
  return /\.svg($|\?)/i.test(src);
}

export function isSvgFile(file: File): boolean {
  return file.type === "image/svg+xml" || /\.svg$/i.test(file.name);
}
