import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QuickClean",
    template: "%s | QuickClean",
  },
  description: "Quick Clean Laundry Systems — Sustainable Laundry Solutions",
  icons: { icon: "/images/favicon-32.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrument.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
