export function getLoaderState(p: number, length: number) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  const pAppear = clamp(p / 0.1);
  const pType = clamp((p - 0.08) / 0.37);
  const pErase = clamp((p - 0.55) / 0.15);
  const pCollapse = clamp((p - 0.68) / 0.14);

  const typed = Math.ceil(pType * length);
  const erased = Math.floor(pErase * length);
  const visible = Math.max(0, typed - erased);

  return {
    opacity: pAppear,
    scaleY: Math.max(0.012, 1 - pCollapse * 0.988),
    typedChars: visible,
  };
}
