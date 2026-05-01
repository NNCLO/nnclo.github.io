export function getScrollProgress(rect: DOMRect, vh: number) {
  const total = rect.height - vh;
  const scrolled = -rect.top;
  return total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
}

export function getViewportProgress(
  rect: DOMRect,
  vh: number,
  offsetStart = 0.5,
  offsetEnd = 0.5,
) {
  const start = rect.top + vh * offsetStart;
  const end = rect.bottom - vh * offsetEnd;
  const span = end - start;
  return span > 0 ? 1 - end / span : 0;
}
