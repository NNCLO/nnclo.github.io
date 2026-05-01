import { easeInOut } from "../core/easing";
import { createPhases } from "../core/phases";

export function getCardAnimation(t: number) {
  const p = createPhases(t);

  return {
    cardOpacity: p.card * (1 - Math.max(0, p.blur - 0.1)),
    cardY: (1 - p.card) * 48,
    blur: p.blur * 14,
    scale: 0.96 + 0.04 * p.card,
    glow: p.glow,
  };
}
