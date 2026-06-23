import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clashDisplayFont = localFont({
  src: [
    {
      path: "./fonts/ClashDisplay-Regular.otf",
      weight: "400",
    },
    {
      path: "./fonts/ClashDisplay-Extralight.otf",
      weight: "200",
    },
    {
      path: "./fonts/ClashDisplay-Light.otf",
      weight: "300",
    },
    {
      path: "./fonts/ClashDisplay-Medium.otf",
      weight: "500",
    },
    {
      path: "./fonts/ClashDisplay-Semibold.otf",
      weight: "600",
    },
    {
      path: "./fonts/ClashDisplay-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-clash-display"
});

export const metadata: Metadata = {
  title: "Earl John Rafael",
  description: "E-Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${clashDisplayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
