import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "زیبانا شاپ",
  description: "ساخته شده توسط تیم زیبانا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-IRANSansWeb">{children}</body>
    </html>
  );
}
