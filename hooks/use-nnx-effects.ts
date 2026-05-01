"use client"

import { useEffect, type RefObject } from "react"
import { BEAMS } from "@/lib/nnx/constants"

type Refs = {
  heroRef: RefObject<HTMLElement | null>
  navRef: RefObject<HTMLElement | null>
  gateRef: RefObject<HTMLDivElement | null>
  loaderRef: RefObject<HTMLDivElement | null>
  pctRef: RefObject<HTMLDivElement | null>
  beamsRef: RefObject<HTMLDivElement | null>
  navTypeRef: RefObject<HTMLDivElement | null>
  logoRef: RefObject<HTMLSpanElement | null>
}

/**
 * Mengelola seluruh efek interaktif halaman NNX:
 * loader, beams generator, parallax hero, navbar typing,
 * logo glitch, reveal-on-scroll, dan tilt + spotlight.
 *
 * Hormati `prefers-reduced-motion` dan hentikan animasi yang
 * boros saat tab tidak aktif (visibilitychange).
 */
export function useNnxEffects({
  heroRef,
  navRef,
  gateRef,
  loaderRef,
  pctRef,
  beamsRef,
  navTypeRef,
  logoRef,
}: Refs) {
  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    /* ── BEAMS DOM ─────────────────────────────── */
    const beamsHost = beamsRef.current
    const createdBeams: HTMLDivElement[] = []
    if (beamsHost && !prefersReduced) {
      BEAMS.forEach((b) => {
        const el = document.createElement("div")
        el.className = "beam"
        Object.assign(el.style, {
          width: b.w,
          height: b.h,
          left: b.l || "",
          right: b.r || "",
          top: b.t || "",
          bottom: b.bt || "",
        })
        el.style.setProperty("--d", b.d)
        el.style.setProperty("--c", b.c)
        el.style.setProperty("--t", b.tm)
        el.style.setProperty("--dl", b.dl)
        beamsHost.appendChild(el)
        createdBeams.push(el)
      })
    }

    /* ── LOADER ───────────────────────────────── */
    let p = 0
    let pctInterval: ReturnType<typeof setInterval> | null = null
    const startNavTyping = async () => {
      const el = navTypeRef.current
      if (!el) return
      const T = "_n.clo"
      await sleep(prefersReduced ? 50 : 300)
      for (let i = 0; i <= T.length; i++) {
        el.innerHTML = T.slice(0, i) + '<span class="nav-cur"></span>'
        await sleep(prefersReduced ? 0 : i === 0 ? 200 : 105)
      }
    }
    pctInterval = setInterval(
      () => {
        p = Math.min(100, p + (prefersReduced ? 35 : Math.random() * 18 + 4))
        if (pctRef.current) pctRef.current.textContent = Math.floor(p) + "%"
        if (p >= 100) {
          if (pctRef.current) pctRef.current.textContent = "100%"
          if (pctInterval) clearInterval(pctInterval)
          setTimeout(() => {
            loaderRef.current?.classList.add("out")
            startNavTyping()
          }, 280)
        }
      },
      prefersReduced ? 40 : 120,
    )

    /* ── PARALLAX (hero) ───────────────────────── */
    let sT = 0
    let sC = 0
    let gateGone = false
    const onScroll = () => {
      sT = window.scrollY
      if (sT > 50 && !gateGone) {
        gateRef.current?.classList.add("gone")
        gateGone = true
      }
      navRef.current?.classList.toggle("stuck", sT > 16)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    let rafId = 0
    const raf = () => {
      sC += (sT - sC) * 0.1
      if (heroRef.current && !prefersReduced) {
        // Clamp parallax di setengah tinggi hero supaya tidak bleed ke section berikutnya,
        // lalu fade opacity seiring hero meninggalkan viewport agar "tenggelam" mulus.
        const heroH = heroRef.current.offsetHeight || window.innerHeight
        const ty = Math.min(sC * 0.32, heroH * 0.5)
        const fadeStart = heroH * 0.35
        const fadeEnd = heroH * 0.85
        const fade =
          sC <= fadeStart
            ? 1
            : sC >= fadeEnd
              ? 0
              : 1 - (sC - fadeStart) / (fadeEnd - fadeStart)
        heroRef.current.style.transform = `translateY(${ty}px)`
        heroRef.current.style.opacity = String(fade)
        heroRef.current.style.pointerEvents = fade < 0.05 ? "none" : ""
      }
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    /* ── LOGO GLITCH ──────────────────────────── */
    const baseLogoFilter =
      "drop-shadow(0 0 55px rgba(180,205,255,.18)) drop-shadow(0 0 110px rgba(100,145,255,.09))"
    let logoInterval: ReturnType<typeof setInterval> | null = null
    const startGlitch = () => {
      if (logoInterval || prefersReduced) return
      logoInterval = setInterval(() => {
        const logo = logoRef.current
        if (!logo) return
        if (Math.random() > 0.92) {
          const rx = (Math.random() * 10 - 5).toFixed(1)
          const ry = (Math.random() * 10 - 5).toFixed(1)
          logo.style.filter = `drop-shadow(${rx}px 0 rgba(255,59,92,.8)) drop-shadow(${ry}px 0 rgba(0,255,136,.8)) drop-shadow(0 0 50px rgba(180,205,255,.28))`
          setTimeout(() => {
            if (logoRef.current) logoRef.current.style.filter = baseLogoFilter
          }, 68)
        }
      }, 900)
    }
    const stopGlitch = () => {
      if (logoInterval) {
        clearInterval(logoInterval)
        logoInterval = null
      }
      if (logoRef.current) logoRef.current.style.filter = baseLogoFilter
    }
    startGlitch()

    const onVisibility = () => {
      if (document.hidden) stopGlitch()
      else startGlitch()
    }
    document.addEventListener("visibilitychange", onVisibility)

    /* ── REVEAL ───────────────────────────────── */
    type KF = Keyframe
    const wa = (
      el: Element | null,
      from: KF,
      to: KF,
      dur = 500,
      del = 0,
      ease = "cubic-bezier(0.22,1,0.36,1)",
    ) => {
      if (!el) return
      if (prefersReduced) {
        ;(el as HTMLElement).style.opacity = "1"
        ;(el as HTMLElement).style.transform = "none"
        return
      }
      ;(el as HTMLElement).animate([from, to], { duration: dur, delay: del, fill: "forwards", easing: ease })
    }

    const FROM_UP: KF = { opacity: 0, transform: "translateY(20px)" }
    const TO_UP: KF = { opacity: 1, transform: "translateY(0)" }
    const FROM_L: KF = { opacity: 0, transform: "translateX(-18px)" }
    const TO_L: KF = { opacity: 1, transform: "translateX(0)" }
    const FROM_POP: KF = { opacity: 0, transform: "scale(0.93) translateY(18px)" }
    const TO_POP: KF = { opacity: 1, transform: "scale(1) translateY(0)" }

    const revealBlock = (block: HTMLElement) => {
      const s = block.dataset.s
      wa(block, { opacity: 0, transform: "translateY(42px)" }, { opacity: 1, transform: "translateY(0)" }, 580, 0)
      const lbl = block.querySelector(".sec-lbl")
      if (lbl) wa(lbl, { opacity: 0 }, { opacity: 1 }, 360, 100)

      if (s === "trends") {
        const h = block.querySelector(".tr-heading")
        if (h) wa(h, FROM_UP, TO_UP, 460, 120)
        block.querySelectorAll(".tr-item").forEach((c, i) => wa(c, FROM_L, TO_L, 420, 220 + i * 80))
      }
      if (s === "showcase") {
        wa(block.querySelector(".sh-header"), FROM_UP, TO_UP, 480, 160)
        block.querySelectorAll(".arc-card").forEach((c, i) => wa(c, FROM_UP, TO_UP, 440, 280 + i * 90))
      }
      if (s === "micro") {
        wa(block.querySelector(".git-shell"), FROM_UP, TO_UP, 500, 160)
        block.querySelectorAll(".git-link").forEach((c, i) => wa(c, FROM_L, TO_L, 400, 320 + i * 90))
      }
      if (s === "market") {
        wa(block.querySelector(".ace-card"), FROM_POP, TO_POP, 500, 160, "cubic-bezier(0.34,1.56,0.64,1)")
        wa(block.querySelector(".card-flow"), FROM_POP, TO_POP, 500, 280, "cubic-bezier(0.34,1.56,0.64,1)")
        block.querySelectorAll(".cf-step").forEach((c, i) => wa(c, FROM_L, TO_L, 380, 380 + i * 80))
      }
      if (s === "thriller") {
        wa(block.querySelector(".thriller-card"), FROM_POP, TO_POP, 620, 160, "cubic-bezier(0.34,1.56,0.64,1)")
      }
      if (s === "trigger") {
        block.querySelectorAll(".tg").forEach((c, i) => wa(c, FROM_L, TO_L, 400, 160 + i * 90))
      }
      if (s === "footer") {
        wa(block.querySelector(".footer-card"), FROM_UP, TO_UP, 520, 160)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          revealBlock(e.target as HTMLElement)
          io.unobserve(e.target)
        })
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    )
    document.querySelectorAll<HTMLElement>(".sblock").forEach((b) => io.observe(b))

    /* ── TILT + SPOTLIGHT ─────────────────────── */
    type Cleanup = () => void
    const tiltCleanups: Cleanup[] = []
    const tilt = (sel: string, tx = 0.02, ty = 0.04) => {
      if (prefersReduced) return
      document.querySelectorAll<HTMLElement>(sel).forEach((c) => {
        const onMove = (e: MouseEvent) => {
          const r = c.getBoundingClientRect()
          c.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%")
          c.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%")
          const dx = e.clientX - r.left - r.width / 2
          const dy = e.clientY - r.top - r.height / 2
          c.style.transform = `perspective(800px) rotateX(${(-dy * tx).toFixed(2)}deg) rotateY(${(dx * ty).toFixed(2)}deg) translateY(-3px)`
        }
        const onLeave = () => {
          c.style.transform = ""
        }
        c.addEventListener("mousemove", onMove)
        c.addEventListener("mouseleave", onLeave)
        tiltCleanups.push(() => {
          c.removeEventListener("mousemove", onMove)
          c.removeEventListener("mouseleave", onLeave)
        })
      })
    }
    tilt(".tr-item", 0.016, 0.036)
    tilt(".arc-card", 0.016, 0.032)
    tilt(".git-link", 0.015, 0.03)
    tilt(".tg", 0.015, 0.03)

    /* ── KEYBOARD ACTIVATE for role=button cards ───── */
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (!target?.matches?.('[role="button"]')) return
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        target.click()
      }
    }
    document.addEventListener("keydown", onKeyDown)

    return () => {
      if (pctInterval) clearInterval(pctInterval)
      stopGlitch()
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVisibility)
      document.removeEventListener("keydown", onKeyDown)
      io.disconnect()
      tiltCleanups.forEach((fn) => fn())
      createdBeams.forEach((el) => el.remove())
    }
  }, [heroRef, navRef, gateRef, loaderRef, pctRef, beamsRef, navTypeRef, logoRef])
}
