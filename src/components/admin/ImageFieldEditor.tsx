"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Crop, ImagePlus, Loader2, Upload, X } from "lucide-react";
import { ImageCropModal } from "./ImageCropModal";
import { isSvgFile, isSvgPath, detectCropFormat, cropFileExtension, type CropOutputFormat } from "@/lib/crop-image";

interface ImageFieldEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  /** Fixed crop ratio, e.g. 16/9 or 4/3. Omit for free crop. */
  cropAspect?: number;
  /** Always save crop as this format (logos should use PNG for transparency). */
  forceOutputFormat?: CropOutputFormat;
}

export function ImageFieldEditor({
  label,
  value,
  onChange,
  hint,
  cropAspect,
  forceOutputFormat,
}: ImageFieldEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [library, setLibrary] = useState<string[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [error, setError] = useState("");
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropFileName, setCropFileName] = useState("image.png");
  const [cropFormat, setCropFormat] = useState<CropOutputFormat>("image/png");
  const cropObjectUrl = useRef<string | null>(null);

  const clearCrop = useCallback(() => {
    if (cropObjectUrl.current) {
      URL.revokeObjectURL(cropObjectUrl.current);
      cropObjectUrl.current = null;
    }
    setCropSrc(null);
  }, []);

  const loadLibrary = useCallback(async () => {
    setLibraryLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) throw new Error("Could not load images");
      const data = (await res.json()) as { images: string[] };
      setLibrary(data.images);
    } catch {
      setError("Could not load image library");
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (libraryOpen) loadLibrary();
  }, [libraryOpen, loadLibrary]);

  async function uploadFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const resolveCropFormat = (source: { file?: File; src?: string }): CropOutputFormat =>
    forceOutputFormat ?? detectCropFormat(source);

  function openCropForFile(file: File) {
    if (isSvgFile(file)) {
      uploadFile(file);
      return;
    }

    const format = resolveCropFormat({ file });
    const ext = cropFileExtension(format);
    setCropFormat(format);
    setCropFileName(`${file.name.replace(/\.[^.]+$/i, "")}-cropped.${ext}`);
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.onerror = () => setError("Could not read image file");
    reader.readAsDataURL(file);
  }

  function openCropForExisting() {
    if (!value || isSvgPath(value)) return;

    void (async () => {
      const format = resolveCropFormat({ src: value });
      const ext = cropFileExtension(format);
      setCropFormat(format);
      setCropFileName(`crop-${Date.now()}.${ext}`);
      setError("");
      clearCrop();

      try {
        if (value.startsWith("http") && !value.startsWith(window.location.origin)) {
          const res = await fetch(`/api/admin/proxy-image?url=${encodeURIComponent(value)}`);
          if (!res.ok) throw new Error("Could not load image");
          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          cropObjectUrl.current = objectUrl;
          setCropSrc(objectUrl);
        } else {
          setCropSrc(value);
        }
      } catch {
        setError("Could not load image for cropping");
      }
    })();
  }

  async function handleCropConfirm(blob: Blob) {
    clearCrop();
    const file = new File([blob], cropFileName, { type: cropFormat });
    await uploadFile(file);
  }

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <label className="block text-sm font-semibold text-slate-800">{label}</label>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading..." : "Upload & Crop"}
        </button>
        {value && !isSvgPath(value) && (
          <button
            type="button"
            onClick={openCropForExisting}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            <Crop className="h-4 w-4" />
            Crop Image
          </button>
        )}
        <button
          type="button"
          onClick={() => setLibraryOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ImagePlus className="h-4 w-4" />
          Choose Existing
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) openCropForFile(file);
          e.target.value = "";
        }}
      />

      {value ? (
        <div
          className="mt-4 overflow-hidden rounded-lg border border-slate-200 p-2"
          style={{
            backgroundColor: "#e5e7eb",
            backgroundImage:
              "linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="mx-auto max-h-40 object-contain" />
          <p className="mt-2 break-all text-xs text-slate-500">{value}</p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-400">No image selected yet.</p>
      )}

      <details className="mt-3">
        <summary className="cursor-pointer text-xs text-slate-500">Advanced: paste image path or URL</summary>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/... or https://..."
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </details>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          aspect={cropAspect}
          outputFormat={cropFormat}
          onCancel={clearCrop}
          onConfirm={handleCropConfirm}
        />
      )}

      {libraryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">Choose Image</h3>
                <p className="text-xs text-slate-500">Images already used on your website</p>
              </div>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {libraryLoading ? (
                <div className="flex items-center justify-center py-16 text-slate-500">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading images...
                </div>
              ) : library.length === 0 ? (
                <p className="py-10 text-center text-slate-500">No images found. Upload one first.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {library.map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => {
                        onChange(src);
                        setLibraryOpen(false);
                      }}
                      className={`overflow-hidden rounded-lg border-2 bg-slate-50 p-1 text-left transition hover:border-accent ${
                        value === src ? "border-accent ring-2 ring-accent/20" : "border-transparent"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="aspect-square w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
