// 링크 데이터 (하드코딩 금지 원칙 → 이 파일에서만 관리)
// URL만 실제 값으로 교체하면 됩니다. 비워두면(#) 해당 버튼은 자동으로 감춰집니다.

export type LinkEvent =
  | "click_meeting"
  | "click_instagram"
  | "click_youtube"
  | "click_threads"
  | "click_blog"
  | "click_impact_card";

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  href: string;
  /** 메인 CTA 여부 (가장 강조되는 단 하나) */
  primary?: boolean;
  /** GA4 클릭 이벤트명 */
  event: LinkEvent;
  /** 버튼 앞 아이콘 (이모지/문자, 접근성상 aria-hidden 처리) */
  icon?: string;
}

// TODO: 아래 href의 [..._URL] 자리표시자를 실제 링크로 교체하세요.
export const links: LinkItem[] = [
  {
    id: "meeting",
    title: "모임 참여하기",
    description: "함께 배우고 실행하는 콘텐츠 마케팅 모임",
    href: "https://forms.gle/7tFpuhMC4TZSaeJs8",
    primary: true,
    event: "click_meeting",
    icon: "◎",
  },
  {
    id: "instagram",
    title: "인스타그램",
    description: "짧은 인사이트와 일상 기록",
    href: "https://www.instagram.com/jo_peaceworks/",
    event: "click_instagram",
    icon: "◐",
  },
  {
    id: "youtube",
    title: "유튜브",
    description: "강의, 사례, 콘텐츠 마케팅 이야기",
    // 아직 채널 없음 → 자리표시자로 두면 자동으로 숨겨짐 (URL만 넣으면 다시 노출)
    href: "#YOUTUBE_URL",
    event: "click_youtube",
    icon: "▶",
  },
  {
    id: "threads",
    title: "스레드",
    description: "조피스의 생각과 짧은 기록",
    href: "https://www.threads.com/@jo_peaceworks?hl=ko",
    event: "click_threads",
    icon: "＠",
  },
  {
    id: "blog",
    title: "블로그",
    description: "긴 글, 프레임워크, 실행 노트",
    href: "https://피스노트.com",
    event: "click_blog",
    icon: "✎",
  },
];

/** 메인 CTA 1개를 안전하게 추출 (URL 미설정이면 노출 안 함) */
export const getPrimaryLink = (items: LinkItem[] = links): LinkItem | undefined =>
  items.find((l) => l.primary && !isPlaceholderHref(l.href));

/** 메인 CTA를 제외한 채널 링크들 (URL 미설정 링크는 자동 숨김) */
export const getChannelLinks = (items: LinkItem[] = links): LinkItem[] =>
  items.filter((l) => !l.primary && !isPlaceholderHref(l.href));

/** 자리표시자(#...)인지 여부 → 아직 미설정 링크 판별 */
export const isPlaceholderHref = (href: string): boolean =>
  !href || href.startsWith("#");
