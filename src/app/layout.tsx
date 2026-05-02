import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthButton } from "@/components/layout/auth-button";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenScale - AI Product Ad Generator",
  description: "Turn one product image into high-converting video ads in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 font-bold text-white">
                G
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">
                GenScale
              </span>
            </div>
            <AuthButton />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
