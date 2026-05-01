// CinematicTimeline.tsx (upgraded)
"use client";
import { useRef } from "react";
import { useScrollProgress } from "./hooks";

export default function CinematicTimeline({ stations }: { stations: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute left-0 top-0 bottom-0 pointer-events-none z-0"
      style={{ width: "calc(22px + 14px)" }}
    >
      {/* Background rail (lebih redup) */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{
          left: "22px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      {/* Neon active progress dengan gradien tiga warna */}
      <div
        className="absolute top-0 w-[2px] transition-[height] duration-[60ms] rounded-full"
        style={{
          left: "21.5px",
          height: `${progress * 100}%`,
          background:
            "linear-gradient(to bottom, #00d4ff, #9d6fff 60%, #00ff88)",
          boxShadow:
            "0 0 10px rgba(0,212,255,0.8), 0 0 20px rgba(157,111,255,0.5), 0 0 30px rgba(0,255,136,0.3)",
          filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))",
        }}
      />

      {/* Partikel kecil di sepanjang garis (jejak) */}
      {progress > 0.02 && (
        <div
          className="absolute left-[22px] top-0 w-px overflow-hidden pointer-events-none"
          style={{ height: `${progress * 100}%` }}
        >
          {Array.from({ length: Math.floor(progress * 20) }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-white"
              style={{
                top: `${(i / (progress * 20)) * 100}%`,
                opacity: 0.5 + Math.random() * 0.5,
                boxShadow: "0 0 6px rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      )}

      {/* Traveling dot + cincin pulsa */}
      <div
        className="absolute"
        style={{
          left: "14px",
          top: `calc(${progress * 100}% - 7px)`,
          opacity: progress > 0.001 && progress < 0.999 ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      >
        {/* Cincin luar berdenyut */}
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            width: "16px",
            height: "16px",
            marginLeft: "-4px",
            marginTop: "-4px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 0 12px rgba(0,212,255,0.8)",
            animationDuration: "1.5s",
          }}
        />
        {/* Titik utama */}
        <div
          className="w-[14px] h-[14px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(0,212,255,0.8))",
            boxShadow:
              "0 0 14px rgba(0,212,255,0.9), 0 0 28px rgba(157,111,255,0.5)",
          }}
        />
      </div>

      {/* Stasiun – sekarang berbentuk diamond kecil yang menyala saat tercapai */}
      {Array.from({ length: stations }).map((_, i) => {
        const stationPos = (i + 0.5) / stations;
        const reached = progress >= stationPos - 0.04;
        const active = Math.abs(progress - stationPos) < 0.06;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: "16px",
              top: `calc(${stationPos * 100}% - 5px)`,
              width: "10px",
              height: "10px",
              transform: "rotate(45deg)",
              border: `1px solid ${
                reached ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)"
              }`,
              background: reached
                ? "rgba(255,255,255,0.15)"
                : "rgba(6,6,14,0.8)",
              boxShadow: active
                ? "0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(0,212,255,0.8)"
                : reached
                  ? "0 0 4px rgba(255,255,255,0.4)"
                  : "none",
              transition:
                "background 300ms, border-color 300ms, box-shadow 300ms",
            }}
          />
        );
      })}
    </div>
  );
}
