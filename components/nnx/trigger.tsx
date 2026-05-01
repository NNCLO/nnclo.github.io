import type { CSSProperties, ReactNode } from "react";
import { ArrowIcon } from "./arrow-icon";

type TriggerProps = {
  href: string;
  accent: string;
  name: string;
  desc: string;
  icon: ReactNode;
  ariaLabel: string;
};

function TriggerLink({
  href,
  accent,
  name,
  desc,
  icon,
  ariaLabel,
}: TriggerProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      style={{ "--accent": accent } as CSSProperties}
      className={[
        // base layout
        "group relative flex items-center gap-3 overflow-hidden",
        // spacing & shape
        "px-[15px] py-[13px] rounded-lg",
        // background & border
        "bg-[rgba(8,8,14,0.92)] border border-white/[0.055]",
        // backdrop
        "backdrop-blur-md",
        // transition
        "transition-[border-color,box-shadow] duration-200",
        // hover: accent-tinted border & shadow via CSS var
        "hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)]",
        "hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent)_10%,transparent)]",
        // ::after overlay — Tailwind arbitrary after: variant
        "after:absolute after:inset-0 after:rounded-[inherit]",
        "after:bg-[var(--accent)] after:opacity-0",
        "after:transition-opacity after:duration-300 after:pointer-events-none",
        "hover:after:opacity-[0.055]",
        // focus ring
        "focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-[#00d4ff] focus-visible:outline-offset-[3px]",
      ].join(" ")}
    >
      {/* Icon */}
      <span
        aria-hidden="true"
        className={[
          "relative z-[1] flex-shrink-0",
          "flex items-center justify-center",
          "w-8 h-8 rounded-[6px]",
          "border border-white/[0.06] bg-white/[0.02]",
          "transition-all duration-200",
          "group-hover:border-[color-mix(in_srgb,var(--accent)_28%,transparent)]",
          "group-hover:bg-[color-mix(in_srgb,var(--accent)_9%,transparent)]",
          "[&_svg]:w-[14px] [&_svg]:h-[14px]",
        ].join(" ")}
      >
        {icon}
      </span>

      <span className="relative z-[1] flex-1 min-w-0 overflow-hidden flex flex-col">
        <span
          className={[
            "block truncate",
            "text-[12px] font-medium font-['Space_Mono',monospace]",
            "text-[#e8edf8] mb-[1px]",
          ].join(" ")}
        >
          {name}
        </span>
        <span className="block truncate text-[9px] text-[#6b7393]">{desc}</span>
      </span>

      {/* Arrow */}
      <span
        aria-hidden="true"
        className={[
          "relative z-[1] flex-shrink-0 text-[#6b7393]",
          "transition-[transform,color] duration-200",
          "group-hover:translate-x-[3px] group-hover:text-[var(--accent)]",
        ].join(" ")}
      >
        <ArrowIcon />
      </span>
    </a>
  );
}

const NotionIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
  </svg>
);

const GmailIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"
      fill="#EA4335"
    />
  </svg>
);

const WhatsappIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
      fill="#25D366"
    />
  </svg>
);

export function Trigger() {
  return (
    <section
      className="mb-[30px]"
      data-s="trigger"
      aria-labelledby="trigger-title"
    >
      <h2
        id="trigger-title"
        className="mb-[14px] text-[10px] tracking-[0.35em] uppercase text-[#6b7393]"
      >
        // trigger
      </h2>

      <nav className="flex flex-col gap-2" aria-label="Contact channels">
        <TriggerLink
          href="#"
          accent="#000000"
          name="Notion"
          desc="Brief & project documents"
          icon={NotionIcon}
          ariaLabel="Notion — Brief & project documents"
        />
        <TriggerLink
          href="#"
          accent="#EA4335"
          name="Gmail"
          desc="Direct email inquiry"
          icon={GmailIcon}
          ariaLabel="Gmail — Direct email inquiry"
        />
        <TriggerLink
          href="#"
          accent="#25D366"
          name="WhatsApp"
          desc="Konsultasi gratis, langsung ke admin"
          icon={WhatsappIcon}
          ariaLabel="WhatsApp — Konsultasi gratis, langsung ke admin"
        />
      </nav>
    </section>
  );
}
