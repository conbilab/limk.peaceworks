import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";

// 정적 export에서도 sitemap.xml을 생성하도록 강제
export const dynamic = "force-static";

// 단일 페이지 사이트 → 메인 URL 하나만 등록
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
