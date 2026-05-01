"use client";

import { ReactNode } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { getCardAnimation } from "../animations/cardAnimation";

type CardFrameProps = {
  children: ReactNode;
};

export function CardFrame({ children }: CardFrameProps) {
  const { ref, progress } = useScrollProgress();
  const anim = getCardAnimation(progress);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "240vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            padding: "0 16px",

            opacity: anim.cardOpacity,
            transform: `translateY(${anim.cardY}px) scale(${anim.scale})`,
            filter: `blur(${anim.blur}px)`,

            transition: "transform 60ms linear, filter 160ms ease",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(6,6,14,0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
