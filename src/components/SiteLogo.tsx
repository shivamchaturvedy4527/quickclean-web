"use client";

import type { SiteSettings } from "@/types/cms";
import { headerLogoDisplayStyle } from "@/lib/logo-size";
import { cn } from "@/lib/utils";
import { CmsImage } from "./CmsImage";

interface SiteLogoProps {
  settings: SiteSettings;
  /** Header = white bar. Footer = same logo on white pad over dark footer. */
  variant?: "header" | "footer";
  priority?: boolean;
  className?: string;
}

export function SiteLogo({
  settings,
  variant = "header",
  priority = false,
  className,
}: SiteLogoProps) {
  if (!settings.logo) {
    return (
      <span className={cn("text-xl font-bold tracking-tight text-gray-900", className)}>
        {settings.siteName}
      </span>
    );
  }

  const image = (
    <CmsImage
      src={settings.logo}
      alt={settings.siteName}
      priority={priority}
      className={cn("max-w-none object-contain object-left", variant === "header" && className)}
      style={headerLogoDisplayStyle(settings)}
    />
  );

  if (variant === "footer") {
    return (
      <div className={cn("inline-flex rounded-lg bg-white px-3 py-2", className)}>
        {image}
      </div>
    );
  }

  return image;
}
