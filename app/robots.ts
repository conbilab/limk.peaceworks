import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";

// 정적 export에서도 robots.txt를 생성하도록 강제
export const dynamic = "force-static";

// 검색엔진 크롤링 허용 + 사이트맵 위치 안내
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
