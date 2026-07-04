"use client";

import { impactCard } from "@/data/content";
import { trackEvent } from "@/lib/analytics";

// 수익 1% 기부(임팩트) 카드. recordHref가 있을 때만 '기부 기록 보기' 링크 노출.
export default function ImpactCard() {
  const hasRecord = Boolean(impactCard.recordHref);

  return (
    <section
      aria-labelledby="impact-title"
      className="rounded-card border border-line bg-surface p-6 text-center"
    >
      <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
        {impactCard.badge}
      </span>

      <h3 id="impact-title" className="mt-3 text-base font-bold text-navy">
        {impactCard.title}
      </h3>

      <div className="mt-2 space-y-1">
        {impactCard.body.map((line, i) => (
          <p key={i} className="text-[14px] leading-[1.65] text-muted">
            {line}
          </p>
        ))}
      </div>

      {hasRecord && (
        <a
          href={impactCard.recordHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("click_impact_card")}
          className="mt-4 inline-block text-sm font-semibold text-gold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {impactCard.recordLabel} →
        </a>
      )}
    </section>
  );
}
