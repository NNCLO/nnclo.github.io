import { useScrollProgress } from "../hooks/useScrollProgress";
import { getTimeline } from "../animations/timelineAnimation";

export function Timeline() {
  const { ref, progress } = useScrollProgress();
  const anim = getTimeline(progress);

  return (
    <div ref={ref}>
      <div style={{ height: anim.height }} />
    </div>
  );
}
