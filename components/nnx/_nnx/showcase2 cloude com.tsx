"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────

const IconLayers = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconZap = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconScan = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
    <rect x="7" y="7" width="10" height="10" rx="1" />
  </svg>
);

const IconCheck = ({ size = 10 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconChevronDown = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useSpineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = rect.top - vh * 0.8;
    const end = rect.bottom - vh * 0.3;
    const total = end - start;
    const scrolled = -start;
    setProgress(Math.max(0, Math.min(1, scrolled / total)));
  }, []);
  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);
  return { ref, progress };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const TIERS = [
  {
    code: "M",
    bracket: "[M-Arc]",
    title: "META",
    subtitle: "Strong Foundation",
    chapter: "01",
    Icon: IconLayers,
    hook: "Semua yang terlihat dimulai dari yang tidak terlihat.",
    body: "Sebelum satu baris kode ditulis, kami mendefinisikan DNA-nya. Logo System bukan sekadar logo — ia adalah aturan bagaimana brand Anda tampil di mana saja. Design System bukan sekadar komponen — ia adalah bahasa visual yang konsisten dari halaman pertama hingga yang keseribu. Meta ARC adalah fondasi yang menentukan segalanya.",
    systemLabel: "FOUNDATION SYSTEM",
    systemTagline: "How things are defined",
    accentRgb: "0,212,255",
    color: "#00d4ff",
    tags: [
      "Logo System",
      "Color System",
      "Typography System",
      "Design System",
      "Content Strategy",
      "Motion Design",
    ],
  },
  {
    code: "A",
    bracket: "[A-Arc]",
    title: "ALPHA",
    subtitle: "Optimized Performance",
    chapter: "02",
    Icon: IconZap,
    hook: "Fondasi ada. Sekarang kita bangun.",
    body: "Alpha ARC mengambil semua yang sudah didefinisikan dan mengubahnya menjadi produk yang benar-benar berjalan. Roadmap yang jelas. Template yang siap pakai. Dokumentasi yang lengkap sehingga tim Anda bisa melanjutkan sendiri kapanpun. Ini bukan eksperimen — ini eksekusi yang terstruktur.",
    systemLabel: "BUILD SYSTEM",
    systemTagline: "How things are created",
    accentRgb: "157,111,255",
    color: "#9d6fff",
    tags: [
      "Roadmap",
      "Framework",
      "Templates",
      "Playbooks",
      "Dev Documentation",
      "Portfolio Structure",
    ],
  },
  {
    code: "X",
    bracket: "[X-Arc]",
    title: "X",
    subtitle: "Scalable Innovation",
    chapter: "03",
    Icon: IconScan,
    hook: "Produk sudah hidup. Tapi ini baru permulaan.",
    body: "X ARC adalah lapisan yang membuat kompetitor bertanya-tanya. Fitur eksperimental, sistem yang siap berkembang ke skala apapun, eksplorasi UI yang belum ada di tempat lain. Di sini aturan boleh dilanggar — karena kami sudah tahu persis aturan mana yang layak untuk itu.",
    systemLabel: "EXPLORATION SYSTEM",
    systemTagline: "How things evolve",
    accentRgb: "0,255,136",
    color: "#00ff88",
    tags: [
      "UI Experiments",
      "Interaction Concepts",
      "Visual Systems",
      "Future Layer",
      "R&D",
    ],
  },
] as const;

const ARC_STEPS = [
  {
    l: "A",
    step: "01",
    name: "Analyze",
    verb: "Understand",
    Icon: IconScan,
    body: "Kami mulai dengan mendengarkan — bukan langsung menawarkan solusi. Apa yang bisnis Anda butuhkan? Siapa yang akan menggunakannya? Di mana gap yang ada sekarang? Fase ini menentukan apakah solusi yang dibangun akan tepat sasaran atau hanya terlihat bagus.",
    accentRgb: "0,212,255",
    color: "#00d4ff",
  },
  {
    l: "R",
    step: "02",
    name: "Refine",
    verb: "Build",
    Icon: IconLayers,
    body: "Dengan pemahaman yang dalam, kami desain dan bangun. Setiap keputusan visual, setiap struktur sistem, setiap baris kode — mengacu pada framework MAX yang sudah disepakati di awal. Hasilnya bukan sekadar benar secara teknis, tapi pas secara bisnis.",
    accentRgb: "157,111,255",
    color: "#9d6fff",
  },
  {
    l: "C",
    step: "03",
    name: "Convert",
    verb: "Optimize",
    Icon: IconZap,
    body: "Membangun adalah satu hal. Memastikan ia menghasilkan adalah hal lain. Fase Convert memastikan performa optimal, struktur yang siap scale, dan sistem yang bisa berkembang mengikuti bisnis Anda — bukan sebaliknya.",
    accentRgb: "240,165,0",
    color: "#f0a500",
  },
] as const;

// ─────────────────────────────────────────────
// SCROLL INDICATOR
// Garis vertikal yang belok ke kanan — tampil permanen setelah loader
// ─────────────────────────────────────────────

function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <>
      <style>{`
        @keyframes siLinePulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.6; }
        }
        @keyframes siDotFloat {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(5px); opacity: 0.9; }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* Upper vertical line */}
        <div
          style={{
            width: "1px",
            height: "30px",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.38))",
            animation: "siLinePulse 2.2s ease infinite",
          }}
        />

        {/* Corner elbow: horizontal arm extends right from line */}
        <div
          style={{
            width: "10px",
            height: "1px",
            background: "rgba(255,255,255,0.35)",
            marginBottom: "-1px",
          }}
        />

        {/* Lower vertical line */}
        <div
          style={{
            width: "1px",
            height: "30px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.38), transparent)",
            animation: "siLinePulse 2.2s ease infinite 1.1s",
          }}
        />

        {/* Floating dot below */}
        <div
          style={{
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.55)",
            marginTop: "6px",
            animation: "siDotFloat 1.8s ease infinite",
          }}
        />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// MOBILE INTRO LOADER
// Scroll-driven cinematic sequence:
//
//   0   – 80px   → typing teks "MAX ARC" satu karakter per scroll
//   80  – 200px  → hold: teks penuh + subtitle muncul
//   200 – 380px  → suck: setiap karakter tersedot ke lingkaran kecil di tengah
//   380 – 450px  → orb menyala (flash cyan glow)
//   450px+       → selesai, konten muncul
// ─────────────────────────────────────────────

function MobileIntroLoader({ onComplete }: { onComplete: () => void }) {
  const TEXT = "MAX ARC";
  const CHARS = TEXT.split("");
  const TOTAL = CHARS.length;
  const CENTER_IDX = 3; // space char — convergence point

  const [scrollY, setScrollY] = useState(0);
  const doneRef = useRef(false);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (!doneRef.current && y >= 450) {
        doneRef.current = true;
        setShowIndicator(true);
        // Short pause so orb glow registers visually before unmount
        setTimeout(() => onComplete(), 320);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onComplete]);

  // ── Derived values ──

  // How many chars are typed (0–80px)
  const typedCount = scrollY < 80 ? Math.floor((scrollY / 80) * TOTAL) : TOTAL;
  const isTyping = scrollY < 80;

  // Subtitle opacity: fades in 80–140px, stays until 330px, fades out
  const subtitleOpacity =
    scrollY < 80
      ? 0
      : scrollY < 140
        ? (scrollY - 80) / 60
        : scrollY < 330
          ? 1
          : scrollY < 380
            ? Math.max(0, 1 - (scrollY - 330) / 50)
            : 0;

  // Suck progress: 0 to 1 over 200–380px, eased
  const suckRaw = scrollY < 200 ? 0 : scrollY > 380 ? 1 : (scrollY - 200) / 180;
  // Ease in-out
  const suck =
    suckRaw < 0.5
      ? 2 * suckRaw * suckRaw
      : 1 - Math.pow(-2 * suckRaw + 2, 2) / 2;

  // Orb flash: appears when suck > 0.55, bursts at scrollY >= 380
  const orbOpacity = suck > 0.55 ? Math.min(1, (suck - 0.55) * 6) : 0;
  const orbGlow = scrollY >= 380;
  const orbSize = orbGlow ? 22 : 4 + suck * 4;

  // Whole loader fade-out at 420–450px
  const loaderOpacity =
    scrollY > 420 ? Math.max(0, 1 - (scrollY - 420) / 30) : 1;

  if (doneRef.current && scrollY >= 450) return null;

  return (
    <>
      {/* ── Spacer: gives scroll room for all phase transitions ── */}
      <div
        style={{ height: "520px", pointerEvents: "none" }}
        aria-hidden="true"
      />

      {/* ── Fixed full-screen overlay ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          opacity: loaderOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          // Hitam pekat
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(6,6,16,1) 0%, #000 100%)",
        }}
      >
        {/* Very faint ambient radials */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 20% 25%, rgba(0,212,255,0.028) 0%, transparent 50%)," +
              "radial-gradient(ellipse at 80% 75%, rgba(157,111,255,0.022) 0%, transparent 50%)",
          }}
        />

        {/* Scanlines */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.005) 3px, rgba(255,255,255,0.005) 4px)",
          }}
        />

        {/* ── TEXT ROW ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "clamp(54px, 15vw, 76px)",
          }}
        >
          {CHARS.map((char, i) => {
            const isSpace = char === " ";
            const isVisible = i < typedCount;
            // Suck: each char moves toward CENTER_IDX
            const dist = i - CENTER_IDX;
            const tx = suck * -dist * 28;
            const ty = suck * Math.abs(dist) * -3;
            const scale = Math.max(0.01, 1 - suck * 0.92);
            const alpha = isVisible ? Math.max(0, 1 - suck * 0.98) : 0;

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  fontFamily:
                    "'Arial Black', 'Impact', 'Haettenschweiler', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(46px, 13vw, 68px)",
                  letterSpacing: "0.1em",
                  color: "#e8edf8",
                  width: isSpace ? "0.28em" : "auto",
                  userSelect: "none",
                  opacity: alpha,
                  transform: `translateX(${tx}px) translateY(${ty}px) scale(${scale})`,
                  // Transition only during typing; suck is raw scroll-driven
                  transition:
                    suck === 0 && isTyping ? "opacity 0.07s ease" : "none",
                  textShadow: isVisible
                    ? "0 0 40px rgba(255,255,255,0.06), 0 0 80px rgba(0,200,255,0.03)"
                    : "none",
                  willChange: "transform, opacity",
                }}
              >
                {isSpace ? "\u00A0" : char}
              </span>
            );
          })}

          {/* Blinking cursor during typing */}
          {isTyping && typedCount < TOTAL && (
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "2.5px",
                height: "clamp(46px, 13vw, 68px)",
                background: "rgba(0,212,255,0.8)",
                marginLeft: "3px",
                borderRadius: "1px",
                flexShrink: 0,
                animation: "loaderCursorBlink 0.5s ease infinite",
              }}
            />
          )}
        </div>

        {/* ── Subtitle ── */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "10px",
            fontSize: "7.5px",
            letterSpacing: "0.58em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
            opacity: subtitleOpacity,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          Framework · System · Execution
        </div>

        {/* ── Central orb — convergence point ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${orbSize}px`,
            height: `${orbSize}px`,
            borderRadius: "50%",
            opacity: orbOpacity,
            background: orbGlow
              ? "radial-gradient(circle at 38% 32%, #ffffff 0%, rgba(0,212,255,0.95) 45%, rgba(0,180,255,0) 100%)"
              : "radial-gradient(circle, rgba(255,255,255,0.92) 0%, rgba(180,220,255,0.55) 60%, transparent 100%)",
            boxShadow: orbGlow
              ? [
                  "0 0 0 3px rgba(0,212,255,0.22)",
                  "0 0 0 8px rgba(0,212,255,0.09)",
                  "0 0 25px rgba(0,212,255,0.75)",
                  "0 0 60px rgba(0,212,255,0.4)",
                  "0 0 110px rgba(0,212,255,0.18)",
                ].join(", ")
              : "0 0 6px rgba(255,255,255,0.5)",
            transition: orbGlow
              ? "width 0.18s ease, height 0.18s ease, box-shadow 0.22s ease, background 0.2s ease"
              : "none",
            pointerEvents: "none",
          }}
        />

        {/* ── Scroll hint (bottom) ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            opacity: suck > 0 ? 0 : typedCount >= TOTAL ? 0.5 : 0,
            transition: "opacity 0.45s ease",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "6.5px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "16px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              animation: "loaderScrollPulse 1.5s ease infinite",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator: shown after orb flash, stays visible */}
      <ScrollIndicator visible={showIndicator} />

      <style>{`
        @keyframes loaderCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes loaderScrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.35; }
          50% { transform: scaleY(0.45); opacity: 0.85; }
        }
      `}</style>
    </>
  );
}

// ─────────────────────────────────────────────
// JOURNEY OPENING
// ─────────────────────────────────────────────

function JourneyOpening() {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className="relative rounded-[14px] overflow-hidden mb-[4px]"
      style={{
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(6,6,14,0.99)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(0,212,255,0.07) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 100% 100%, rgba(157,111,255,0.06) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
        }}
      />
      <div className="relative px-[20px] pt-[28px] pb-[26px]">
        <div className="flex items-center gap-[6px] mb-[20px]">
          <span className="text-[7px] text-[#1e2030] tracking-[0.5em] uppercase">
            // showcase
          </span>
          <span className="text-[#1e2030]">·</span>
          <span className="text-[7px] text-[#1e2030] tracking-[0.4em] uppercase">
            MAX ARC Framework
          </span>
        </div>
        <h2
          id="showcase-title"
          className="font-[family-name:var(--font-bebas),sans-serif] leading-[0.88] tracking-[0.04em] mb-[16px]"
          style={{ fontSize: "clamp(42px,11vw,60px)" }}
        >
          <span
            style={{
              background: "linear-gradient(120deg, #d0d8f0 0%, #5a6080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            Built with MAX.
          </span>
          <span
            style={{
              background:
                "linear-gradient(120deg, #00d4ff 0%, #9d6fff 55%, #00ff88 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(0,212,255,0.15))",
              display: "block",
            }}
          >
            Delivered through ARC.
          </span>
        </h2>
        <p className="text-[10px] text-[#4a5070] tracking-[0.03em] leading-[1.85] mb-[18px]">
          Kami tidak datang dengan template siap pakai. Kami datang dengan
          pendekatan yang dibangun dari pengalaman nyata — mendefinisikan
          seberapa dalam solusi Anda dibangun melalui{" "}
          <span className="text-[#00d4ff] font-medium">MAX</span>, lalu
          mengeksekusinya dengan metode yang terarah melalui{" "}
          <span className="text-[#f0a500] font-medium">ARC</span>.
        </p>
        <div
          className="rounded-[8px] px-[14px] py-[11px]"
          style={{
            background: "rgba(255,255,255,0.018)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <p className="text-[9px] text-[#353848] tracking-[0.04em] leading-[1.75]">
            Framework ini lahir dari kebutuhan nyata: proyek yang gagal bukan
            karena kurang skill, tapi karena tidak ada{" "}
            <span style={{ color: "#4a5070" }}>sistem yang menopangnya</span>.
            MAX ARC menjadi jawabannya — dari skala personal hingga enterprise.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TIMELINE NODE (MAX section)
// ─────────────────────────────────────────────

function TimelineNode({
  tier,
  index,
  active,
  isLast,
}: {
  tier: (typeof TIERS)[number];
  index: number;
  active: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView(0.08);
  const { Icon } = tier;

  return (
    <div
      ref={ref}
      className="relative flex gap-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-12px)",
        transition: `opacity 0.65s ease ${index * 100}ms, transform 0.65s ease ${index * 100}ms`,
      }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ width: "36px", minWidth: "36px" }}
      >
        <div
          className="relative z-10 flex items-center justify-center rounded-full transition-all duration-500"
          style={{
            width: "28px",
            height: "28px",
            background: active
              ? `rgba(${tier.accentRgb}, 0.15)`
              : "rgba(14,14,26,0.95)",
            border: active
              ? `1.5px solid rgba(${tier.accentRgb}, 0.7)`
              : "1.5px solid rgba(255,255,255,0.08)",
            color: active ? tier.color : "#2e3148",
            boxShadow: active
              ? `0 0 0 4px rgba(${tier.accentRgb},0.08), 0 0 14px rgba(${tier.accentRgb},0.2)`
              : "none",
            marginTop: "2px",
          }}
        >
          <Icon size={12} />
        </div>
        {!isLast && (
          <div
            className="flex-1 transition-colors duration-700"
            style={{
              width: "1.5px",
              background: active
                ? `linear-gradient(to bottom, rgba(${tier.accentRgb},0.35) 0%, rgba(${tier.accentRgb},0.06) 100%)`
                : "rgba(255,255,255,0.04)",
              minHeight: open ? "16px" : "10px",
            }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 pb-[10px]" style={{ paddingLeft: "12px" }}>
        <button
          className="w-full text-left flex items-start gap-[10px] group"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <div className="flex-1 min-w-0 pt-[4px]">
            <div className="flex items-center gap-[8px] mb-[3px]">
              <span
                className="text-[7px] tracking-[0.4em] uppercase font-medium transition-colors duration-300"
                style={{
                  color: active ? `rgba(${tier.accentRgb},0.6)` : "#252838",
                }}
              >
                {tier.chapter}
              </span>
              <span
                className="text-[7px] tracking-[0.3em] uppercase"
                style={{
                  color: active
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.04)",
                }}
              >
                {tier.bracket}
              </span>
            </div>
            <h3
              className="font-[family-name:var(--font-bebas),sans-serif] tracking-[0.08em] leading-[1] transition-colors duration-300"
              style={{
                fontSize: "clamp(16px,4vw,20px)",
                color: active ? "#e8edf8" : "#3a3d52",
              }}
            >
              {tier.title}
            </h3>
            <p
              className="text-[8px] tracking-[0.04em] mt-[2px] transition-colors duration-300"
              style={{
                color: active ? `rgba(${tier.accentRgb},0.65)` : "#252838",
              }}
            >
              {tier.subtitle}
            </p>
          </div>
          <span
            className="mt-[6px] shrink-0 transition-all duration-300"
            style={{
              color: active ? `rgba(${tier.accentRgb},0.5)` : "#252838",
              transform: open ? "rotate(180deg)" : "none",
              display: "inline-flex",
            }}
          >
            <IconChevronDown size={12} />
          </span>
        </button>

        <div
          className="overflow-hidden transition-all duration-[550ms]"
          style={{
            maxHeight: open ? "650px" : "0px",
            opacity: open ? 1 : 0,
            transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            className="mt-[10px] rounded-[10px] overflow-hidden"
            style={{
              border: `1px solid rgba(${tier.accentRgb},0.14)`,
              background: `linear-gradient(145deg, rgba(${tier.accentRgb},0.04) 0%, rgba(6,6,14,0.98) 60%)`,
            }}
          >
            <div className="px-[14px] pt-[14px] pb-[16px] flex flex-col gap-[12px]">
              <p
                className="font-[family-name:var(--font-bebas),sans-serif] leading-[1.15] tracking-[0.03em]"
                style={{
                  fontSize: "clamp(15px,3.8vw,20px)",
                  color: tier.color,
                  filter: `drop-shadow(0 0 10px rgba(${tier.accentRgb},0.25))`,
                }}
              >
                {tier.hook}
              </p>
              <p className="text-[9.5px] text-[#6a7090] tracking-[0.03em] leading-[1.82]">
                {tier.body}
              </p>
              <div className="flex items-center gap-[8px]">
                <div
                  className="h-[1px] w-[12px] shrink-0"
                  style={{ background: `rgba(${tier.accentRgb},0.25)` }}
                  aria-hidden="true"
                />
                <span
                  className="text-[7px] tracking-[0.3em] uppercase px-[8px] py-[3px] rounded-full"
                  style={{
                    color: `rgba(${tier.accentRgb},0.7)`,
                    border: `1px solid rgba(${tier.accentRgb},0.15)`,
                    background: `rgba(${tier.accentRgb},0.05)`,
                  }}
                >
                  {tier.systemLabel}
                </span>
                <span
                  className="text-[8px] italic"
                  style={{ color: "#2e3148" }}
                >
                  {tier.systemTagline}
                </span>
              </div>
              <ul className="flex flex-wrap gap-[5px] list-none m-0 p-0">
                {tier.tags.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-[4px] text-[8px] tracking-[0.05em] rounded-full px-[8px] py-[3px]"
                    style={{
                      color: `rgba(${tier.accentRgb},0.7)`,
                      border: `1px solid rgba(${tier.accentRgb},0.12)`,
                      background: `rgba(${tier.accentRgb},0.04)`,
                    }}
                  >
                    <span style={{ color: `rgba(${tier.accentRgb},0.5)` }}>
                      <IconCheck size={8} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAX SECTION
// ─────────────────────────────────────────────

function MaxSection() {
  const { ref: spineRef, progress } = useSpineProgress();
  const { ref: labelRef, inView: labelIn } = useInView(0.05);
  const thresholds = [0.0, 0.35, 0.7];
  const nodeActive = thresholds.map((t) => progress >= t);

  return (
    <div className="mb-[4px]">
      <div
        ref={labelRef}
        className="flex items-center gap-[8px] mb-[14px]"
        style={{
          opacity: labelIn ? 1 : 0,
          transform: labelIn ? "none" : "translateY(8px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          className="h-[1px] w-[16px] shrink-0"
          style={{ background: "rgba(0,212,255,0.3)" }}
          aria-hidden="true"
        />
        <p
          className="text-[7px] tracking-[0.45em] uppercase shrink-0"
          style={{ color: "rgba(0,212,255,0.35)" }}
        >
          Act I — MAX · Depth of Solution
        </p>
        <div
          className="h-[1px] flex-1"
          style={{
            background:
              "linear-gradient(to right, rgba(0,212,255,0.1), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      <div ref={spineRef} className="relative">
        <div
          className="absolute top-0 left-[17px] w-[1.5px] bottom-0 pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)", zIndex: 0 }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-[17px] w-[1.5px] pointer-events-none transition-none"
          style={{
            height: `${progress * 100}%`,
            background:
              "linear-gradient(to bottom, rgba(0,212,255,0.6) 0%, rgba(157,111,255,0.5) 50%, rgba(0,255,136,0.4) 100%)",
            zIndex: 1,
          }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-0" style={{ zIndex: 2 }}>
          {TIERS.map((tier, i) => (
            <TimelineNode
              key={tier.code}
              tier={tier}
              index={i}
              active={nodeActive[i]}
              isLast={i === TIERS.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ARC STEP ITEM — proper component (not inline in .map)
// Fixes React Rules of Hooks: useInView cannot be called inside map()
// ─────────────────────────────────────────────

function ArcStepItem({
  s,
  index,
  isActive,
  isLast,
}: {
  s: (typeof ARC_STEPS)[number];
  index: number;
  isActive: boolean;
  isLast: boolean;
}) {
  const { ref: stepRef, inView: stepIn } = useInView(0.1);
  const { Icon } = s;

  return (
    <div
      ref={stepRef}
      className="relative flex gap-0"
      style={{
        opacity: stepIn ? 1 : 0,
        transform: stepIn ? "translateX(0)" : "translateX(-10px)",
        transition: `opacity 0.6s ease ${index * 130}ms, transform 0.6s ease ${index * 130}ms`,
      }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ width: "28px", minWidth: "28px" }}
      >
        <div
          className="relative z-10 flex items-center justify-center rounded-full transition-all duration-500"
          style={{
            width: "28px",
            height: "28px",
            background: isActive
              ? `rgba(${s.accentRgb},0.14)`
              : "rgba(10,10,20,0.98)",
            border: isActive
              ? `1.5px solid rgba(${s.accentRgb},0.65)`
              : "1.5px solid rgba(255,255,255,0.06)",
            color: isActive ? s.color : "#252838",
            boxShadow: isActive
              ? `0 0 0 4px rgba(${s.accentRgb},0.07), 0 0 12px rgba(${s.accentRgb},0.18)`
              : "none",
            marginTop: "2px",
          }}
        >
          <Icon size={12} />
        </div>
        {!isLast && (
          <div
            className="flex-1"
            style={{
              width: "1.5px",
              background: isActive
                ? `linear-gradient(to bottom, rgba(${s.accentRgb},0.3), rgba(${s.accentRgb},0.06))`
                : "rgba(255,255,255,0.03)",
              minHeight: "20px",
            }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 pb-[14px]" style={{ paddingLeft: "14px" }}>
        <div className="flex items-center gap-[8px] pt-[5px] mb-[5px]">
          <span
            className="text-[7px] tracking-[0.4em] uppercase transition-colors duration-300"
            style={{
              color: isActive ? `rgba(${s.accentRgb},0.55)` : "#1e2030",
            }}
          >
            {s.step}
          </span>
          <div
            className="h-[1px] w-[12px] transition-colors duration-300"
            style={{
              background: isActive
                ? `rgba(${s.accentRgb},0.25)`
                : "rgba(255,255,255,0.04)",
            }}
            aria-hidden="true"
          />
          <span
            className="text-[7px] tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ color: isActive ? `rgba(${s.accentRgb},0.4)` : "#1e2030" }}
          >
            {s.verb}
          </span>
        </div>

        <p
          className="font-[family-name:var(--font-bebas),sans-serif] tracking-[0.08em] mb-[7px] transition-colors duration-300"
          style={{
            fontSize: "clamp(15px,3.8vw,19px)",
            color: isActive ? "#e8edf8" : "#2e3148",
          }}
        >
          {s.name}
        </p>

        <div
          className="rounded-[8px] px-[12px] py-[11px] transition-all duration-500"
          style={{
            background: isActive
              ? `rgba(${s.accentRgb},0.04)`
              : "rgba(255,255,255,0.014)",
            border: isActive
              ? `1px solid rgba(${s.accentRgb},0.14)`
              : "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <p
            className="text-[9px] tracking-[0.03em] leading-[1.82] transition-colors duration-500"
            style={{ color: isActive ? "#6a7090" : "#2e3148" }}
          >
            {s.body}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ARC JOURNEY
// ─────────────────────────────────────────────

function ArcJourney() {
  const { ref: wrapRef, inView: wrapIn } = useInView(0.06);
  const { ref: spineRef, progress } = useSpineProgress();
  const thresholds = [0.0, 0.38, 0.72];
  const stepActive = thresholds.map((t) => progress >= t);

  return (
    <div
      ref={wrapRef}
      className="relative rounded-[14px] overflow-hidden px-[18px] pt-[24px] pb-[22px]"
      style={{
        border: "1px solid rgba(240,165,0,0.08)",
        background: "rgba(6,6,14,0.99)",
        opacity: wrapIn ? 1 : 0,
        transform: wrapIn ? "none" : "translateY(24px)",
        transition:
          "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 90% 5%, rgba(240,165,0,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative flex items-center gap-[8px] mb-[18px]">
        <div
          className="h-[1px] w-[16px] shrink-0"
          style={{ background: "rgba(240,165,0,0.3)" }}
          aria-hidden="true"
        />
        <p
          className="text-[7px] tracking-[0.45em] uppercase shrink-0"
          style={{ color: "rgba(240,165,0,0.45)" }}
        >
          Act II — ARC · Method of Execution
        </p>
        <div
          className="h-[1px] flex-1"
          style={{
            background:
              "linear-gradient(to right, rgba(240,165,0,0.12), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative mb-[22px]">
        <p
          className="font-[family-name:var(--font-bebas),sans-serif] leading-[1.1] tracking-[0.04em] text-[#e8edf8] mb-[8px]"
          style={{ fontSize: "clamp(18px,4.5vw,24px)" }}
        >
          Ide yang bagus tidak cukup.
          <br />
          <span style={{ color: "#f0a500" }}>
            Yang membedakan adalah caranya dieksekusi.
          </span>
        </p>
        <p className="text-[9px] text-[#3a4060] tracking-[0.04em] leading-[1.85]">
          ARC adalah tiga langkah yang kami jalani di setiap project — bukan
          sekadar tahapan, tapi cara berpikir yang memastikan apa yang dibangun
          benar-benar relevan, berjalan, dan bertahan lama.
        </p>
      </div>

      <div ref={spineRef} className="relative">
        <div
          className="absolute top-0 left-[13px] w-[1.5px] bottom-0 pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-[13px] w-[1.5px] pointer-events-none"
          style={{
            height: `${progress * 100}%`,
            background:
              "linear-gradient(to bottom, rgba(0,212,255,0.5), rgba(157,111,255,0.5), rgba(240,165,0,0.5))",
          }}
          aria-hidden="true"
        />
        {/* ✅ Extracted ArcStepItem component — hooks called at top of each component, not inside map */}
        <div className="relative flex flex-col gap-0">
          {ARC_STEPS.map((s, i) => (
            <ArcStepItem
              key={s.l}
              s={s}
              index={i}
              isActive={stepActive[i]}
              isLast={i === ARC_STEPS.length - 1}
            />
          ))}
        </div>
      </div>

      <div
        className="relative mt-[14px] rounded-[8px] px-[14px] py-[12px]"
        style={{
          background: "rgba(240,165,0,0.03)",
          border: "1px solid rgba(240,165,0,0.08)",
        }}
      >
        <div className="flex items-start gap-[10px]">
          <div
            className="w-[2px] shrink-0 rounded-full"
            style={{
              background: "rgba(240,165,0,0.35)",
              minHeight: "34px",
              alignSelf: "stretch",
            }}
            aria-hidden="true"
          />
          <p className="text-[9px] text-[#3a4060] tracking-[0.04em] leading-[1.85]">
            MAX ARC bukan metodologi yang kami pinjam dari buku teks. Ia lahir
            dari pengalaman langsung — dan terus berkembang setiap kali kami
            membangun sesuatu yang baru.{" "}
            <span style={{ color: "#7a8099" }}>
              Hybrid agile dengan strong foundation.
            </span>{" "}
            Hemat 20–30% waktu dibanding proyek tanpa framework yang jelas.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SHOWCASE — main export
// ─────────────────────────────────────────────

export function Showcase() {
  const isMobile = useIsMobile();
  const [loaderDone, setLoaderDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
    setScrollIndicatorVisible(true);
    requestAnimationFrame(() => {
      setTimeout(() => setContentVisible(true), 60);
    });
  }, []);

  // Desktop: skip loader entirely
  useEffect(() => {
    if (!isMobile) {
      setLoaderDone(true);
      setContentVisible(true);
    }
  }, [isMobile]);

  return (
    <section
      className="mb-[30px]"
      data-s="showcase"
      aria-labelledby="showcase-title"
    >
      {/* Mobile-only loader */}
      {isMobile && !loaderDone && (
        <MobileIntroLoader onComplete={handleLoaderComplete} />
      )}

      {/* Persistent scroll indicator — mobile only, appears post-loader */}
      {isMobile && <ScrollIndicator visible={scrollIndicatorVisible} />}

      {/* Main content — gated on mobile until loader finishes */}
      {(!isMobile || loaderDone) && (
        <div
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <JourneyOpening />
          <MaxSection />
          <ArcJourney />
        </div>
      )}
    </section>
  );
}
