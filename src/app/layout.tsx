import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "DevMetrics - Free GitHub Profile Stats Generator",
  description:
    "Free GitHub profile stats cards. Enter your username, pick a theme, copy the markdown. 20 themes, stats cards, top languages, and repo pins.",
  keywords: ["github", "stats", "profile", "readme", "svg", "developer", "devmetrics"],
  metadataBase: new URL("https://devmetricsforgithub.vercel.app"),
  openGraph: {
    title: "DevMetrics - Free GitHub Profile Stats Generator",
    description:
      "Generate beautiful stats cards for your GitHub profile README. Enter your username, pick a theme, copy the markdown.",
    url: "https://devmetricsforgithub.vercel.app",
    siteName: "DevMetrics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevMetrics - Free GitHub Profile Stats Generator",
    description:
      "Generate beautiful stats cards for your GitHub profile README. 20 themes, instant markdown.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0d1117] text-[#c9d1d9]">
        {children}
      </body>
    </html>
  );
}
