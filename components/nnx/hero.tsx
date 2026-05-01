import type { RefObject } from "react";

type Props = {
  heroRef: RefObject<HTMLElement | null>;
  logoRef: RefObject<HTMLSpanElement | null>;
};

export function Hero({ heroRef, logoRef }: Props) {
  return (
    <section
      className="hero mb-5"
      id="hero"
      ref={heroRef}
      aria-labelledby="hero-title"
    >
      <div className="hero-pill mb-5" role="status">
        <span className="pdot" aria-hidden="true" />
        BETA V.0.2
      </div>
      <h1 className="hero-logo-wrap" id="hero-title">
        <span className="hero-nnx" ref={logoRef}>
          NNX
        </span>
        <span className="hero-root">
          .ROOT
          <span className="hcur" aria-hidden="true" />
        </span>
      </h1>

      <div className="hero-desc">
        <span className="hero-desc-line">Digital Product Builder</span>
      </div>
    </section>
  );
}
