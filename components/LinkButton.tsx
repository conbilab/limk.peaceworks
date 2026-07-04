"use client";

import type { LinkItem } from "@/data/links";
import { isPlaceholderHref } from "@/data/links";
import { trackEvent } from "@/lib/analytics";

interface LinkButtonProps {
  item: LinkItem;
}

// 링크 버튼 1개 렌더 + 클릭 이벤트 발화만 담당 (UI 컴포넌트).
export default function LinkButton({ item }: LinkButtonProps) {
  const { title, description, href, primary, event, icon } = item;

  const handleClick = () => {
    trackEvent(event);
    if (primary) trackEvent("click_primary_cta");
  };

  const baseClass =
    "group flex w-full items-center gap-3 rounded-btn border px-4 py-4 text-left transition-transform duration-150 will-change-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const primaryClass = "bg-navy border-navy text-surface shadow-sm";
  const normalClass = "bg-surface border-line text-ink";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`${title} — ${description}`}
      className={`${baseClass} ${primary ? primaryClass : normalClass}`}
      style={{ minHeight: 56 }}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={`text-lg ${primary ? "text-surface" : "text-navy"}`}
        >
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block text-base font-bold leading-tight">{title}</span>
        <span
          className={`block text-[13px] leading-snug ${
            primary ? "text-surface/80" : "text-muted"
          }`}
        >
          {description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`text-lg transition-transform duration-150 group-hover:translate-x-0.5 ${
          primary ? "text-surface" : "text-muted"
        }`}
      >
        →
      </span>
      {isPlaceholderHref(href) && (
        // 개발 편의: URL 미설정 시 화면에는 안 보이는 표식 (스크린리더 무시)
        <span className="sr-only">링크 준비 중</span>
      )}
    </a>
  );
}
