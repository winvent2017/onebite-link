import type { Metadata } from "next";
import "./globals.css";
import { FoldersProvider } from "@/lib/folders-context";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "한입 크기로 정리하는 북마크 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)]">
        <FoldersProvider>{children}</FoldersProvider>
      </body>
    </html>
  );
}
