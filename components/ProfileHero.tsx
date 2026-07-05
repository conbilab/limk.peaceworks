import Image from "next/image";
import { hero } from "@/data/content";

// Hero 영역: 로고 → 프로필 → 이름/직함 → 헤드라인 → 신념 (렌더 전용, 상태 없음).
export default function ProfileHero() {
  return (
    <header className="flex flex-col items-center text-center animate-fade-up">
      {/* 프로필: 원형 84~96px */}
      <div className="mb-3 h-[92px] w-[92px] overflow-hidden rounded-full border border-line bg-surface">
        <Image
          src={hero.profileSrc}
          alt={hero.profileAlt}
          width={92}
          height={92}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <h1 className="text-lg font-bold text-navy">{hero.name}</h1>
      <p className="mt-1 text-sm text-muted">{hero.role}</p>

      {/* 헤드라인 (두 줄) — break-keep: 한글 단어 중간 줄바꿈 방지 */}
      <h2 className="mt-5 text-balance text-[26px] font-bold leading-[1.28] text-navy">
        {hero.headline.map((line, i) => (
          <span key={i} className="block break-keep">
            {line}
          </span>
        ))}
      </h2>

      <p className="mx-auto mt-4 max-w-[22rem] text-balance break-keep text-[15px] leading-[1.65] text-ink">
        {hero.body}
      </p>

      <p className="mx-auto mt-3 max-w-[22rem] text-balance break-keep text-[14px] leading-[1.6] text-muted">
        {hero.belief}
      </p>
    </header>
  );
}
