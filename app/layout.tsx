import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyprus Land Registry",
  description: "Cyprus Land Registry",
  generator: "Umpacto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
