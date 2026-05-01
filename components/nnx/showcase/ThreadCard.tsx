"use client";
import React from "react";
import { useInView } from "./hooks";

interface ThreadCardProps {
  // Indeks untuk delay animasi
  index: number;
  // Konten utama
  icon: React.ReactNode;
  chapter: string;
  bracket: string;
  title: string;
  subtitle: string;
  body: string;
  accentRgb: string;
  color: string;
  isLast: boolean;
  // Untuk tier, ada systemLabel dan tags; ARC tidak punya
  systemLabel?: string;
  systemTagline?: string;
  tags?: readonly string[];
  // Accordion state
  open: boolean;
  onToggle: () => void;
  // ID unik untuk aria
  detailId: string;
}

export default function ThreadCard({
  index,
  icon,
  chapter,
  bracket,
  title,
  subtitle,
  body,
  accentRgb,
  color,
  isLast,
  systemLabel,
  systemTagline,
  tags,
  open,
  onToggle,
  detailId,
}: ThreadCardProps) {
  const { ref, inView } = useInView(0.15);

  const dotSize = 28; // ukuran titik timeline

  return (
    <div
      ref={ref}
      className="relative flex gap-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-12px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      {/* Kolom Timeline */}
      <div className="relative flex flex-col items-center w-10 min-w-[40px]">
        {/* Dot */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full transition-all duration-500 mt-1"
          style={{
            width: dotSize,
            height: dotSize,
            background: open
              ? `rgba(${accentRgb},0.18)`
              : inView
                ? `rgba(${accentRgb},0.1)`
                : "rgba(14,14,26,0.95)",
            border: open
              ? `2px solid rgba(${accentRgb},0.9)`
              : inView
                ? `1.5px solid rgba(${accentRgb},0.6)`
                : "1.5px solid rgba(255,255,255,0.06)",
            color: open ? color : inView ? color : "#4a4f6a",
            boxShadow: open
              ? `0 0 0 6px rgba(${accentRgb},0.1), 0 0 20px rgba(${accentRgb},0.25)`
              : inView
                ? `0 0 0 4px rgba(${accentRgb},0.06), 0 0 12px rgba(${accentRgb},0.15)`
                : "none",
            transform: open ? "scale(1.1)" : "scale(1)",
          }}
        >
          {icon}
        </div>

        {/* Garis ke bawah */}
        {!isLast && (
          <div
            className="flex-1 w-[2px] transition-all duration-500"
            style={{
              background: open
                ? `linear-gradient(to bottom, ${color}, rgba(${accentRgb},0.2))`
                : inView
                  ? `linear-gradient(to bottom, rgba(${accentRgb},0.35), rgba(${accentRgb},0.05))`
                  : "rgba(255,255,255,0.03)",
              minHeight: open ? "24px" : "12px",
              boxShadow: open
                ? `0 0 8px ${color}33`
                : inView
                  ? `0 0 4px rgba(${accentRgb},0.1)`
                  : "none",
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Konten Kartu */}
      <div className="flex-1 min-w-0 pb-4 pl-3">
        {/* Header yang bisa diklik untuk toggle */}
        <button
          onClick={onToggle}
          className="w-full text-left group"
          aria-expanded={open}
          aria-controls={detailId}
        >
          <div
            className="rounded-xl transition-all duration-500 overflow-hidden"
            style={{
              background: open
                ? `rgba(${accentRgb},0.06)`
                : "rgba(255,255,255,0.02)",
              border: open
                ? `1px solid rgba(${accentRgb},0.25)`
                : "1px solid rgba(255,255,255,0.04)",
              boxShadow: open ? `0 8px 24px rgba(${accentRgb},0.08)` : "none",
            }}
          >
            <div className="p-4">
              {/* Meta info */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[9px] tracking-[0.4em] uppercase font-semibold"
                  style={{ color: open ? color : `rgba(${accentRgb},0.5)` }}
                >
                  {chapter}
                </span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-white/10">
                  {bracket}
                </span>
              </div>
              <h3
                className="font-[family-name:var(--font-bebas),sans-serif] tracking-[0.06em] leading-none transition-colors duration-300 text-[clamp(18px,4vw,22px)]"
                style={{ color: open ? "#E8EDF8" : "#b0b8d0" }}
              >
                {title}
              </h3>
              <p
                className="text-[10px] mt-1 tracking-[0.04em]"
                style={{ color: open ? `rgba(${accentRgb},0.7)` : "#7A8099" }}
              >
                {subtitle}
              </p>
            </div>
          </div>
        </button>

        {/* Detail yang dapat di-expand */}
        <div
          id={detailId}
          className="overflow-hidden transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            maxHeight: open ? "600px" : "0px",
            opacity: open ? 1 : 0,
            contain: "layout style",
          }}
        >
          <div
            className="mt-3 rounded-xl overflow-hidden p-4"
            style={{
              border: `1px solid rgba(${accentRgb},0.15)`,
              background: `linear-gradient(135deg, rgba(${accentRgb},0.05) 0%, rgba(6,6,14,0.95) 100%)`,
              boxShadow: `0 4px 16px rgba(${accentRgb},0.06)`,
            }}
          >
            <p
              className="font-[family-name:var(--font-bebas),sans-serif] text-[clamp(16px,3.5vw,20px)] leading-tight mb-3"
              style={{
                color: color,
                textShadow: `0 0 8px rgba(${accentRgb},0.3)`,
              }}
            >
              {body}
            </p>

            {systemLabel && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-[8px] tracking-[0.3em] uppercase px-2 py-1 rounded-full"
                  style={{
                    color: `rgba(${accentRgb},0.8)`,
                    border: `1px solid rgba(${accentRgb},0.2)`,
                    background: `rgba(${accentRgb},0.08)`,
                  }}
                >
                  {systemLabel}
                </span>
                {systemTagline && (
                  <span className="text-[9px] italic text-[#5A6070]">
                    {systemTagline}
                  </span>
                )}
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.04em] px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{
                      color: `rgba(${accentRgb},0.7)`,
                      border: `1px solid rgba(${accentRgb},0.15)`,
                      background: `rgba(${accentRgb},0.04)`,
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
