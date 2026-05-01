"use client";
import { useRef, useState, useCallback } from "react";
import { useInView, useScrollProgress } from "./hooks";
import { TIERS } from "./data";
import ThreadCard from "./ThreadCard";

export default function MaxSection() {
  const { ref: sectionRef, inView: labelIn } = useInView(0.1);
  const spineRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(spineRef);

  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const toggle = useCallback((code: string) => {
    setOpenMap((prev) => ({ ...prev, [code]: !prev[code] }));
  }, []);

  const thresholds = [0.0, 0.35, 0.7];
  const nodeActive = thresholds.map((t) => progress >= t);

  return (
    <div className="mb-4" aria-labelledby="max-heading">
      {/* Act label */}
      <div
        ref={sectionRef}
        className="flex items-center gap-2 mb-6"
        style={{
          opacity: labelIn ? 1 : 0,
          transform: labelIn ? "none" : "translateY(8px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="h-px w-4 shrink-0 bg-[rgba(0,212,255,0.3)]" />
        <p
          id="max-heading"
          className="text-[10px] tracking-[0.45em] uppercase shrink-0 text-[rgba(0,212,255,0.45)]"
        >
          Act I — MAX · Depth of Solution
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-[rgba(0,212,255,0.1)] to-transparent" />
      </div>

      <div ref={spineRef} className="relative">
        {/* Progress bar vertikal global (threadline) — opsional, bisa dihapus jika thread card sudah cukup */}
        <div
          className="absolute top-0 left-[19px] w-[2px] bottom-0 pointer-events-none z-0 rounded-full"
          style={{
            height: `${progress * 100}%`,
            background: "linear-gradient(to bottom, #00d4ff, #9d6fff, #00ff88)",
            boxShadow: "0 0 8px rgba(255,255,255,0.15)",
            transition: "height 60ms linear",
          }}
        />

        <div className="relative z-10 flex flex-col gap-0">
          {TIERS.map((tier, i) => (
            <ThreadCard
              key={tier.code}
              index={i}
              icon={<tier.Icon size={13} />}
              chapter={tier.chapter}
              bracket={tier.bracket}
              title={tier.title}
              subtitle={tier.subtitle}
              body={tier.hook}
              accentRgb={tier.accentRgb}
              color={tier.color}
              isLast={i === TIERS.length - 1}
              systemLabel={tier.systemLabel}
              systemTagline={tier.systemTagline}
              tags={tier.tags}
              open={openMap[tier.code] ?? false}
              onToggle={() => toggle(tier.code)}
              detailId={`tier-${tier.code}-detail`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
