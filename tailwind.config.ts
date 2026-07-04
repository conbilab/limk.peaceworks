import type { Config } from "tailwindcss";

// PRD 9. UI 디자인 시스템의 컬러 팔레트 / 타이포 / 라운드 값을 토큰으로 정의
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F4EF", // 전체 배경 (아이보리)
        surface: "#FFFCF7", // 카드/버튼 배경
        navy: "#071B38", // 로고, 메인 CTA, 주요 텍스트
        ink: "#111827", // 본문 텍스트
        muted: "#6B7280", // 설명문
        line: "#E7E0D6", // 버튼 경계선
        gold: "#B98A44", // 1% 기부 배지, 작은 강조
        softblue: "#EAF2FF", // 미세한 배경 그라데이션
      },
      maxWidth: {
        page: "430px", // PRD 10. 최대 콘텐츠 폭
      },
      borderRadius: {
        card: "28px", // 카드 라운드
        btn: "18px", // 버튼 라운드
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Pretendard Variable",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      keyframes: {
        // 첫 진입 시 0.2~0.4초 fade-up (과한 모션 금지)
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
