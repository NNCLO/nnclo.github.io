import type { CSSProperties } from "react";
import React, { useState, useEffect, useRef, useCallback } from "react";

/* ──────────────── CSS custom property type ──────────────── */
type AppCSSProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

/* ──────────────── Types ──────────────── */
type ServiceItem = {
  id: string;
  name: string;
  desc: string;
  accent: string;
  featured?: boolean;
  href?: string;
  tags?: TagItem[];
};
type TagItem = { label: string; detail: string; href?: string };

/* ──────────────── Icons ──────────────── */
const IconWebsite = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4M6 8h.01M9 8h6" />
  </svg>
);
const IconStore = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const IconLanding = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconRevamp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconDashboard = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

/* ──────────────── Data ──────────────── */
const SERVICES: ServiceItem[] = [
  {
    id: "01",
    name: "Website Custom",
    desc: "Dibangun dari nol, sesuai kebutuhan bisnis. Bukan template — murni coded.",
    accent: "#00e5ff",
    featured: true,
    href: "#",
    tags: [
      {
        label: "Link in Bio",
        detail:
          "Satu halaman hub untuk semua link kamu — Instagram, TikTok, toko, dll. Desain custom, bukan Linktree biasa.",
        href: "#",
      },
      {
        label: "Undangan Digital",
        detail:
          "Undangan pernikahan / acara berbasis web. Interaktif, bisa RSVP, ada countdown, dan bisa dishare via link.",
        href: "#",
      },
      {
        label: "Portfolio",
        detail:
          "Portofolio profesional untuk freelancer, developer, desainer, atau kreator. Tampil beda dari template biasa.",
        href: "#",
      },
    ],
  },
  {
    id: "02",
    name: "Toko Online",
    desc: "Katalog, keranjang & checkout smooth.",
    accent: "#00ff88",
    href: "#",
  },
  {
    id: "03",
    name: "Landing Page",
    desc: "Satu halaman, konversi maksimal.",
    accent: "#b060ff",
    href: "#",
  },
  {
    id: "04",
    name: "Revamp",
    desc: "Website lama diperbarui. Faster & modern.",
    accent: "#ffb800",
    href: "#",
  },
  {
    id: "05",
    name: "Dashboard",
    desc: "Panel data, laporan, user management.",
    accent: "#4d9fff",
    href: "#",
  },
];

const iconMap: Record<string, React.FC> = {
  "Website Custom": IconWebsite,
  "Toko Online": IconStore,
  "Landing Page": IconLanding,
  Revamp: IconRevamp,
  Dashboard: IconDashboard,
};

/* ──────────────── Color primitives ──────────────── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgba(hex: string, alpha: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
function darken(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  const d = (c: number) => Math.max(0, Math.round(c * (1 - a)));
  return `rgb(${d(r)},${d(g)},${d(b)})`;
}
function lighten(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  const l = (c: number) => Math.min(255, Math.round(c + (255 - c) * a));
  return `rgb(${l(r)},${l(g)},${l(b)})`;
}

/* ──────────────── Semantic tokens ──────────────── */
type SemanticTokens = {
  surfaceBase: string;
  surfaceRaised: string;
  surfaceSunken: string;
  surfaceOverlay: string;
  borderDefault: string;
  borderHover: string;
  borderFocus: string;
  borderActive: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  interactiveRest: string;
  interactiveBorder: string;
  interactiveHover: string;
  interactiveActive: string;
  interactiveFocusRing: string;
  interactiveLabel: string;
  feedbackSuccess: string;
  feedbackWarning: string;
  feedbackError: string;
  feedbackInfo: string;
};
function buildTokens(accent: string): SemanticTokens {
  const bright = lighten(accent, 0.22);
  const soft = lighten(accent, 0.45);
  const dim = darken(accent, 0.45);
  return {
    surfaceBase: rgba(accent, 0.06),
    surfaceRaised: rgba(accent, 0.1),
    surfaceSunken: rgba(accent, 0.04),
    surfaceOverlay: rgba(accent, 0.09),
    borderDefault: rgba(accent, 0.2),
    borderHover: rgba(accent, 0.42),
    borderFocus: rgba(accent, 0.7),
    borderActive: rgba(accent, 0.9),
    textPrimary: bright,
    textSecondary: lighten(dim, 0.5),
    textMuted: rgba(accent, 0.35),
    textInverse: "rgba(10,10,14,0.90)",
    interactiveRest: rgba(accent, 0.1),
    interactiveBorder: rgba(accent, 0.38),
    interactiveHover: rgba(accent, 0.18),
    interactiveActive: rgba(accent, 0.28),
    interactiveFocusRing: rgba(accent, 0.3),
    interactiveLabel: bright,
    feedbackSuccess: rgba("#00e57a", 0.8),
    feedbackWarning: rgba("#ffb800", 0.8),
    feedbackError: rgba("#ff4d6a", 0.8),
    feedbackInfo: soft,
  };
}
function buildPalette(accent: string) {
  const t = buildTokens(accent);
  return {
    text: t.textPrimary,
    border: t.borderDefault,
    borderHover: t.borderHover,
    cardBg: t.surfaceBase,
    cardBgHover: t.surfaceRaised,
    shade200: t.interactiveRest,
    shade400: t.textMuted,
    shade600: t.interactiveBorder,
    tagInactive: "rgba(255,255,255,0.06)",
    tagInactiveBorder: "rgba(255,255,255,0.09)",
    tagInactiveText: "rgba(200,200,200,0.50)",
    descText: t.textSecondary,
  };
}

/* ──────────────── Typing hook (2x slower than karaoke) ──────────────── */
function useTypingEffect(text: string, active: boolean, speed = 80) {
  const [charCount, setCharCount] = useState(0);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (frameRef.current) clearTimeout(frameRef.current);
    if (!active) {
      const t = setTimeout(() => setCharCount(0), 280);
      return () => clearTimeout(t);
    }
    setCharCount(0);
    let i = 0;
    const type = () => {
      i++;
      setCharCount(i);
      if (i < text.length) frameRef.current = setTimeout(type, speed);
    };
    frameRef.current = setTimeout(type, speed);
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [active, text, speed]);
  return {
    displayed: text.slice(0, charCount),
    done: charCount >= text.length,
  };
}

/* ──────────────── Karaoke hook (1x play, persist) ──────────────── */
function useKaraokeEffect(text: string, active: boolean, msPerWord = 180) {
  const words = text.split(" ");
  const [lit, setLit] = useState(-1);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (frameRef.current) clearTimeout(frameRef.current);
    if (!active) {
      const t = setTimeout(() => setLit(-1), 320);
      return () => clearTimeout(t);
    }
    setLit(0);
    let i = 0;
    const advance = () => {
      i++;
      setLit(i);
      if (i < words.length) frameRef.current = setTimeout(advance, msPerWord);
    };
    frameRef.current = setTimeout(advance, msPerWord);
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [active, text, msPerWord]);
  return { words, lit };
}

/* ──────────────── Badge ──────────────── */
function BadgeNum({
  num,
  accent,
  hovered,
}: {
  num: string;
  accent: string;
  hovered: boolean;
}) {
  const t = buildTokens(accent);
  return (
    <span
      className="absolute top-3 right-3 text-[9px] font-mono select-none transition-all duration-300"
      style={{
        color: hovered ? t.textPrimary : t.textMuted,
        opacity: hovered ? 1 : 0.45,
        transform: hovered ? "scale(1.2) translateY(-1px)" : "scale(1)",
        textShadow: hovered ? `0 0 10px ${t.borderFocus}` : "none",
        letterSpacing: hovered ? "0.28em" : "0.15em",
      }}
    >
      {num}
    </span>
  );
}

/* ──────────────── Card Icon ──────────────── */
function CardIcon({
  Icon,
  accent,
  hovered,
  size = 44,
  isFeatured = false,
}: {
  Icon: React.FC;
  accent: string;
  hovered: boolean;
  size?: number;
  isFeatured?: boolean;
}) {
  const t = buildTokens(accent);
  return (
    <div
      className="shrink-0 flex items-center justify-center transition-all duration-300"
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: 10,
        border: `1px solid ${hovered ? t.borderHover : t.borderDefault}`,
        background: hovered ? t.surfaceRaised : t.surfaceOverlay,
        color: hovered ? t.textPrimary : t.textMuted,
        boxShadow: hovered ? `0 0 14px ${t.interactiveFocusRing}` : "none",
        marginTop: isFeatured ? 2 : 0,
        marginBottom: isFeatured ? 0 : 10,
      }}
    >
      <Icon />
    </div>
  );
}

/* ──────────────── Animated arrow CTA ──────────────── */
function AnimatedArrow({ color }: { color: string }) {
  return (
    <span
      className="relative inline-flex items-center overflow-hidden"
      style={{ width: 14, height: 12 }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          width: 12,
          height: 12,
          animation: "arrowBounce 1.1s ease-in-out infinite",
          display: "block",
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
  );
}

/* ──────────────── CTA Button ──────────────── */
function CtaButton({
  href,
  accent,
  className = "",
}: {
  href: string;
  accent: string;
  className?: string;
}) {
  const t = buildTokens(accent);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <a
      href={href}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border transition-colors duration-150 active:scale-95 ${className}`}
      style={{
        borderColor: focused ? t.borderFocus : t.interactiveBorder,
        background: pressed
          ? t.interactiveActive
          : hovered
            ? t.interactiveHover
            : t.interactiveRest,
        color: t.interactiveLabel,
        boxShadow:
          focused || hovered ? `0 0 0 2px ${t.interactiveFocusRing}` : "none",
      }}
    >
      Mulai Sekarang
    </a>
  );
}

/* ──────────────── Inline CTA (regular card) ──────────────── */
function InlineCta({ href, accent }: { href: string; accent: string }) {
  const t = buildTokens(accent);
  return (
    <a
      href={href}
      onClick={(e) => e.stopPropagation()}
      className="mt-3 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
      style={{ color: t.textPrimary }}
    >
      Temukan Lebih Banyak
      <AnimatedArrow color={t.textPrimary} />
    </a>
  );
}

/* ──────────────── Tag Detail ──────────────── */
function TagDetail({
  tag,
  accent,
  isClosing,
  closeDuration,
}: {
  tag: TagItem;
  accent: string;
  isClosing: boolean;
  closeDuration: number;
}) {
  const t = buildTokens(accent);
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);
  return (
    <div
      className="mt-3 rounded-lg border p-3 overflow-hidden"
      style={{
        borderColor: t.borderDefault,
        background: t.surfaceSunken,
        transition: `opacity ${closeDuration}ms ease, transform ${closeDuration}ms ease, max-height ${closeDuration}ms ease`,
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "translateY(-4px)" : "translateY(0)",
        maxHeight: isClosing ? "0px" : "200px",
      }}
    >
      <p
        className="text-[9px] font-mono font-bold uppercase tracking-widest mb-1"
        style={{ color: t.textPrimary }}
      >
        {tag.label}
      </p>
      <p
        className="text-[10px] leading-relaxed mb-2.5"
        style={{ color: t.textSecondary }}
      >
        {tag.detail}
      </p>
      <a
        href={tag.href ?? "#"}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => {
          setHov(false);
          setPrs(false);
        }}
        onMouseDown={() => setPrs(true)}
        onMouseUp={() => setPrs(false)}
        className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border transition-colors duration-150 active:scale-95"
        style={{
          borderColor: t.interactiveBorder,
          color: t.interactiveLabel,
          background: prs
            ? t.interactiveActive
            : hov
              ? t.interactiveHover
              : t.interactiveRest,
          boxShadow: hov ? `0 0 0 2px ${t.interactiveFocusRing}` : "none",
        }}
      >
        Lihat Versi Lengkap
      </a>
    </div>
  );
}

/* ──────────────── Featured Tags ──────────────── */
function FeaturedTags({ tags, accent }: { tags: TagItem[]; accent: string }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleTag, setVisibleTag] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const CLOSE_DURATION = 180;
  const openTag = (label: string) => {
    setActiveTag(label);
    setVisibleTag(label);
    setIsClosing(false);
  };
  const closeTag = useCallback((onDone?: () => void) => {
    setIsClosing(true);
    setTimeout(() => {
      setVisibleTag(null);
      setIsClosing(false);
      onDone?.();
    }, CLOSE_DURATION);
  }, []);
  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    label: string,
  ) => {
    e.stopPropagation();
    if (activeTag === label) {
      setActiveTag(null);
      closeTag();
      return;
    }
    if (visibleTag && visibleTag !== label) {
      setActiveTag(label);
      closeTag(() => openTag(label));
    } else openTag(label);
  };
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveTag(null);
        closeTag();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [visibleTag, closeTag]);
  const p = buildPalette(accent);
  const visibleTagData = tags.find((t) => t.label === visibleTag) ?? null;
  return (
    <div className="mt-2" ref={containerRef}>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => {
          const isActive = activeTag === tag.label;
          return (
            <button
              key={tag.label}
              onClick={(e) => handleTagClick(e, tag.label)}
              className="text-[9px] px-2 py-0.5 rounded-full border transition-all duration-200 cursor-pointer"
              style={
                isActive
                  ? {
                      borderColor: p.shade600,
                      background: p.shade200,
                      color: p.text,
                      boxShadow: `0 0 0 1px ${p.border}`,
                    }
                  : {
                      borderColor: p.tagInactiveBorder,
                      background: p.tagInactive,
                      color: p.tagInactiveText,
                    }
              }
              aria-pressed={isActive}
              aria-label={`Lihat detail ${tag.label}`}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
      {visibleTagData && (
        <TagDetail
          tag={visibleTagData}
          accent={accent}
          isClosing={isClosing}
          closeDuration={CLOSE_DURATION}
        />
      )}
    </div>
  );
}

/* ──────────────── Card Text Block ──────────────── */
function CardTextBlock({
  item,
  hovered,
  isFeatured,
}: {
  item: ServiceItem;
  hovered: boolean;
  isFeatured: boolean;
}) {
  const t = buildTokens(item.accent);
  const { displayed, done } = useTypingEffect(item.name, hovered, 80);
  const { words, lit } = useKaraokeEffect(item.desc, hovered, 180);
  const wordColor = (i: number) => {
    if (lit < 0) return t.textSecondary;
    if (lit >= words.length) return t.textPrimary;
    return i <= lit ? t.textPrimary : t.textMuted;
  };
  return (
    <div className="min-w-0 flex-1">
      <h3
        className="font-bold font-mono text-xs uppercase tracking-wide mb-1.5"
        style={{ color: t.textPrimary, minHeight: "1em" }}
      >
        {hovered ? displayed : item.name}
        {hovered && !done && (
          <span
            className="inline-block w-px h-3 ml-0.5 align-middle"
            style={{
              background: t.textPrimary,
              animation: "blink 0.65s step-end infinite",
            }}
          />
        )}
      </h3>
      <p className="text-[10px] leading-relaxed" style={{ minHeight: "2.4em" }}>
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              color: wordColor(i),
              fontWeight: i === lit && lit < words.length ? 600 : 400,
              transition: "color 200ms ease",
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
      {isFeatured && item.tags && item.tags.length > 0 && (
        <FeaturedTags tags={item.tags} accent={item.accent} />
      )}
      {isFeatured && (
        <CtaButton
          href={item.href ?? "#"}
          accent={item.accent}
          className="mt-3"
        />
      )}
      {!isFeatured && (
        <InlineCta href={item.href ?? "#"} accent={item.accent} />
      )}
    </div>
  );
}

/* ──────────────── Service Card ──────────────── */
function ServiceCard({
  item,
  isFeatured,
  Icon,
  num,
}: {
  item: ServiceItem;
  isFeatured: boolean;
  Icon: React.FC;
  num: string;
}) {
  const [hovered, setHovered] = useState(false);
  const p = buildPalette(item.accent);
  return (
    <li
      className="group relative overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-300 hover:shadow-lg"
      style={
        {
          "--accent": item.accent,
          ...(isFeatured
            ? {
                gridColumn: "span 2",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                borderColor: hovered ? p.borderHover : p.border,
                background: hovered ? p.cardBgHover : p.cardBg,
              }
            : {
                padding: "1rem",
                borderColor: hovered ? p.borderHover : p.tagInactiveBorder,
                background: hovered ? p.cardBgHover : p.tagInactive,
                transform: hovered ? "translateY(-3px)" : "translateY(0)",
              }),
        } as AppCSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role={isFeatured ? undefined : "button"}
      tabIndex={isFeatured ? undefined : 0}
      aria-label={isFeatured ? undefined : `${item.name} — ${item.desc}`}
    >
      <BadgeNum num={num} accent={item.accent} hovered={hovered} />
      <CardIcon
        Icon={Icon}
        accent={item.accent}
        hovered={hovered}
        size={isFeatured ? 44 : 36}
        isFeatured={isFeatured}
      />
      <CardTextBlock item={item} hovered={hovered} isFeatured={isFeatured} />
    </li>
  );
}

/* ──────────────── Main Component ──────────────── */
export function TrendsServices() {
  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes arrowBounce {
          0%,100% { transform: translateX(0);   opacity: 1; }
          40%      { transform: translateX(4px);  opacity: 0.5; }
          60%      { transform: translateX(-2px); opacity: 0.8; }
        }
        @keyframes dotPulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%     { opacity: 1;   transform: scale(1.15); }
        }
      `}</style>

      <section
        className="w-full pb-24"
        aria-labelledby="services-title"
      >
        {/* ── Outer wrapper card with dot-grid background ── */}
        <div
          className="relative rounded-2xl border border-white/8 overflow-hidden"
          style={{
            background: "rgba(8,8,14,0.85)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage:
                "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
            }}
          />

          {/* Corner accent glow top-left */}
          <div
            className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
            }}
          />
          {/* Corner accent glow bottom-right */}
          <div
            className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(176,96,255,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Inner content */}
          <div className="relative z-10 p-4">
            {/* ── Header ── */}
            <header className="mb-5">
              {/* // services label — maximized */}
              <div className="flex items-center gap-3 mb-3">
                {/* Left decorative line */}
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{
                      background: "rgba(0,229,255,0.6)",
                      animation: "dotPulse 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    className="w-4 h-px"
                    style={{
                      background:
                        "linear-gradient(to right,rgba(0,229,255,0.5),transparent)",
                    }}
                  />
                </div>
                <p
                  className="text-[9px] uppercase tracking-[0.4em] font-mono flex items-center gap-2"
                  style={{ color: "rgba(0,229,255,0.55)" }}
                >
                  <span style={{ color: "rgba(0,229,255,0.35)" }}>//</span>
                  <span>services</span>
                </p>
                <div className="flex items-center gap-1.5 flex-1">
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(to right,rgba(255,255,255,0.08),transparent)",
                    }}
                  />
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  />
                </div>
              </div>

              {/* WHAT WE BUILD — redesigned */}
              <div className="flex items-end justify-between gap-2">
                <div>
                  <h2
                    id="services-title"
                    className="font-mono font-black uppercase leading-none"
                    style={{
                      fontSize: "1.1rem",
                      letterSpacing: "0.12em",
                      background:
                        "linear-gradient(135deg, #fff 30%, rgba(0,229,255,0.7) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    What We Build
                  </h2>
                  <p
                    className="text-[9px] font-mono mt-0.5"
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    5 layanan · coded from scratch
                  </p>
                </div>
                {/* Right counter badge */}
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full border shrink-0"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "rgba(0,229,255,0.7)",
                      animation: "dotPulse 1.8s ease-in-out infinite",
                    }}
                  />
                  <span
                    className="text-[9px] font-mono"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    OPEN
                  </span>
                </div>
              </div>
            </header>

            {/* ── Grid ── */}
            <ul className="grid grid-cols-2 gap-2" role="list">
              {SERVICES.map((item, idx) => {
                const isFeatured = item.featured ?? false;
                const Icon = iconMap[item.name] ?? IconWebsite;
                const num = (idx + 1).toString().padStart(2, "0");
                return (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    isFeatured={isFeatured}
                    Icon={Icon}
                    num={num}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
