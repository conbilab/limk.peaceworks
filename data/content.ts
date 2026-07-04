// 화면 카피/브랜드 콘텐츠 (PRD 7, 11, 14 기준). 문구 수정은 이 파일에서만.

export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  brand: "PEACEWORKS",
  seoTitle: "PEACEWORKS · 조피스 — 콘텐츠 마케팅",
  seoDescription:
    "콘텐츠로 신뢰를 만들고, 마케팅으로 필요한 사람에게 닿게 합니다. PEACEWORKS 조피스의 모임·콘텐츠 채널을 한곳에서 만나보세요.",
  ogImage: "/images/og.png",
};

export const hero = {
  label: "PEACEWORKS / 조피스",
  logoSrc: "/images/peaceworks-logo.png",
  logoAlt: "PEACEWORKS 로고",
  profileSrc: "/images/jopeace-profile.webp",
  profileAlt: "조피스 프로필 사진",
  name: "조피스",
  role: "PEACEWORKS 대표 · 콘텐츠 마케팅",
  // 헤드라인은 두 줄로 표시
  headline: ["콘텐츠로 신뢰를 만들고", "마케팅으로 필요한 사람에게 닿게 합니다."],
  body: "콘텐츠 마케팅, 강의, 컨설팅을 통해 브랜드의 생각이 시장에서 작동하도록 돕습니다.",
  belief: "좋은 콘텐츠는 사람을 설득하기보다, 필요한 사람에게 정확히 도착해야 합니다.",
};

export const impactCard = {
  badge: "1% for Children",
  title: "1% for Children",
  body: [
    "PEACEWORKS는 수익의 1%를 아이들의 꿈과 밝은 미래를 위해 사용합니다.",
    "성장은 숫자로만 남지 않고, 누군가의 내일에 닿아야 한다고 믿습니다.",
  ],
  // 기부 기록 공개 페이지가 생기면 여기에 URL을 채우면 링크가 노출됩니다.
  recordHref: "",
  recordLabel: "기부 기록 보기",
};

export const footer = {
  brand: "PEACEWORKS",
  tagline: "콘텐츠·강의·컨설팅으로 평화를 만드는 일",
  // 문의 이메일이 생기면 채우세요. 비우면 링크 미노출.
  contactEmail: "",
};
