import type { SiteSettings } from "@/types/cms";
import type { CSSProperties } from "react";

/** Upper bounds are safety limits only — admin allows any value you enter. */
export const HEADER_LOGO_MIN_HEIGHT = 20;
export const HEADER_LOGO_MAX_HEIGHT = 500;
export const HEADER_LOGO_MAX_WIDTH = 800;

export function parseLogoWidth(settings: SiteSettings): number {
  const value = Number(settings.logoMaxWidth);
  if (!Number.isFinite(value) || value <= 0) return 242;
  return value;
}

export function parseLogoHeight(settings: SiteSettings): number {
  const value = Number(settings.logoMaxHeight);
  if (!Number.isFinite(value) || value <= 0) return 53;
  return value;
}

export function clampLogoHeight(height: number): number {
  return Math.min(HEADER_LOGO_MAX_HEIGHT, Math.max(HEADER_LOGO_MIN_HEIGHT, Math.round(height)));
}

export function clampLogoWidth(width: number): number {
  return Math.min(HEADER_LOGO_MAX_WIDTH, Math.max(80, Math.round(width)));
}

/** Height shown in header — width grows automatically from the logo image ratio. */
export function parseHeaderLogoHeight(settings: SiteSettings): number {
  const height = Number(settings.logoMaxHeight);
  if (Number.isFinite(height) && height >= HEADER_LOGO_MIN_HEIGHT) {
    return clampLogoHeight(height);
  }

  // Legacy saves used width only — map old width values to a sensible height.
  const width = parseLogoWidth(settings);
  return clampLogoHeight(Math.round((width / 242) * 53));
}

export function headerLogoDisplayStyle(settings: SiteSettings): CSSProperties {
  const height = parseHeaderLogoHeight(settings);
  return {
    height: `${height}px`,
    width: "auto",
    maxWidth: `${HEADER_LOGO_MAX_WIDTH}px`,
  };
}

/** Approximate header logo width for admin preview hint. */
export function estimateHeaderLogoWidth(settings: SiteSettings): number {
  const height = parseHeaderLogoHeight(settings);
  const ratio = parseLogoWidth(settings) / Math.max(parseLogoHeight(settings), 1);
  return Math.min(HEADER_LOGO_MAX_WIDTH, Math.round(height * ratio));
}

/** Footer: width-based sizing with a sensible cap. */
export function footerLogoDisplayStyle(settings: SiteSettings): CSSProperties {
  const width = Math.min(parseLogoWidth(settings), 280);
  return {
    width: `${width}px`,
    height: "auto",
    maxWidth: "100%",
  };
}

/** Keep footer width in sync when header height changes. */
export function scaleLogoWidth(height: number, settings: SiteSettings): number {
  const currentWidth = parseLogoWidth(settings);
  const currentHeight = Math.max(parseLogoHeight(settings), 1);
  const ratio = currentWidth / currentHeight;
  return clampLogoWidth(Math.round(height * ratio));
}

export function scaleLogoHeight(width: number, settings: SiteSettings): number {
  const currentWidth = parseLogoWidth(settings);
  const currentHeight = Math.max(parseLogoHeight(settings), 1);
  const ratio = currentWidth / currentHeight;
  return clampLogoHeight(Math.round(width / ratio));
}

/** @deprecated Use headerLogoDisplayStyle */
export function logoDisplayStyle(settings: SiteSettings): CSSProperties {
  return headerLogoDisplayStyle(settings);
}
