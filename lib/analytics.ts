// GA4 이벤트 전송 순수 로직 (UI와 분리 · gtag 구체 구현에 컴포넌트가 직접 의존하지 않도록 래핑 = DIP)

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * GA4 이벤트 전송.
 * - gtag가 아직 로드되지 않았거나 GA_ID 미설정이면 조용히 무시(안전).
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/** 페이지 진입 이벤트 */
export function trackPageView(): void {
  trackEvent("view_linktree");
}

/** 스크롤 75% 도달을 1회만 보고하는 리스너를 등록하고, 해제 함수를 반환 */
export function registerScrollDepth(threshold = 0.75): () => void {
  if (typeof window === "undefined") return () => {};
  let fired = false;

  const onScroll = () => {
    if (fired) return;
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    if (total <= 0) return;
    if (scrolled / total >= threshold) {
      fired = true;
      trackEvent("scroll_75");
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  // 콘텐츠가 짧아 이미 임계치를 넘긴 경우도 처리
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}
