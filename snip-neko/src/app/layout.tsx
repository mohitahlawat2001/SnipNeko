import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnipNeko - Share Code Snippets",
  description:
    "Share code snippets quickly and securely. Snippets automatically expire after 24 hours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
