"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CmsImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

function isExternal(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function objectFitClass(className?: string) {
  if (className && /\bobject-(contain|cover|fill|none|scale-down)\b/.test(className)) {
    return "";
  }
  return "object-cover";
}

export function CmsImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
}: CmsImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src) {
    return (
      <div
        className={cn("bg-gradient-to-br from-slate-200 to-slate-300", className)}
        aria-hidden
      />
    );
  }

  const external = isExternal(src);
  const useUnoptimized = !external || failed;

  const handleError = () => {
    if (!failed) setFailed(true);
  };

  const imageClass = cn(objectFitClass(className), className);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClass}
        priority={priority}
        sizes={sizes ?? "100vw"}
        unoptimized={useUnoptimized}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={imageClass}
      priority={priority}
      unoptimized={useUnoptimized}
      onError={handleError}
    />
  );
}
