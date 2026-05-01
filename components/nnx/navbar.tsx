import type { RefObject } from "react"

type Props = {
  navRef: RefObject<HTMLElement | null>
  navTypeRef: RefObject<HTMLDivElement | null>
}

export function Navbar({ navRef, navTypeRef }: Props) {
  return (
    <nav className="navbar" id="navbar" ref={navRef} aria-label="Primary">
      <div className="nav-av">
        <div className="nav-ring" />
        <div className="nav-disc">
          <span className="nav-ini">NC</span>
        </div>
      </div>
      <div className="nav-info">
        <div className="nav-typing" id="nav-type" ref={navTypeRef}>
          <span className="nav-cur" />
        </div>
        <div className="nav-role">Creative Technologist</div>
      </div>
    </nav>
  )
}
