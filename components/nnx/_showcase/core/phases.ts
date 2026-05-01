export function segment(t: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (t - a) / (b - a || 1)));
}

export function createPhases(t: number) {
  return {
    circle: segment(t, 0.04, 0.22),
    title: segment(t, 0.18, 0.34),
    card: segment(t, 0.36, 0.58),
    glow: segment(t, 0.62, 0.8),
    blur: segment(t, 0.8, 0.96),
  };
}
