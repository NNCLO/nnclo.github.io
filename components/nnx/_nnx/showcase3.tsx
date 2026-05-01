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

const IconGitCommit = ({ size = 14 }: { size?: number }) => (
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
    <circle cx="12" cy="12" r="4" />
    <line x1="1.05" y1="12" x2="7" y2="12" />
    <line x1="17.01" y1="12" x2="22.96" y2="12" />
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

function useIsMobile(bp = 768) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const c = () => setV(window.innerWidth < bp);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, [bp]);
  return v;
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
// MOBILE LOADER — main cinematic section
// ─────────────────────────────────────────────

const LOADER_TEXT = "max arc";

function MobileLoaderSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  const update = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / scrollable));
    setProg(p);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  const ease = (x: number) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  // ── Phase math ──────────────────────────────
  // 0.00–0.10  Terminal UI fades + scales in
  // 0.08–0.45  Typing "max arc" character by character
  // 0.45–0.55  Hold (cursor blinks)
  // 0.55–0.70  Erase characters (right → left)
  // 0.68–0.82  Terminal collapses vertically into a thin glowing bar
  // 0.80–0.95  Bar's left edge extends LEFT until it reaches x=22px
  //            (the same x the CinematicTimeline lives on, so the eye
  //             reads the next section's vertical timeline as the
  //             continuation of this horizontal line)
  // 0.93–1.00  Small vertical down-stub appears at the L-corner
  const pAppear = ease(clamp(prog / 0.1));
  const pType = clamp((prog - 0.08) / 0.37);
  const pErase = clamp((prog - 0.55) / 0.15);
  const pCollapse = ease(clamp((prog - 0.68) / 0.14));
  const pExtend = ease(clamp((prog - 0.8) / 0.15));
  const pStub = ease(clamp((prog - 0.93) / 0.07));

  const charsTyped = Math.ceil(pType * LOADER_TEXT.length);
  const charsErased = Math.floor(pErase * LOADER_TEXT.length);
  const visibleChars = Math.max(0, charsTyped - charsErased);

  // Cursor visible while terminal is alive (typing/erasing/holding) and
  // hidden once the box starts collapsing.
  const showCursor = pAppear > 0.6 && pCollapse < 0.05;

  // Vertical collapse — terminal squashes down to a 1px-tall glowing bar
  const termScaleY = Math.max(0.012, 1 - pCollapse * 0.988);

  return (
    <div ref={wrapRef} style={{ height: "290vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 40% 44%, rgba(6,6,18,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        {/* Subtle scanline texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* HORIZONTAL CONNECTOR — emerges from terminal's left edge,
            extends LEFT until it reaches x=22px (where the timeline lives) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "22px",
            right: "calc(50% + 140px)",
            top: "50%",
            height: "1px",
            transformOrigin: "right center",
            transform: `translateY(-0.5px) scaleX(${pExtend})`,
            background:
              "linear-gradient(to left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.4) 100%)",
            boxShadow: "0 0 8px rgba(255,255,255,0.4)",
            opacity: pExtend,
            pointerEvents: "none",
          }}
        />

        {/* VERTICAL DOWN-STUB at the L-corner — telegraphs the handoff
            into the continuous left-side timeline of the next section */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "22px",
            top: "50%",
            width: "1px",
            height: `${pStub * 22}vh`,
            transform: "translateX(-0.5px)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 100%)",
            boxShadow: "0 0 6px rgba(255,255,255,0.3)",
            opacity: pStub,
            pointerEvents: "none",
          }}
        />

        {/* TERMINAL UI */}
        <div
          style={{
            position: "absolute",
            width: "min(280px, 78vw)",
            opacity: pAppear,
            transform: `scaleY(${termScaleY})`,
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              border: `1px solid rgba(255,255,255,${0.18 + pCollapse * 0.5})`,
              borderRadius: pCollapse > 0.7 ? "1px" : "10px",
              background: "rgba(8,8,14,0.92)",
              boxShadow:
                pCollapse > 0.4
                  ? `0 0 ${20 + pCollapse * 50}px rgba(255,255,255,${pCollapse * 0.5})`
                  : "0 8px 32px rgba(0,0,0,0.6), 0 0 24px rgba(255,255,255,0.04)",
              overflow: "hidden",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              transition: "border-radius 200ms ease",
            }}
          >
            {/* Header bar — traffic light dots + label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgba(255,90,90,0.55)",
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgba(255,200,80,0.55)",
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgba(80,220,140,0.55)",
                  }}
                />
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily:
                    "var(--font-mono), ui-monospace, SFMono-Regular, monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                }}
              >
                ~/max-arc
              </span>
            </div>

            {/* Body — prompt + typed command */}
            <div
              style={{
                padding: "20px 16px 22px",
                fontFamily:
                  "var(--font-mono), ui-monospace, SFMono-Regular, monospace",
                fontSize: "16px",
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.92)",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "rgba(120,220,180,0.85)",
                  marginRight: "8px",
                }}
              >
                $
              </span>
              <span style={{ whiteSpace: "pre" }}>
                {LOADER_TEXT.slice(0, visibleChars)}
              </span>
              {showCursor && (
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "1em",
                    background: "rgba(255,255,255,0.85)",
                    marginLeft: "2px",
                    animation: "arcCursorBlink 0.62s step-end infinite",
                    boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// JOURNEY OPENING — hero narrative card
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
// TIMELINE NODE
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
            background: `linear-gradient(to bottom, rgba(0,212,255,0.6) 0%, rgba(157,111,255,0.5) 50%, rgba(0,255,136,0.4) 100%)`,
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

      {/* Act label */}
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

        <div className="relative flex flex-col gap-0">
          {ARC_STEPS.map((s, i) => {
            const { ref: stepRef, inView: stepIn } = useInView(0.1);
            const isActive = stepActive[i];
            const { Icon } = s;
            const isLast = i === ARC_STEPS.length - 1;

            return (
              <div
                key={s.l}
                ref={stepRef}
                className="relative flex gap-0"
                style={{
                  opacity: stepIn ? 1 : 0,
                  transform: stepIn ? "translateX(0)" : "translateX(-10px)",
                  transition: `opacity 0.6s ease ${i * 130}ms, transform 0.6s ease ${i * 130}ms`,
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

                <div
                  className="flex-1 min-w-0 pb-[14px]"
                  style={{ paddingLeft: "14px" }}
                >
                  <div className="flex items-center gap-[8px] pt-[5px] mb-[5px]">
                    <span
                      className="text-[7px] tracking-[0.4em] uppercase transition-colors duration-300"
                      style={{
                        color: isActive
                          ? `rgba(${s.accentRgb},0.55)`
                          : "#1e2030",
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
                      style={{
                        color: isActive
                          ? `rgba(${s.accentRgb},0.4)`
                          : "#1e2030",
                      }}
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
          })}
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

// ─────────────────────────────────────────────
// CINEMATIC TIMELINE
// One continuous vertical timeline that runs the full height of all card
// frames. Renders:
//   • A dim full-height rail on the left
//   • A bright "progress" fill that travels top→bottom with scroll
//   • A traveling "head" dot that marks the current scroll position
//   • Numbered station nodes (01, 02, 03 …) aligned with each frame's center
//
// This sits behind the CinematicCardFrame stack and replaces the per-frame
// line stubs so the spine reads as a single timeline across the whole flow.
// ─────────────────────────────────────────────
const TIMELINE_LEFT = 22; // px from left edge of the wrapper

function CinematicTimeline({ stations }: { stations: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = parent.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when wrapper top hits viewport center, 1 when wrapper bottom hits it
        const start = rect.top + vh * 0.5;
        const end = rect.bottom - vh * 0.5;
        const span = end - start;
        const p = span > 0 ? 1 - end / span + (vh * 0.5) / span : 0;
        // Simpler robust formula: how far the user has scrolled into the wrapper,
        // measured from the top of the wrapper crossing viewport top to bottom
        // crossing viewport bottom.
        const total = rect.height - vh;
        const scrolled = -rect.top;
        const fallback = total > 0 ? scrolled / total : 0;
        setProgress(Math.min(1, Math.max(0, fallback)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: `${TIMELINE_LEFT + 14}px`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Dim background rail (full height) */}
      <div
        style={{
          position: "absolute",
          left: `${TIMELINE_LEFT}px`,
          top: 0,
          bottom: 0,
          width: "1px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.10) 8%, rgba(255,255,255,0.10) 92%, rgba(255,255,255,0.04) 100%)",
        }}
      />
      {/* Bright progress fill (grows top → bottom) */}
      <div
        style={{
          position: "absolute",
          left: `${TIMELINE_LEFT}px`,
          top: 0,
          width: "1px",
          height: `${progress * 100}%`,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.55) 12%, rgba(255,255,255,0.85) 100%)",
          boxShadow: "0 0 8px rgba(255,255,255,0.35)",
          willChange: "height",
          transition: "height 60ms linear",
        }}
      />
      {/* Traveling head dot (marks current scroll position) */}
      <div
        style={{
          position: "absolute",
          left: `${TIMELINE_LEFT - 3}px`,
          top: `calc(${progress * 100}% - 3.5px)`,
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.95)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.25), 0 0 12px rgba(255,255,255,0.55)",
          opacity: progress > 0.001 && progress < 0.999 ? 1 : 0,
          transition: "opacity 200ms ease",
          willChange: "top",
        }}
      />
      {/* Station nodes (numbered) — one per card frame, centered in its scroll range */}
      {Array.from({ length: stations }).map((_, i) => {
        const stationPos = (i + 0.5) / stations; // 0..1 along the timeline
        const reached = progress >= stationPos - 0.04;
        const active = Math.abs(progress - stationPos) < 0.06;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${TIMELINE_LEFT - 4}px`,
              top: `calc(${stationPos * 100}% - 4.5px)`,
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${reached ? 0.85 : 0.35})`,
              background: reached ? "rgba(255,255,255,0.95)" : "rgba(6,6,14,1)",
              boxShadow: active
                ? "0 0 0 4px rgba(255,255,255,0.08), 0 0 14px rgba(255,255,255,0.5)"
                : reached
                  ? "0 0 8px rgba(255,255,255,0.35)"
                  : "none",
              transition:
                "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// CINEMATIC CARD FRAME
// Each card section is wrapped in a sticky scroll-driven frame that animates
// through 6 phases (circle draw → title → card appear → center connector →
// glow transfer → card blur). The continuous left-side timeline lives in the
// parent CinematicTimeline, so this frame no longer renders its own spine.
// ─────────────────────────────────────────────

function CinematicCardFrame({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        setT(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Phase helpers ----------------------------------------------------------
  const seg = useCallback(
    (a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a || 1))),
    [t],
  );
  const ease = (x: number) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  // Phases tuned for smooth overlap. With the unified timeline outside this
  // frame, we no longer need spine in/out phases — we use the full t range
  // for the cinematic content.
  const pCircle = ease(seg(0.04, 0.22));
  const pAccent = ease(seg(0.14, 0.28));
  const pStep = ease(seg(0.1, 0.24));
  const pTitle = ease(seg(0.18, 0.34));
  const pShift = ease(seg(0.32, 0.46));
  const pCard = ease(seg(0.36, 0.58));
  const pCenter = ease(seg(0.54, 0.7));
  const pGlow = ease(seg(0.62, 0.8));
  const pBlur = ease(seg(0.8, 0.96));

  // Visual values ----------------------------------------------------------
  const C = 2 * Math.PI * 45;
  const circleStrokeOffset = (1 - pCircle) * C;

  const circleAlpha = (1 - pGlow * 0.85) * (1 - pBlur);
  const cardGlowStrength = pGlow * (1 - pBlur);

  const titleOpacity = pTitle * (1 - pBlur);
  const stepOpacity = pStep * (1 - pBlur);
  const groupShiftY = -22 * pShift;

  const cardY = (1 - pCard) * 48;
  const cardOpacity = pCard * (1 - Math.max(0, pBlur - 0.1));
  const cardBlurPx = pBlur * 14;
  const cardScale = 0.96 + 0.04 * pCard;

  return (
    <section
      ref={ref}
      style={{ position: "relative", height: "240vh" }}
      aria-label={title}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* ─── Center stack: circle + title + center line + card ─── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "640px",
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Circle + title group (shifts up when card appears) */}
          <div
            style={{
              position: "relative",
              transform: `translateY(${groupShiftY}px)`,
              transition: "transform 60ms linear",
            }}
          >
            <div
              style={{ position: "relative", width: "160px", height: "160px" }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  filter: `drop-shadow(0 0 ${4 + circleAlpha * 10}px rgba(255,255,255,${0.25 * circleAlpha}))`,
                  opacity: Math.max(0, circleAlpha),
                  transition: "filter 120ms ease, opacity 120ms ease",
                }}
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="0.6"
                  strokeDasharray={C}
                  strokeDashoffset={circleStrokeOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>

              {/* Horizontal accent line beside the circle (right side) */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "calc(100% + 6px)",
                  top: "50%",
                  width: `${44 * pAccent}px`,
                  height: "1px",
                  background: "rgba(255,255,255,0.55)",
                  transform: "translateY(-0.5px)",
                  opacity: Math.max(0, circleAlpha),
                  pointerEvents: "none",
                }}
              />

              {/* Step + title stacked inside circle */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-mono), ui-monospace, SFMono-Regular, monospace",
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.55)",
                    opacity: stepOpacity,
                    textTransform: "uppercase",
                  }}
                >
                  {step}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bebas), system-ui, sans-serif",
                    fontSize: "26px",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.95)",
                    opacity: titleOpacity,
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {title}
                </span>
              </div>
            </div>
          </div>

          {/* Center connector line (emerges from card center upward to circle) */}
          <div
            aria-hidden="true"
            style={{
              width: "1px",
              height: "28px",
              marginTop: `${-22 + groupShiftY * -0.5}px`,
              background: `linear-gradient(to top, rgba(255,255,255,0.7) ${pCenter * 100}%, transparent ${pCenter * 100}%)`,
              boxShadow:
                pCenter > 0.05 ? "0 0 6px rgba(255,255,255,0.25)" : "none",
              opacity: 1 - pBlur,
              transition: "opacity 120ms ease",
            }}
          />

          {/* Card panel — wraps the actual section content */}
          <div
            style={{
              width: "100%",
              opacity: cardOpacity,
              transform: `translateY(${cardY}px) scale(${cardScale})`,
              filter: `blur(${cardBlurPx}px)`,
              transition: "transform 60ms linear, filter 160ms ease",
              borderRadius: "16px",
              border: `1px solid rgba(255,255,255,${0.12 + cardGlowStrength * 0.25})`,
              background: "rgba(6,6,14,0.75)",
              boxShadow: `0 0 ${12 + cardGlowStrength * 60}px rgba(255,255,255,${0.05 + cardGlowStrength * 0.22}), inset 0 0 ${cardGlowStrength * 24}px rgba(255,255,255,${cardGlowStrength * 0.06})`,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              overflow: "hidden",
              willChange: "transform, opacity, filter",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Showcase() {
  const isMobile = useIsMobile(768);

  return (
    <section
      className="mb-[30px]"
      data-s="showcase"
      aria-labelledby="showcase-title"
    >
      {/* ── Global keyframes for loader animations ── */}
      <style>{`
        @keyframes arcCursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes arcSparkle {
          0%, 100% { opacity: 0;   transform: scale(0) translateY(0px);  }
          25%      { opacity: 0.5; }
          50%      { opacity: 0.8; transform: scale(1) translateY(-4px); }
          75%      { opacity: 0.3; }
        }
        @keyframes arcLinePulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.7;  }
        }
      `}</style>

      {/* ── Mobile cinematic loader (290 vh of scroll space) ── */}
      {isMobile && <MobileLoaderSection />}

      {/*
        Cinematic card frames — each section follows the same scroll-driven
        pattern (circle + step → title → card slides in → center connector →
        glow transfers to card → card blurs out). A single CinematicTimeline
        runs continuously down the left edge of the wrapper to give the whole
        flow a polished, connected timeline feel.
      */}
      <div style={{ position: "relative" }}>
        <CinematicTimeline stations={3} />

        <CinematicCardFrame step="01" title="Journey">
          <JourneyOpening />
        </CinematicCardFrame>

        <CinematicCardFrame step="02" title="Max">
          <MaxSection />
        </CinematicCardFrame>

        <CinematicCardFrame step="03" title="Arc">
          <ArcJourney />
        </CinematicCardFrame>
      </div>
    </section>
  );
}
