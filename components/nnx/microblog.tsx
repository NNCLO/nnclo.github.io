/* eslint-disable react/no-unescaped-entities */
"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon } from "./arrow-icon";

type GitLinkProps = {
  href: string;
  accent: string;
  name: string;
  desc: string;
  icon: ReactNode;
  ariaLabel: string;
};

function GitLink({ href, accent, name, desc, icon, ariaLabel }: GitLinkProps) {
  return (
    <a
      href={href}
      className="git-link"
      aria-label={ariaLabel}
      style={
        {
          ["--accent" as string]: accent,
          opacity: 1,
          transform: "none",
        } as CSSProperties
      }
    >
      <span className="git-ico" aria-hidden="true">
        {icon}
      </span>
      <span className="git-tx">
        <span className="git-tx-name" style={{ display: "block" }}>
          {name}
        </span>
        <span className="git-tx-desc" style={{ display: "block" }}>
          {desc}
        </span>
      </span>
      <span className="git-arr" aria-hidden="true">
        <ArrowIcon />
      </span>
    </a>
  );
}

const GithubIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InstagramIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
  </svg>
);

const ThreadsIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

export function Microblog() {
  const COMMIT_LINE = useMemo(
    () => `git commit -m "GIT — Github, Instagram, & Threads"`,
    [],
  );

  const [typedCount, setTypedCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "loading" | "links">("typing");

  // ---- Intersection Observer untuk menunda animasi sampai elemen terlihat ----
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false); // nilai aktual yang aman di dalam observer
  const [hasStarted, setHasStarted] = useState(false); // untuk trigger re-render effect typing

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setHasStarted(true);
          observer.disconnect(); // cukup sekali, hentikan pengamatan
        }
      },
      { threshold: 0.2 }, // 20% elemen terlihat sudah memulai
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // hanya dijalankan saat mount

  // ---- Animasi ketik (hanya berjalan jika sudah terlihat) ----
  useEffect(() => {
    if (phase !== "typing" || !hasStarted) return;

    const startDelay = 320;
    const msPerChar = 58;

    let raf = 0;
    let startedAt: number | null = null;
    let t0: number | null = null;
    let done = false;

    const tick = (ts: number) => {
      if (startedAt == null) startedAt = ts;
      const sinceStart = ts - startedAt;
      if (sinceStart < startDelay) {
        raf = window.requestAnimationFrame(tick);
        return;
      }
      if (t0 == null) t0 = ts;

      const elapsed = ts - t0;
      const lin = Math.min(1, elapsed / (COMMIT_LINE.length * msPerChar));
      const eased =
        lin < 0.5 ? 2 * lin * lin : 1 - Math.pow(-2 * lin + 2, 2) / 2;
      const target = Math.min(
        COMMIT_LINE.length,
        Math.floor(eased * COMMIT_LINE.length),
      );

      setTypedCount(target);

      if (!done && target >= COMMIT_LINE.length) {
        done = true;
        window.setTimeout(() => setPhase("loading"), 450);
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [COMMIT_LINE.length, phase, hasStarted]); // jalankan ulang jika hasStarted berubah

  // ---- Transisi dari loading ke links ----
  useEffect(() => {
    if (phase !== "loading") return;
    const t = window.setTimeout(() => setPhase("links"), 7_000);
    return () => window.clearTimeout(t);
  }, [phase]);

  const typedText = COMMIT_LINE.slice(0, typedCount);

  return (
    <section
      ref={sectionRef}
      className="sblock"
      data-s="micro"
      aria-labelledby="micro-title"
    >
      <style>{`
        @keyframes nnx-micro-caret { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes nnx-micro-shimmer {
          0% { background-position: 0% 50%; opacity:.55 }
          50% { background-position: 100% 50%; opacity:1 }
          100% { background-position: 0% 50%; opacity:.55 }
        }
      `}</style>
      <h2 className="sec-lbl" id="micro-title">
        // microblog
      </h2>
      <div className="card git-shell">
        <div className="git-bar" aria-hidden="true">
          <div className="git-dots">
            <span className="gd r" />
            <span className="gd y" />
            <span className="gd g" />
          </div>
          <span className="git-lbl">nnx.root — git terminal</span>
        </div>
        <div className="git-body">
          {phase === "typing" && (
            <p className="git-commit">
              <span className="git-prompt" aria-hidden="true">
                $
              </span>
              <span aria-live="polite">
                {typedText}
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 12,
                    marginLeft: 4,
                    verticalAlign: "middle",
                    background: "var(--green)",
                    borderRadius: 1,
                    animation: "nnx-micro-caret 0.7s step-end infinite",
                  }}
                />
              </span>
            </p>
          )}

          {phase === "loading" && (
            <div
              aria-label="Loading"
              role="status"
              style={{ marginBottom: 14 }}
            >
              <div
                style={{
                  height: 1,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "55%",
                    background:
                      "linear-gradient(90deg, rgba(0,212,255,0.0), rgba(0,212,255,0.55), rgba(157,111,255,0.55), rgba(0,255,136,0.55), rgba(0,255,136,0.0))",
                    backgroundSize: "220% 100%",
                    animation: "nnx-micro-shimmer 1.1s ease-in-out infinite",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  color: "var(--dim)",
                  textTransform: "uppercase",
                }}
              >
                loading channels
              </div>
            </div>
          )}

          {phase === "links" && (
            <nav className="git-links" aria-label="Microblog channels">
              {(
                [
                  {
                    href: "#",
                    accent: "var(--amber)",
                    name: "[G] GITHUB",
                    desc: "Source code & open projects",
                    icon: GithubIcon,
                    ariaLabel: "GitHub — Source code & open projects",
                  },
                  {
                    href: "#",
                    accent: "var(--red)",
                    name: "[I] INSTAGRAM",
                    desc: "Visual process & behind-the-scene",
                    icon: InstagramIcon,
                    ariaLabel: "Instagram — Visual process & behind-the-scene",
                  },
                  {
                    href: "#",
                    accent: "var(--violet)",
                    name: "[T] THREADS",
                    desc: "Daily notes & web tips",
                    icon: ThreadsIcon,
                    ariaLabel: "Threads — Daily notes & web tips",
                  },
                ] as const
              ).map((l, idx) => (
                <div
                  key={l.name}
                  style={{
                    opacity: 1,
                    transform: "translateX(0)",
                    animation: `fadeIn 420ms ${idx * 110}ms ease both`,
                  }}
                >
                  <GitLink {...l} />
                </div>
              ))}
              <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateX(-12px); }
                  to   { opacity: 1; transform: translateX(0); }
                }
              `}</style>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
