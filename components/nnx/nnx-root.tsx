"use client"

import { useRef } from "react"
import { useNnxEffects } from "@/hooks/use-nnx-effects"
import { Background } from "./background"
import { BlurGate } from "./blur-gate"
import { Hero } from "./hero"
import { Loader } from "./loader"
import { Marketplace } from "./marketplace"
import { Microblog } from "./microblog"
import { Navbar } from "./navbar"
import { Showcase } from "./showcase"
import { SiteFooter } from "./site-footer"
import { Thriller } from "./thriller"
import { TrendsServices } from "./trends-services"
import { Trigger } from "./trigger"

export function NnxRoot() {
  const heroRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const gateRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLDivElement>(null)
  const beamsRef = useRef<HTMLDivElement>(null)
  const navTypeRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)

  useNnxEffects({
    heroRef,
    navRef,
    gateRef,
    loaderRef,
    pctRef,
    beamsRef,
    navTypeRef,
    logoRef,
  })

  return (
    <>
      <Loader loaderRef={loaderRef} pctRef={pctRef} />
      <Background beamsRef={beamsRef} />
      <Navbar navRef={navRef} navTypeRef={navTypeRef} />
      <BlurGate gateRef={gateRef} />

      <main>
        <Hero heroRef={heroRef} logoRef={logoRef} />

        {/*
         * `.content-stage` = panggung untuk seluruh section pasca-hero.
         * Memberi dim + backdrop-blur halus agar bg-root (orb, grid, beam, grain)
         * tidak mengganggu keterbacaan kartu, sambil tetap terasa hidup di sela-selanya.
         */}
        <div className="content-stage">
          <div className="content-stage-veil" aria-hidden="true" />
          <div className="page">
            <TrendsServices />
            <Showcase />
            <Microblog />
            <Marketplace />
            <Thriller />
            <Trigger />
            <SiteFooter />
          </div>
        </div>
      </main>
    </>
  )
}
