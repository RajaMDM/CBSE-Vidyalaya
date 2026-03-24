import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CBSE Vidyalaya - AI-Powered Interactive Classroom",
  description:
    "An immersive, multi-agent learning experience for CBSE curriculum. Classes 1-12, NCERT-aligned, board exam preparation.",
  keywords: [
    "CBSE",
    "NCERT",
    "interactive classroom",
    "AI teacher",
    "board exam",
    "Class 10",
    "Class 12",
    "online education",
    "India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
