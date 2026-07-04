import Image from "next/image";
import { hero } from "@/data/content";

// Hero 영역: 로고 → 프로필 → 이름/직함 → 헤드라인 → 신념 (렌더 전용, 상태 없음).
export default function ProfileHero() {
  return (
    <header className="flex flex-col items-center text-center animate-fade-up">
      {/* 로고: 워드마크+태그라인이 포함된 전체 락업이라 흰 배경 타일에 담아 크게 표시 */}
      <div className="mb-5 w-full max-w-[240px] overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-line">
        <Image
          src={hero.logoSrc}
          alt={hero.logoAlt}
          width={240}
          height={240}
          priority
          className="h-auto w-full object-contain"
        />
      </div>

      {/* 프로필: 원형 84~96px */}
      <div className="mb-3 h-[92px] w-[92px] overflow-hidden rounded-full border border-line bg-surface">
        <Image
          src={hero.profileSrc}
          alt={hero.profileAlt}
          width={92}
          height={92}
          className="h-full w-full object-cover"
        />
      </div>

      <h1 className="text-lg font-bold text-navy">{hero.name}</h1>
      <p className="mt-1 text-sm text-muted">{hero.role}</p>

      {/* 헤드라인 (두 줄) */}
      <h2 className="mt-5 text-[26px] font-bold leading-[1.28] text-navy">
        {hero.headline.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>

      <p className="mt-4 text-[15px] leading-[1.65] text-ink">{hero.body}</p>

      <p className="mt-3 text-[14px] leading-[1.6] text-muted">{hero.belief}</p>
    </header>
  );
}
