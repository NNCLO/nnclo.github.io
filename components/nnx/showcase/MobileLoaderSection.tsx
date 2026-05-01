"use client";
import { useRef } from "react";
import { useScrollProgress } from "./hooks";
import { LOADER_TEXT } from "./data";

export default function MobileLoaderSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);

  const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

  const pAppear = ease(clamp(progress / 0.1));
  const pType = clamp((progress - 0.08) / 0.37);
  const pErase = clamp((progress - 0.55) / 0.15);
  const pCollapse = ease(clamp((progress - 0.68) / 0.14));
  const pExtend = ease(clamp((progress - 0.8) / 0.15));
  const pStub = ease(clamp((progress - 0.93) / 0.07));

  const charsTyped = Math.ceil(pType * LOADER_TEXT.length);
  const charsErased = Math.floor(pErase * LOADER_TEXT.length);
  const visibleChars = Math.max(0, charsTyped - charsErased);
  const showCursor = pAppear > 0.6 && pCollapse < 0.05;
  const termScaleY = Math.max(0.012, 1 - pCollapse * 0.988);

  return (
    <div ref={wrapRef} style={{ height: "200vh", position: "relative" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_40%_44%,#06060E_0%,#000_100%)]">
        {/* Scanline */}
        <div
          className="absolute inset-0 pointer-events-none opacity-100"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
          }}
        />

        {/* Horizontal connector */}
        <div
          className="absolute left-[22px] right-[calc(50%+140px)] top-1/2 h-px origin-right pointer-events-none"
          style={{
            transform: `translateY(-0.5px) scaleX(${pExtend})`,
            background:
              "linear-gradient(to left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.4) 100%)",
            boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            opacity: pExtend,
          }}
        />

        {/* Vertical stub */}
        <div
          className="absolute left-[22px] top-1/2 w-px pointer-events-none"
          style={{
            height: `${pStub * 22}vh`,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 100%)",
            boxShadow: "0 0 6px rgba(255,255,255,0.3)",
            opacity: pStub,
          }}
        />

        {/* Terminal */}
        <div
          className="absolute w-[min(280px,78vw)]"
          style={{
            opacity: pAppear,
            transform: `scaleY(${termScaleY})`,
            transformOrigin: "center",
          }}
        >
          <div
            className="border backdrop-blur-md overflow-hidden transition-[border-radius] duration-200"
            style={{
              borderColor: `rgba(255,255,255,${0.18 + pCollapse * 0.5})`,
              borderRadius: pCollapse > 0.7 ? "1px" : "10px",
              background: "rgba(8,8,14,0.92)",
              boxShadow:
                pCollapse > 0.4
                  ? `0 0 ${20 + pCollapse * 50}px rgba(255,255,255,${pCollapse * 0.5})`
                  : "0 8px 32px rgba(0,0,0,0.6), 0 0 24px rgba(255,255,255,0.04)",
            }}
          >
            {/* Header */}
            <div className="flex items-center px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-[5px]">
                <span className="w-2 h-2 rounded-full bg-red-400/55" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/55" />
                <span className="w-2 h-2 rounded-full bg-green-400/55" />
              </div>
              <span className="ml-auto font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">
                ~/max-arc
              </span>
            </div>

            {/* Body */}
            <div className="px-4 pt-5 pb-[22px] font-mono text-base tracking-[0.04em] text-[#E8EDF8] min-h-[60px] flex items-center">
              <span className="text-emerald-300/85 mr-2">$</span>
              <span className="whitespace-pre">
                {LOADER_TEXT.slice(0, visibleChars)}
              </span>
              {showCursor && (
                <span className="inline-block w-2 h-[1em] bg-white/85 ml-0.5 animate-[arcCursorBlink_0.62s_step-end_infinite] shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
