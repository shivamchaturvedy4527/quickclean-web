import Image from "next/image";
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
  if (!src) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-slate-200 to-slate-300",
          className
        )}
        aria-hidden
      />
    );
  }

  if (isExternal(src)) {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          priority={priority}
          sizes={sizes ?? "100vw"}
          unoptimized
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 600}
        className={cn("object-cover", className)}
        priority={priority}
        unoptimized
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        priority={priority}
        sizes={sizes ?? "100vw"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={cn("object-cover", className)}
      priority={priority}
    />
  );
}
