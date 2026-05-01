import type { RefObject } from "react"

type Props = {
  beamsRef: RefObject<HTMLDivElement | null>
}

/** Latar belakang statis: wash, grid, beam holder, orb, dan grain. */
export function Background({ beamsRef }: Props) {
  return (
    <>
      <div className="bg-root" id="bg-root">
        <div className="bg-wash" />
        <div className="bg-grid" />
        <div className="bg-beams" id="bg-beams" ref={beamsRef} />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        <div className="bg-grain" />
      </div>
      <div className="bg-scan" />
    </>
  )
}
