"use client";

import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Loader2, X, ZoomIn } from "lucide-react";

import type { CropOutputFormat } from "@/lib/crop-image";

interface ImageCropModalProps {
  imageSrc: string;
  aspect?: number;
  outputFormat?: CropOutputFormat;
  title?: string;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
}

export function ImageCropModal({
  imageSrc,
  aspect,
  outputFormat = "image/png",
  title = "Crop Image",
  onCancel,
  onConfirm,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    setError("");
    try {
      const { getCroppedImageBlob } = await import("@/lib/crop-image");
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels, outputFormat);
      onConfirm(blob);
    } catch {
      setError("Crop failed. Try uploading the image again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">Drag to move · Scroll or slider to zoom</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close crop"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="relative h-[min(55vh,420px)]"
          style={{
            backgroundColor: "#e5e7eb",
            backgroundImage:
              "linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
          />
        </div>

        <div className="space-y-3 border-t border-slate-200 px-5 py-4">
          <label className="flex items-center gap-3 text-sm text-slate-700">
            <ZoomIn className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={processing || !croppedAreaPixels}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
            >
              {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {processing ? "Saving..." : "Crop & Use"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
