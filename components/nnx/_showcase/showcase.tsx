import { Timeline } from "./showcase/components/Timeline";
import { CardFrame } from "./showcase/components/CardFrame";

export function Showcase() {
  return (
    <section>
      <Timeline />

      <CardFrame>Journey</CardFrame>
      <CardFrame>Max</CardFrame>
      <CardFrame>Arc</CardFrame>
    </section>
  );
}
