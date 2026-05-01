import type { RefObject } from "react"

type Props = {
  loaderRef: RefObject<HTMLDivElement | null>
  pctRef: RefObject<HTMLDivElement | null>
}

export function Loader({ loaderRef, pctRef }: Props) {
  return (
    <div id="loader" ref={loaderRef} role="progressbar" aria-label="Memuat halaman" aria-live="polite">
      <div className="ld-logo" aria-hidden="true">
        NNX
      </div>
      <div className="ld-sub">Initializing system</div>
      <div className="ld-track" aria-hidden="true">
        <div className="ld-fill" />
      </div>
      <div className="ld-pct" ref={pctRef}>
        0%
      </div>
    </div>
  )
}
