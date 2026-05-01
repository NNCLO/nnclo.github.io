"use client";
import { useRef } from "react";
import { useInView, useScrollProgress } from "./hooks";
import { ARC_STEPS } from "./data";
import ThreadCard from "./ThreadCard";
import { IconCheck } from "./icons"; // fallback jika tidak ada

export default function ArcJourney() {
  const { ref: wrapRef, inView: wrapIn } = useInView(0.1);
  const spineRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(spineRef);

  const thresholds = [0.0, 0.38, 0.72];
  const stepActive = thresholds.map((t) => progress >= t);

  return (
    <div
      ref={wrapRef}
      className="relative rounded-2xl overflow-hidden px-4 pt-6 pb-6 border border-[rgba(240,165,0,0.08)] bg-[#06060E]"
      style={{
        opacity: wrapIn ? 1 : 0,
        transform: wrapIn ? "none" : "translateY(24px)",
        transition:
          "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
      }}
      aria-labelledby="arc-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 90% 5%, rgba(240,165,0,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Act label */}
      <div className="relative flex items-center gap-2 mb-6">
        <div className="h-px w-4 shrink-0 bg-[rgba(240,165,0,0.3)]" />
        <p
          id="arc-heading"
          className="text-[10px] tracking-[0.45em] uppercase shrink-0 text-[rgba(240,165,0,0.45)]"
        >
          Act II — ARC · Method of Execution
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-[rgba(240,165,0,0.12)] to-transparent" />
      </div>

      <div className="relative mb-6">
        <h3 className="font-[family-name:var(--font-bebas),sans-serif] leading-[1.1] tracking-[0.04em] text-[#E8EDF8] mb-2 text-[clamp(20px,4.5vw,26px)]">
          Ide yang bagus tidak cukup.
          <br />
          <span className="text-[#f0a500]">
            Yang membedakan adalah caranya dieksekusi.
          </span>
        </h3>
        <p className="text-[11px] text-[#7A8099] tracking-[0.04em] leading-[1.85]">
          ARC adalah tiga langkah yang kami jalani di setiap project — bukan
          sekadar tahapan, tapi cara berpikir yang memastikan apa yang dibangun
          benar-benar relevan, berjalan, dan bertahan lama.
        </p>
      </div>

      <div ref={spineRef} className="relative">
        {/* Progress bar global untuk ARC */}
        <div
          className="absolute top-0 left-[19px] w-[2px] bottom-0 pointer-events-none z-0 rounded-full"
          style={{
            height: `${progress * 100}%`,
            background: "linear-gradient(to bottom, #00d4ff, #9d6fff, #f0a500)",
            boxShadow: "0 0 8px rgba(255,255,255,0.15)",
            transition: "height 60ms linear",
          }}
        />

        <div className="relative z-10 flex flex-col gap-0">
          {ARC_STEPS.map((s, i) => {
            const isActive = stepActive[i];
            return (
              <ThreadCard
                key={s.l}
                index={i}
                icon={<s.Icon size={13} />}
                chapter={s.step}
                bracket={s.verb}
                title={s.name}
                subtitle={s.body.substring(0, 60) + "..."}
                body={s.body}
                accentRgb={s.accentRgb}
                color={s.color}
                isLast={i === ARC_STEPS.length - 1}
                // Tidak ada systemLabel / tags untuk ARC
                open={isActive}
                onToggle={() => {}} // ARC tidak perlu toggle, selalu terbuka saat aktif
                detailId={`arc-${s.l}-detail`}
              />
            );
          })}
        </div>
      </div>

      {/* CTA kecil */}
      <div className="relative mt-4 rounded-xl p-4 bg-[rgba(240,165,0,0.04)] border border-[rgba(240,165,0,0.12)]">
        <div className="flex items-start gap-3">
          <div className="w-1 self-stretch rounded-full bg-[rgba(240,165,0,0.4)]" />
          <p className="text-[11px] text-[#7A8099] tracking-[0.04em] leading-[1.85]">
            MAX ARC bukan metodologi yang kami pinjam dari buku teks. Ia lahir
            dari pengalaman langsung — dan terus berkembang setiap kali kami
            membangun sesuatu yang baru.{" "}
            <span className="text-[#A0A5C0]">
              Hybrid agile dengan strong foundation.
            </span>{" "}
            Hemat 20–30% waktu dibanding proyek tanpa framework yang jelas.
          </p>
        </div>
      </div>
    </div>
  );
}
