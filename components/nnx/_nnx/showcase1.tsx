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

// Track scroll progress of a tall spine element (0–1)
function useSpineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // start filling when top of spine reaches 80% of viewport, finish when bottom passes 30%
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
      {/* Dual mesh glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(0,212,255,0.07) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 100% 100%, rgba(157,111,255,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Scanline texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
        }}
      />

      <div className="relative px-[20px] pt-[28px] pb-[26px]">
        {/* Journey breadcrumb */}
        <div className="flex items-center gap-[6px] mb-[20px]">
          <span className="text-[7px] text-[#1e2030] tracking-[0.5em] uppercase">
            // showcase
          </span>
          <span className="text-[#1e2030]">·</span>
          <span className="text-[7px] text-[#1e2030] tracking-[0.4em] uppercase">
            MAX ARC Framework
          </span>
        </div>

        {/* Big headline — two-tone */}
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

        {/* Prose — conversational opening */}
        <p className="text-[10px] text-[#4a5070] tracking-[0.03em] leading-[1.85] mb-[18px]">
          Kami tidak datang dengan template siap pakai. Kami datang dengan
          pendekatan yang dibangun dari pengalaman nyata — mendefinisikan
          seberapa dalam solusi Anda dibangun melalui{" "}
          <span className="text-[#00d4ff] font-medium">MAX</span>, lalu
          mengeksekusinya dengan metode yang terarah melalui{" "}
          <span className="text-[#f0a500] font-medium">ARC</span>.
        </p>

        {/* Context callout */}
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
// VERTICAL TIMELINE — GitHub commit-style spine
// Each tier is a "commit node" that lights up on scroll
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
      {/* ── LEFT SPINE COLUMN ── */}
      <div
        className="relative flex flex-col items-center"
        style={{ width: "36px", minWidth: "36px" }}
      >
        {/* Node circle — GitHub commit dot */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full transition-all duration-500"
          style={{
            width: "28px",
            height: "28px",
            // Base lebih solid supaya spine tidak "tembus" node dan icon tidak terlihat tumpang tindih.
            background: active
              ? `radial-gradient(circle at 30% 30%, rgba(${tier.accentRgb},0.20) 0%, rgba(14,14,26,0.95) 62%)`
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

        {/* Spine line downward */}
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

      {/* ── RIGHT CONTENT ── */}
      <div className="flex-1 min-w-0 pb-[10px]" style={{ paddingLeft: "12px" }}>
        {/* Commit header row — click to expand */}
        <button
          className="w-full text-left flex items-start gap-[10px] group"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {/* Chapter + title block */}
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

          {/* Expand chevron */}
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

        {/* Expanded journey card */}
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
            {/* Journey card inner */}
            <div className="px-[14px] pt-[14px] pb-[16px] flex flex-col gap-[12px]">
              {/* Hook — big moment */}
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

              {/* Body prose */}
              <p className="text-[9.5px] text-[#6a7090] tracking-[0.03em] leading-[1.82]">
                {tier.body}
              </p>

              {/* System pill row */}
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

              {/* Tags */}
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
// MAX SECTION — wrapped in scroll-progress spine
// ─────────────────────────────────────────────

function MaxSection() {
  const { ref: spineRef, progress } = useSpineProgress();
  const { ref: labelRef, inView: labelIn } = useInView(0.05);

  // Derive which nodes are "active" based on scroll progress
  // Node 0 at 0%, 1 at 35%, 2 at 70%
  const thresholds = [0.0, 0.35, 0.7];
  const nodeActive = thresholds.map((t) => progress >= t);

  return (
    <div className="mb-[4px]">
      {/* Act label */}
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

      {/* The spine + nodes wrapper */}
      <div ref={spineRef} className="relative">
        {/* Full-height background spine track (grey) */}
        <div
          className="absolute top-0 left-[17px] w-[1.5px] bottom-0 pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)", zIndex: 0 }}
          aria-hidden="true"
        />

        {/* Progress fill spine — scrolls down in real-time */}
        <div
          className="absolute top-0 left-[17px] w-[1.5px] pointer-events-none transition-none"
          style={{
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom,
              rgba(0,212,255,0.6) 0%,
              rgba(157,111,255,0.5) 50%,
              rgba(0,255,136,0.4) 100%
            )`,
            zIndex: 1,
          }}
          aria-hidden="true"
        />

        {/* Tier nodes */}
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
// ARC JOURNEY — immersive step-by-step
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
      {/* Ambient glow */}
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

      {/* Journey intro */}
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

      {/* ARC vertical timeline spine */}
      <div ref={spineRef} className="relative">
        {/* Track */}
        <div
          className="absolute top-0 left-[13px] w-[1.5px] bottom-0 pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-hidden="true"
        />
        {/* Fill */}
        <div
          className="absolute top-0 left-[13px] w-[1.5px] pointer-events-none"
          style={{
            height: `${progress * 100}%`,
            background:
              "linear-gradient(to bottom, rgba(0,212,255,0.5), rgba(157,111,255,0.5), rgba(240,165,0,0.5))",
          }}
          aria-hidden="true"
        />

        {/* Step items */}
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
                {/* Node */}
                <div
                  className="relative flex flex-col items-center"
                  style={{ width: "28px", minWidth: "28px" }}
                >
                  <div
                    className="relative z-10 flex items-center justify-center rounded-full transition-all duration-500"
                    style={{
                      width: "28px",
                      height: "28px",
                      // Base solid supaya track/fill tidak tembus node dan icon tidak terlihat tumpang tindih.
                      background: isActive
                        ? `radial-gradient(circle at 30% 30%, rgba(${s.accentRgb},0.20) 0%, rgba(10,10,20,0.98) 62%)`
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

                {/* Journey step content card */}
                <div
                  className="flex-1 min-w-0 pb-[14px]"
                  style={{ paddingLeft: "14px" }}
                >
                  {/* Step meta */}
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

                  {/* Step name */}
                  <p
                    className="font-[family-name:var(--font-bebas),sans-serif] tracking-[0.08em] mb-[7px] transition-colors duration-300"
                    style={{
                      fontSize: "clamp(15px,3.8vw,19px)",
                      color: isActive ? "#e8edf8" : "#2e3148",
                    }}
                  >
                    {s.name}
                  </p>

                  {/* Journey card — appears when active */}
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

      {/* Closing manifesto */}
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
  return (
    <section
      className="mb-[30px]"
      data-s="showcase"
      aria-labelledby="showcase-title"
    >
      <JourneyOpening />
      <MaxSection />
      <ArcJourney />
    </section>
  );
}
