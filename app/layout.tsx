import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/content";
import GAScripts from "@/components/GAScripts";

// SEO / Open Graph (PRD 12, 15)
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    siteName: siteConfig.brand,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 웹폰트 (동적 서브셋 CDN) */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <GAScripts gaId={siteConfig.gaId} />
        {children}
      </body>
    </html>
  );
}
