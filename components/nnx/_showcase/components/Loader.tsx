"use client";

import { useScrollProgress } from "../hooks/useScrollProgress";
import { getLoaderState } from "../animations/loaderAnimation";

const TEXT = "max arc";

export function Loader() {
  const { ref, progress } = useScrollProgress();

  // ✅ sekarang benar (2 argumen)
  const state = getLoaderState(progress, TEXT.length);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "200vh",
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
          background: "black",
        }}
      >
        <div
          style={{
            opacity: state.opacity,
            transform: `scaleY(${state.scaleY})`,
            transformOrigin: "center",
            transition: "transform 0.1s linear, opacity 0.1s linear",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "white",
            }}
          >
            $ {TEXT.slice(0, state.typedChars)}
          </div>
        </div>
      </div>
    </section>
  );
}
