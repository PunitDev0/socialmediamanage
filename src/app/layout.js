import React, { Suspense } from "react";
import "@/app/globals.css";
import { Figtree } from "next/font/google";
// import { Header } from "@/components/HeroSection/header"
import { ClientThemeWrapper } from "@/components/HeroSection/ClientThemeWrapper";
import Script from "next/script";
import ContextProviders from "@/context/ContextProviders";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata = {
  title: "SocialSync - Grow Your Reach",
  description:
    "A smarter way to manage and schedule content across all social platforms.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${figtree.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <meta name="google-site-verification" content="mqAHT7zvLB6rcRZwZJQIMDhsXtQVVQ-ISGX0RcqJ1-g" />
      </head>
      <body className={figtree.className}>
        <ContextProviders>
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            {children}
          </Suspense>
        </ContextProviders>

        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
