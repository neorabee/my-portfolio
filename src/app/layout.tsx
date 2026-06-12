import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rabeeaman.vercel.app/'),
  title: "Rabee Aman Achoth — Software Engineer",
  description:
    "Software Engineering Student building backend systems, developer tools, and software that turns complex ideas into useful products.",
  keywords: [
    "software engineer",
    "backend engineering",
    "developer tools",
    "Go",
    "Next.js",
    "Linux",
    "full-stack",
  ],
  authors: [{ name: "Rabee Aman Achoth" }],
  openGraph: {
    title: "Rabee Aman Achoth — Software Engineer",
    description:
      "Software Engineering Student building backend systems, developer tools, and software that turns complex ideas into useful products.",
    type: "website",
    images: [
      {
        url: "/randomlogo.png",
        width: 1200,
        height: 630,
        alt: "Rabee Aman Achoth: Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabee Aman Achoth: Software Engineer",
    description:
      "Building backend systems, developer tools, and software that turns complex ideas into useful products.",
    images: ["/randomlogo.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen bg-black relative text-foreground selection:bg-accent/30 selection:text-white">
        <ParticleBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}