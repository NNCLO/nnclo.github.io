export function getTimeline(progress: number) {
  return {
    height: `${progress * 100}%`,
    opacity: progress > 0.001 && progress < 0.999 ? 1 : 0,
  };
}
