import type { RefObject } from "react"

type Props = {
  gateRef: RefObject<HTMLDivElement | null>
}

export function BlurGate({ gateRef }: Props) {
  return (
    <div className="blur-gate" id="blur-gate" ref={gateRef} aria-hidden="true">
      <div className="gate-hint">
        <span>scroll</span>
        <span className="chev" />
      </div>
    </div>
  )
}
