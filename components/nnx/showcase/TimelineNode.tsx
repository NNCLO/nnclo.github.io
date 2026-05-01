"use client";
import { useInView } from "./hooks";
import { TIERS } from "./data";
import { IconCheck, IconChevronDown } from "./icons";

interface Props {
  tier: (typeof TIERS)[number];
  index: number;
  active: boolean;
  isLast: boolean;
  open: boolean;
  onToggle: () => void;
}

export default function TimelineNode({
  tier,
  index,
  active,
  isLast,
  open,
  onToggle,
}: Props) {
  const { ref, inView } = useInView(0.12);
  const { Icon } = tier;
  const dotSize = 28;

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
      {/* Dot column */}
      <div className="relative flex flex-col items-center w-9 min-w-[36px]">
        <div
          className="relative z-10 flex items-center justify-center rounded-full transition-all duration-500 mt-0.5"
          style={{
            width: dotSize,
            height: dotSize,
            background: active
              ? `rgba(${tier.accentRgb},0.15)`
              : "rgba(14,14,26,0.95)",
            border: active
              ? `1.5px solid rgba(${tier.accentRgb},0.7)`
              : "1.5px solid rgba(255,255,255,0.08)",
            color: active ? tier.color : "#2e3148",
            boxShadow: active
              ? `0 0 0 4px rgba(${tier.accentRgb},0.08), 0 0 14px rgba(${tier.accentRgb},0.2)`
              : "none",
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

      {/* Content */}
      <div className="flex-1 min-w-0 pb-[10px] pl-3">
        <button
          className="w-full text-left flex items-start gap-[10px] group"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`tier-${tier.code}-details`}
          aria-label={`${open ? "Hide" : "Show"} details for ${tier.title} tier`}
        >
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-2 mb-[3px]">
              <span
                className="text-[8px] tracking-[0.4em] uppercase font-medium transition-colors duration-300"
                style={{
                  color: active ? `rgba(${tier.accentRgb},0.6)` : "#5A6070",
                }}
              >
                {tier.chapter}
              </span>
              <span
                className="text-[8px] tracking-[0.3em] uppercase"
                style={{
                  color: active
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.06)",
                }}
              >
                {tier.bracket}
              </span>
            </div>
            <h3
              className="font-[family-name:var(--font-bebas),sans-serif] tracking-[0.08em] leading-none transition-colors duration-300 text-[clamp(18px,4vw,22px)]"
              style={{ color: active ? "#E8EDF8" : "#5A6070" }}
            >
              {tier.title}
            </h3>
            <p
              className="text-[9px] tracking-[0.04em] mt-[2px] transition-colors duration-300"
              style={{
                color: active ? `rgba(${tier.accentRgb},0.65)` : "#7A8099",
              }}
            >
              {tier.subtitle}
            </p>
          </div>
          <span
            className="mt-[6px] shrink-0 inline-flex transition-transform duration-300"
            style={{
              color: active ? `rgba(${tier.accentRgb},0.5)` : "#5A6070",
              transform: open ? "rotate(180deg)" : "none",
            }}
            aria-hidden="true"
          >
            <IconChevronDown size={12} />
          </span>
        </button>

        {/* Expandable details – sekarang dengan contain untuk mencegah layout shift */}
        <div
          id={`tier-${tier.code}-details`}
          className="overflow-hidden transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            maxHeight: open ? "650px" : "0px",
            opacity: open ? 1 : 0,
            contain: "layout style", // 🔒 mengisolasi perubahan tinggi
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
                className="font-[family-name:var(--font-bebas),sans-serif] leading-[1.15] tracking-[0.03em] text-[clamp(16px,3.8vw,20px)]"
                style={{
                  color: tier.color,
                  filter: `drop-shadow(0 0 10px rgba(${tier.accentRgb},0.25))`,
                }}
              >
                {tier.hook}
              </p>
              <p className="text-[10px] text-[#7A8099] tracking-[0.03em] leading-[1.82]">
                {tier.body}
              </p>
              <div className="flex items-center gap-[8px]">
                <div
                  className="h-px w-3 shrink-0"
                  style={{ background: `rgba(${tier.accentRgb},0.25)` }}
                  aria-hidden="true"
                />
                <span
                  className="text-[8px] tracking-[0.3em] uppercase px-2 py-[3px] rounded-full"
                  style={{
                    color: `rgba(${tier.accentRgb},0.7)`,
                    border: `1px solid rgba(${tier.accentRgb},0.15)`,
                    background: `rgba(${tier.accentRgb},0.05)`,
                  }}
                >
                  {tier.systemLabel}
                </span>
                <span className="text-[9px] italic text-[#5A6070]">
                  {tier.systemTagline}
                </span>
              </div>
              <ul className="flex flex-wrap gap-[5px] list-none m-0 p-0">
                {tier.tags.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-[4px] text-[9px] tracking-[0.05em] rounded-full px-2 py-[3px]"
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
