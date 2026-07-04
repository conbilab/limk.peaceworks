import ProfileHero from "@/components/ProfileHero";
import LinkButton from "@/components/LinkButton";
import ImpactCard from "@/components/ImpactCard";
import PageTracker from "@/components/PageTracker";
import { footer } from "@/data/content";
import { getChannelLinks, getPrimaryLink } from "@/data/links";

// 페이지 조립만 담당 (데이터는 data/, 로직은 lib/, 렌더는 components/).
export default function Home() {
  const primary = getPrimaryLink();
  const channels = getChannelLinks();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-page flex-col gap-6 px-6 py-8">
      {/* 페이지 진입/스크롤 이벤트 트래킹 (렌더 없음) */}
      <PageTracker />

      <ProfileHero />

      {/* 메인 CTA (가장 강조) */}
      {primary && (
        <section aria-label="주요 행동" className="animate-fade-up">
          <LinkButton item={primary} />
        </section>
      )}

      {/* 채널 링크 리스트 */}
      <nav aria-label="채널 링크" className="animate-fade-up">
        <ul className="flex flex-col gap-3">
          {channels.map((item) => (
            <li key={item.id}>
              <LinkButton item={item} />
            </li>
          ))}
        </ul>
      </nav>

      {/* 임팩트(기부) 카드 */}
      <div className="animate-fade-up">
        <ImpactCard />
      </div>

      {/* 푸터 */}
      <footer className="mt-2 pb-2 text-center">
        <p className="text-sm font-bold text-navy">{footer.brand}</p>
        <p className="mt-1 text-xs text-muted">{footer.tagline}</p>
        {footer.contactEmail && (
          <a
            href={`mailto:${footer.contactEmail}`}
            className="mt-2 inline-block text-xs text-muted underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            {footer.contactEmail}
          </a>
        )}
        <p className="mt-3 text-[11px] text-muted/70">
          © {new Date().getFullYear()} {footer.brand}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
