"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteLabels } from "@/types/cms";

const LabelsContext = createContext<SiteLabels | null>(null);

export function LabelsProvider({
  labels,
  children,
}: {
  labels: SiteLabels;
  children: ReactNode;
}) {
  return <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>;
}

export function useLabels(): SiteLabels {
  const ctx = useContext(LabelsContext);
  if (!ctx) throw new Error("useLabels must be used within LabelsProvider");
  return ctx;
}
