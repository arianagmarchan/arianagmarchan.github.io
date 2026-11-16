"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// THE CITY OPENS — locked scroll-scrub video hero
// The page cannot move while this is active — body is pinned
// with position:fixed (the same bulletproof technique modal
// libraries use; plain overflow:hidden alone isn't reliable
// across browsers). Wheel/touch input is captured and used
// purely to drive video.currentTime, forward and backward. Once
// the video reaches the end and the user keeps pushing forward,
// the page unlocks and continues normally — and re-locks if they
// scroll back up into it. No dependencies, system fonts only.
//
// Changes for this site (the original never released the lock):
// - releases at the end of the video and re-locks at the top of the page
// - keyboard (arrows, Page Up/Down, Space, End) drives it too
// - the scroll hint is a button that plays the reveal and moves on
// - a "Skip intro" button, and in-page links (/#contact) skip it
// - reduced motion: no lock at all, the last frame and tagline show
// - `fontFamily` and `continueTo` props
// ─────────────────────────────────────────────────────────────

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  /** Total input distance (px) needed to scrub the full video. Tune to taste. */
  scrubDistance?: number
  /** Font for the title and tagline. */
  fontFamily?: string
  /** Id of the element to bring into view once the intro is done or skipped. */
  continueTo?: string
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO = "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4"
const DEFAULT_SIGNATURE = { name: "guglielmogiannattasio.exe", url: "https://www.guglielmogiannattasio.it" }
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE CITY OPENS",
  scrollHint = "SCROLL",
  tagline = "Every door in the city is already open.",
  signature = DEFAULT_SIGNATURE,
  scrubDistance = 3200,
  fontFamily = SANS,
  continueTo,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLButtonElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    // Arriving on a deep link (/#contact) or part-way down the page: start finished.
    const startDone = reduceMotion || !!window.location.hash || window.scrollY > 10

    let duration = 0
    let rafId = 0
    let targetProgress = startDone ? 1 : 0
    let currentProgress = startDone ? 1 : 0
    let hasStartedScrolling = startDone
    let isSeeking = false
    let pendingTime: number | null = null
    let locked = false
    let lockedScrollY = 0
    let touchStartY = 0
    let autoContinue = false

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (startDone) video.currentTime = duration * 0.98
    }
    video.addEventListener("loadeddata", onLoadedData)
    // A cached video can finish loading before this effect runs; catch up.
    if (video.readyState >= 2) onLoadedData()

    // iOS Safari often won't buffer any video data — even with
    // preload="auto" — until playback actually starts, to save mobile
    // data. Since we only ever seek (never call play() elsewhere), the
    // video can stay permanently blank on iPhone. Force a silent
    // play-then-immediately-pause on mount to kick off real loading.
    const kickstartLoad = () => {
      const p = video.play()
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
    }
    kickstartLoad()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    const seekTo = (t: number) => {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video.currentTime = t
    }

    function engageLock() {
      if (locked || typeof document === "undefined") return
      locked = true
      section!.style.touchAction = "none"
      lockedScrollY = window.scrollY
      const b = document.body.style
      b.position = "fixed"
      b.top = `-${lockedScrollY}px`
      b.left = "0"
      b.right = "0"
      b.width = "100%"
      b.height = "100%"
      b.overscrollBehavior = "none"
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return
      locked = false
      // let a finger on the hero scroll the page normally again
      section!.style.touchAction = "pan-y"
      const y = lockedScrollY
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.height = ""
      b.overscrollBehavior = ""
      window.scrollTo(0, y)
    }

    function goOn() {
      releaseLock()
      const el = continueTo ? document.getElementById(continueTo) : null
      if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
    }

    if (!startDone) engageLock()
    else section.style.touchAction = "pan-y"
    // Opened as /#contact from another page: make sure we land on it.
    const landing = window.location.hash.slice(1)
    // The router may still reset the scroll position just after mount, so try a few times.
    const landingTimers = landing
      ? [0, 150, 400].map((ms) =>
          window.setTimeout(() => {
            const el = document.getElementById(landing)
            if (el && Math.abs(el.getBoundingClientRect().top) > 80) el.scrollIntoView({ behavior: "auto" })
          }, ms),
        )
      : []

    // Returns true when the input was used by the hero (and the page must not scroll).
    function addDelta(deltaY: number): boolean {
      if (!locked) {
        // Back at the very top and scrolling up: take over again.
        if (deltaY < 0 && window.scrollY <= 0 && !reduceMotion) {
          engageLock()
        } else {
          return false
        }
      }
      // At the end and still pushing forward: let the page go.
      if (deltaY > 0 && targetProgress >= 1 && currentProgress > 0.985) {
        releaseLock()
        return false
      }
      targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      if (targetProgress > 0.001) hasStartedScrolling = true
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (addDelta(e.deltaY)) e.preventDefault()
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - y
      touchStartY = y
      if (addDelta(deltaY * 1.6)) e.preventDefault()
    }

    const onKey = (e: KeyboardEvent) => {
      if (!locked) {
        if ((e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Home") && window.scrollY <= 0) {
          if (addDelta(-scrubDistance * 0.15)) e.preventDefault()
        }
        return
      }
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return
      const step = scrubDistance * 0.12
      let d = 0
      if (e.key === "ArrowDown") d = step
      else if (e.key === "PageDown" || (e.key === " " && !e.shiftKey)) d = step * 2.5
      else if (e.key === "ArrowUp") d = -step
      else if (e.key === "PageUp" || (e.key === " " && e.shiftKey)) d = -step * 2.5
      else if (e.key === "End") {
        targetProgress = 1
        autoContinue = true
        e.preventDefault()
        return
      } else return
      addDelta(d)
      e.preventDefault()
    }

    // In-page links such as /#contact can't scroll while the body is pinned.
    const onHash = () => {
      targetProgress = 1
      hasStartedScrolling = true
      releaseLock()
      const id = window.location.hash.slice(1)
      if (id) document.getElementById(id)?.scrollIntoView()
    }

    const hint = hintRef.current
    const onHint = () => {
      targetProgress = 1
      hasStartedScrolling = true
      autoContinue = true
      if (!locked) goOn()
    }
    const skip = skipRef.current
    const onSkip = () => {
      targetProgress = 1
      currentProgress = 1
      hasStartedScrolling = true
      goOn()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("keydown", onKey)
    window.addEventListener("hashchange", onHash)
    hint?.addEventListener("click", onHint)
    skip?.addEventListener("click", onSkip)
    // Also bind directly on the element itself, with capture — on some
    // iOS versions a window-level listener alone can lose the race
    // against the browser's own native scroll handling.
    section.addEventListener("touchstart", onTouchStart, { passive: true, capture: true })
    section.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })

    function paint() {
      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.06
        videoRef.current.style.transform = `scale(${scale})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
        hintRef.current.style.pointerEvents = hasStartedScrolling ? "none" : "auto"
      }
      if (skipRef.current) {
        const show = locked && currentProgress < 0.97
        skipRef.current.style.opacity = show ? "1" : "0"
        skipRef.current.style.pointerEvents = show ? "auto" : "none"
      }
      if (taglineRef.current) {
        // Mirrors the title's blur-focus treatment, timed as the payoff
        // once the reveal is nearly complete — not a background afterthought.
        const t = clamp((currentProgress - 0.82) / 0.18, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }
    }

    function frame() {
      // Clicking the hint plays the reveal at a steady pace instead of jumping.
      currentProgress += (targetProgress - currentProgress) * (autoContinue ? 0.035 : 0.18)
      if (Math.abs(targetProgress - currentProgress) < 0.0005) currentProgress = targetProgress

      if (duration > 0) {
        seekTo(currentProgress * duration)
      }
      paint()

      if (autoContinue && currentProgress >= 0.999) {
        autoContinue = false
        setTimeout(goOn, 500)
      }

      rafId = requestAnimationFrame(frame)
    }

    if (reduceMotion) paint()
    else rafId = requestAnimationFrame(frame)

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("hashchange", onHash)
      hint?.removeEventListener("click", onHint)
      skip?.removeEventListener("click", onSkip)
      section.removeEventListener("touchstart", onTouchStart, true)
      section.removeEventListener("touchmove", onTouchMove, true)
      cancelAnimationFrame(rafId)
      landingTimers.forEach((t) => window.clearTimeout(t))
      releaseLock()
    }
  }, [scrubDistance, continueTo])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
          touchAction: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.55))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily,
            fontWeight: 800,
            fontSize: "clamp(38px, 7vw, 104px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </h1>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily,
              fontWeight: 700,
              fontSize: "clamp(24px, 3.6vw, 48px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      <button
        ref={hintRef}
        type="button"
        aria-label="Play the intro and continue"
        style={{
          all: "unset",
          cursor: "pointer",
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          padding: 8,
          color: "rgba(240,244,248,0.85)",
          fontFamily: SANS,
          fontSize: "clamp(11px, 1.4vw, 13px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        ref={skipRef}
        type="button"
        style={{
          all: "unset",
          cursor: "pointer",
          position: "absolute",
          left: "clamp(12px, 2.5vw, 24px)",
          bottom: "clamp(10px, 2vw, 18px)",
          padding: "6px 2px",
          fontFamily: SANS,
          fontWeight: 500,
          fontSize: "clamp(12px, 1.4vw, 13px)",
          color: "rgba(220,224,232,0.7)",
          textDecoration: "underline",
          textUnderlineOffset: 4,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }}
      >
        Skip intro
      </button>

      {/* Thin progress line — fills as the video advances. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {signature && (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            letterSpacing: "0.01em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(220,224,232,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = COL_TEXT
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = "rgba(220,224,232,0.6)"
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  )
}
