"use client";
import { useInView } from "./hooks";

export default function JourneyOpening() {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="relative rounded-[14px] overflow-hidden mb-[4px] border border-white/5 bg-[#06060E]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(0,212,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(157,111,255,0.06) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
        }}
      />

      <div className="relative px-[20px] pt-[28px] pb-[26px]">
        <div className="flex items-center gap-[6px] mb-[20px]">
          <span className="text-[8px] text-[#5A6070] tracking-[0.5em] uppercase">
            // showcase
          </span>
          <span className="text-[#5A6070]">·</span>
          <span className="text-[8px] text-[#5A6070] tracking-[0.4em] uppercase">
            MAX ARC Framework
          </span>
        </div>
        <h2
          id="showcase-title"
          className="font-[family-name:var(--font-bebas),sans-serif] leading-[0.88] tracking-[0.04em] mb-[16px] text-[clamp(42px,11vw,60px)]"
        >
          <span className="block bg-gradient-to-r from-[#d0d8f0] to-[#7A8099] bg-clip-text text-transparent">
            Proyek gagal bukan karena kurang skill
          </span>
          <span className="block bg-gradient-to-r from-[#00d4ff] via-[#9d6fff] to-[#00ff88] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,212,255,0.15)]">
            Tapi karena tidak ada sistem yang menopang.
          </span>
        </h2>
        <p className="text-[11px] text-[#7A8099] tracking-[0.03em] leading-[1.85] mb-[18px]">
          Tanpa fondasi, setiap fitur baru menjadi tambal sulam. Tanpa arahan,
          setiap revisi menjadi perang.{" "}
          <span className="text-[#00d4ff] font-medium">MAX</span>,
          mendefinisikan kedalaman solusi Anda — mengeksekusinya dengan metode
          yang terarah melalui{" "}
          <span className="text-[#f0a500] font-medium">ARC</span>{" "}
          mengeksekusinya dengan presisi militer.
        </p>
        <div className="rounded-[8px] px-[14px] py-[11px] bg-white/[0.018] border border-white/5">
          <p className="text-[10px] text-[#5A6070] tracking-[0.04em] leading-[1.75]">
            Framework ini lahir dari kebutuhan nyata: proyek yang gagal bukan
            karena kurang skill, tapi karena tidak ada{" "}
            <span className="text-[#7A8099]">sistem yang menopangnya</span>. MAX
            ARC menjadi jawabannya — dari skala personal hingga enterprise.
          </p>
        </div>
      </div>
    </div>
  );
}
