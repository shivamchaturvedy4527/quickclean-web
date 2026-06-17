import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pcts Infrastructures",
    template: "%s | Pcts Infrastructures",
  },
  description:
    "Pcts infrastructures Pvt Ltd — laundry & dry cleaning equipment, consultancy and service across India.",
  icons: { icon: "/images/favicon-32.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
