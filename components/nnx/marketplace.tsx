import { CARD_STEPS } from "@/lib/nnx/constants";

export function Marketplace() {
  return (
    <main
      style={
        {
          "--bg": "#04040a",
          "--green": "#00ff88",
          "--cyan": "#00d4ff",
          "--violet": "#9d6fff",
          "--amber": "#f0a500",
          "--red": "#ff3b5c",
          "--ice": "#b8d4ff",
          "--white": "#e8edf8",
          "--silver": "#a4adc4",
          "--dim": "#6b7393",
          "--ghost": "#20203a",
          "--b0": "rgba(255,255,255,0.055)",
          "--b1": "rgba(255,255,255,0.10)",
          "--b2": "rgba(255,255,255,0.04)",
          "--s1": "rgba(12,12,20,0.88)",
          "--r": "14px",
          "--rs": "8px",
          fontFamily: "'DM Mono', 'Fira Code', monospace",
          background: "var(--bg)",
          color: "var(--white)",
          minHeight: "100dvh",
          overflowX: "hidden",
        } as React.CSSProperties
      }
      className="relative pb-20"
    >
      {/* ── Animated background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 18% 22%, rgba(0,212,255,0.048) 0%, transparent 65%), radial-gradient(ellipse 48% 44% at 82% 80%, rgba(157,111,255,0.052) 0%, transparent 65%)",
          }}
          className="absolute inset-0"
        />
        <div
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cline x1='0' y1='0' x2='56' y2='0' stroke='rgba(0,212,255,0.038)' stroke-width='1' stroke-dasharray='3 9'/%3E%3Cline x1='0' y1='0' x2='0' y2='56' stroke='rgba(0,212,255,0.038)' stroke-width='1' stroke-dasharray='3 9'/%3E%3C/svg%3E\")",
            backgroundSize: "56px 56px",
          }}
          className="absolute inset-0 opacity-60"
        />
      </div>

      {/* ── Scanlines overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9997,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.028) 2px, rgba(0,0,0,0.028) 4px)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-lg mx-auto px-5">
        {/* ── Section label ── */}
        <div
          className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.35em]"
          style={{ color: "var(--dim)" }}
        >
          <span style={{ color: "var(--cyan)" }}>//</span> marketplace
          <span
            className="ml-auto text-[9px] px-2 py-[2px] rounded"
            style={{
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.18)",
              color: "var(--green)",
              letterSpacing: "0.25em",
            }}
          >
            OPEN
          </span>
        </div>

        {/* ══════════════════════════════════════════
            PRODUCT CARD — ACE Web Solution Package
        ══════════════════════════════════════════ */}
        <article
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            background: "rgba(8,8,18,0.85)",
            border: "1px solid rgba(0,212,255,0.18)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Product image / hero banner */}
          <div
            className="relative h-28 flex items-center px-6 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.10) 0%, rgba(157,111,255,0.08) 50%, rgba(0,255,136,0.06) 100%)",
              borderBottom: "1px solid rgba(0,212,255,0.10)",
            }}
          >
            {/* Big decorative char */}
            <span
              className="absolute right-5 text-[7rem] font-black select-none leading-none"
              style={{ color: "rgba(0,212,255,0.07)", top: "-12px" }}
              aria-hidden="true"
            >
              ACE
            </span>
            <div className="relative z-10">
              <div
                className="flex items-center gap-2 mb-1 text-[9px] uppercase tracking-[0.35em] font-bold"
                style={{ color: "var(--cyan)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background: "var(--cyan)",
                    boxShadow: "0 0 6px var(--cyan)",
                  }}
                />
                01 · PLAN
              </div>
              <h2
                className="text-3xl font-black leading-none tracking-tight"
                style={{ color: "var(--white)" }}
              >
                ACE
              </h2>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--silver)", letterSpacing: "0.04em" }}
              >
                Web Solution Package
              </p>
            </div>
          </div>

          {/* ACE breakdown */}
          <div className="p-5">
            <dl className="space-y-3 mb-5">
              {[
                {
                  key: "A",
                  label: "Advanced",
                  color: "var(--cyan)",
                  desc: "solusi teknis tingkat lanjut",
                },
                {
                  key: "C",
                  label: "Custom",
                  color: "var(--violet)",
                  desc: "dibangun khusus untukmu",
                },
                {
                  key: "E",
                  label: "Experience",
                  color: "var(--green)",
                  desc: "desain yang dirasakan",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: "var(--b2)",
                    border: "1px solid var(--b0)",
                  }}
                >
                  <dt
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                    style={{
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}44`,
                      color: item.color,
                    }}
                  >
                    {item.key}
                  </dt>
                  <dd
                    className="text-xs leading-relaxed m-0"
                    style={{ color: "var(--silver)" }}
                  >
                    <span className="font-bold" style={{ color: item.color }}>
                      {item.label}
                    </span>{" "}
                    Web —{" "}
                    <span style={{ color: "var(--dim)" }}>{item.desc}</span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* ── CARD Workflow — embedded below ACE ── */}
            <div
              className="rounded-xl overflow-hidden mb-5"
              style={{
                border: "1px solid rgba(157,111,255,0.20)",
                background: "rgba(157,111,255,0.04)",
              }}
            >
              {/* Workflow sub-header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(157,111,255,0.12)" }}
              >
                <span
                  className="text-[9px] font-black uppercase tracking-[0.3em]"
                  style={{ color: "var(--violet)" }}
                >
                  02 · WORKFLOW
                </span>
                <span
                  className="ml-auto text-[9px] font-bold"
                  style={{ color: "var(--dim)" }}
                >
                  How We Work
                </span>
                <span
                  className="text-2xl font-black leading-none ml-2"
                  style={{ color: "rgba(157,111,255,0.25)" }}
                  aria-hidden="true"
                >
                  CARD
                </span>
              </div>

              {/* Steps */}
              <ol className="px-4 py-3 space-y-0">
                {CARD_STEPS.map((s, i) => (
                  <li key={s.l} className="flex gap-3 items-stretch">
                    {/* Track */}
                    <div className="flex flex-col items-center flex-shrink-0 w-6">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
                        style={{
                          background: "rgba(157,111,255,0.15)",
                          border: "1px solid rgba(157,111,255,0.35)",
                          color: "var(--violet)",
                        }}
                      >
                        {s.l}
                      </div>
                      {i < CARD_STEPS.length - 1 && (
                        <div
                          className="w-px flex-1 my-1"
                          style={{
                            background: "rgba(157,111,255,0.15)",
                            minHeight: "16px",
                          }}
                        />
                      )}
                    </div>

                    {/* Body */}
                    <div className="pb-3 pt-0.5 flex-1">
                      <p
                        className="text-xs font-bold leading-none mb-0.5"
                        style={{ color: "var(--white)" }}
                      >
                        {s.n}
                      </p>
                      <p
                        className="text-[10px] leading-relaxed"
                        style={{ color: "var(--dim)" }}
                      >
                        {s.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2.5">
              <a
                href="#contact"
                className="flex-1 text-center py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--cyan), rgba(0,180,220,0.85))",
                  color: "#04040a",
                  letterSpacing: "0.04em",
                  boxShadow: "0 0 18px rgba(0,212,255,0.22)",
                }}
              >
                Mulai Konsultasi →
              </a>
              <a
                href="#portfolio"
                className="flex-1 text-center py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98]"
                style={{
                  background: "rgba(157,111,255,0.12)",
                  border: "1px solid rgba(157,111,255,0.35)",
                  color: "var(--violet)",
                  letterSpacing: "0.04em",
                }}
              >
                Lihat Portofolio →
              </a>
            </div>
          </div>
        </article>

        {/* ── Trust badges ── */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { icon: "⚡", label: "Fast Delivery" },
            { icon: "🛡", label: "Revisi Included" },
            { icon: "💬", label: "24/7 Support" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-semibold flex-1"
              style={{
                background: "var(--b2)",
                border: "1px solid var(--b0)",
                color: "var(--silver)",
                letterSpacing: "0.04em",
              }}
            >
              <span>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
