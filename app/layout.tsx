import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LivePreviewProvider } from "./context/live-preview-context-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LivePreviewProvider>
          <div className="min-h-screen bg-gray-800 p-8 flex justify-center">
            <div className="w-[393px] bg-white min-h-screen shadow-2xl rounded-t-3xl">
              {children}
            </div>
          </div>
        </LivePreviewProvider>
      </body>
    </html>
  );
}
