import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Check-in",
  description: "Your personal productivity companion",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Check-in",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen`}
      >
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold text-indigo-600">
              Daily Check-in
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 text-sm">
                Chat
              </Link>
              <Link href="/review" className="text-gray-600 hover:text-indigo-600 text-sm">
                Review
              </Link>
              <Link href="/challenges" className="text-gray-600 hover:text-indigo-600 text-sm">
                Challenges
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
