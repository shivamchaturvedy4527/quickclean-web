"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "/images/ppt/slide23_img07.jpg";

interface CmsImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

function objectFitClass(className?: string) {
  if (className && /\bobject-(contain|cover|fill|none|scale-down)\b/.test(className)) {
    return "";
  }
  return "object-cover";
}

/** Native img for all sources so inline styles (logo size) work on Blob URLs too. */
export function CmsImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  style,
}: CmsImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_IMAGE);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_IMAGE);
    setFailed(false);
  }, [src]);

  if (!src && failed) {
    return (
      <div
        className={cn("bg-gradient-to-br from-slate-200 to-slate-300", className)}
        aria-hidden
      />
    );
  }

  const imageClass = cn(objectFitClass(className), className);
  const handleError = () => {
    if (currentSrc !== FALLBACK_IMAGE) {
      setCurrentSrc(FALLBACK_IMAGE);
      return;
    }
    setFailed(true);
  };

  if (fill) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full", imageClass)}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={handleError}
      />
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={style?.width ? undefined : (width ?? 800)}
      height={style?.height ? undefined : (height ?? 600)}
      className={imageClass}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={handleError}
    />
  );
}
