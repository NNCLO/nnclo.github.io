// CinematicCardFrame.tsx (stabilized)
"use client";
import { useRef, useCallback } from "react";
import { useScrollProgress } from "./hooks";

export default function CinematicCardFrame({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useScrollProgress(ref);

  const seg = useCallback(
    (a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a || 1))),
    [t],
  );
  const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

  const pCircle = ease(seg(0.04, 0.22));
  const pStep = ease(seg(0.1, 0.24));
  const pTitle = ease(seg(0.18, 0.34));
  const pShift = ease(seg(0.32, 0.46));
  const pCard = ease(seg(0.36, 0.58));
  const pCenter = ease(seg(0.54, 0.7));
  const pGlow = ease(seg(0.62, 0.8));
  const pFade = ease(seg(0.8, 0.96));

  const circleAlpha = (1 - pGlow * 0.85) * (1 - pFade);
  const cardGlowStrength = pGlow * (1 - pFade);
  const titleOpacity = pTitle * (1 - pFade);
  const stepOpacity = pStep * (1 - pFade);
  const groupShiftY = -22 * pShift;

  const cardY = (1 - pCard) * 48;
  const cardOpacity = pCard * (1 - Math.max(0, pFade - 0.1));
  const cardScale = 0.92 + 0.08 * pCard;
  const cardRotateX = (1 - pCard) * 10;
  const blurAmount = (1 - pCard) * 8;

  return (
    <section
      ref={ref}
      className="relative h-[240vh]"
      style={{
        // Cegah browser melakukan scroll adjustment otomatis
        overflowAnchor: "none",
        scrollSnapAlign: "none",
        overscrollBehavior: "contain",
      }}
      aria-label={`Section ${step}: ${title}`}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{
          // Isolasi tata letak agar perubahan di dalam tidak merembet
          contain: "layout paint style",
        }}
      >
        <div className="relative w-full max-w-[640px] px-4 flex flex-col items-center">
          {/* indikator */}
          {pCard < 0.5 && (
            <p
              className="absolute bottom-12 text-center text-white/40 text-sm tracking-widest uppercase transition-opacity duration-500"
              style={{ opacity: 1 - pCard * 2 }}
            >
              {step === "01"
                ? "The journey begins..."
                : step === "02"
                  ? "The blueprint awaits..."
                  : "The final form emerges..."}
            </p>
          )}
          {/* Kartu – sekarang benar‑benar terisolasi */}
          <div
            className="w-full rounded-2xl overflow-hidden backdrop-blur-md"
            style={{
              // Perubahan ukuran/posisi kartu tidak mempengaruhi tinggi section
              contain: "layout paint style",
              opacity: cardOpacity,
              transform: `translateY(${cardY}px) scale(${cardScale}) perspective(800px) rotateX(${cardRotateX}deg)`,
              filter: `blur(${blurAmount}px)`,
              border: `1px solid rgba(255,255,255,${0.12 + cardGlowStrength * 0.3})`,
              background: "rgba(6,6,14,0.75)",
              boxShadow: `0 0 ${12 + cardGlowStrength * 60}px rgba(255,255,255,${
                0.05 + cardGlowStrength * 0.25
              }), inset 0 0 ${cardGlowStrength * 24}px rgba(255,255,255,${
                cardGlowStrength * 0.08
              })`,
              transition: "transform 60ms linear, filter 60ms linear",
            }}
          >
            {/* Bungkus children dengan div yang mencegah perubahan tinggi bocor */}
            <div className="overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
