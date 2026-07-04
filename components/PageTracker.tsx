"use client";

import { useEffect } from "react";
import { registerScrollDepth, trackPageView } from "@/lib/analytics";

// 페이지 진입(view_linktree) + 75% 스크롤(scroll_75) 이벤트만 담당하는 순수 트래킹 컴포넌트.
// 화면에 아무것도 렌더하지 않음 (UI/로직 분리 = SRP).
export default function PageTracker() {
  useEffect(() => {
    trackPageView();
    const cleanup = registerScrollDepth(0.75);
    return cleanup;
  }, []);

  return null;
}
