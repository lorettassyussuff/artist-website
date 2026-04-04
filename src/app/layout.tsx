import type { Metadata } from "next";
import { getShellContent } from "@/lib/sanity/queries";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const shellContent = await getShellContent();

  return {
    title: shellContent.siteTitle,
    description: shellContent.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
