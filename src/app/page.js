"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import NavBar from "../components/NavBar"
import HeroSplit from "../components/HeroSplit"
import WhatIDo from "../components/WhatIDo"
import { motion } from "framer-motion"
import ExperienceTimeline from "../components/ExperienceTimeline"
import TypedInView from "../components/TypedInView"
import CodePeepOverlay from "../components/CodePeepOverlay"

function SectionBlock({ id, title, children, bodyText, activeId, bodySpeed = 10, bodyDelay = 40, bodyEffect = "type" }) {
  const ref = useRef(null)
  const [showContent, setShowContent] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  const hasEverShown = useRef(false)
  const timers = useRef({})

  const isActive = activeId === id

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !hasEverShown.current) {
            const titleText = title || ""
            const titleSpeed = 18
            const hold = Math.max(600, Math.ceil(titleText.length * titleSpeed * 0.6) + 120)
            clearTimeout(timers.current.reveal)
            timers.current.reveal = setTimeout(() => {
              setShowContent(true)
              hasEverShown.current = true
            }, hold)
          }
        })
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => { clearTimeout(timers.current.reveal); io.disconnect() }
  }, [title])

  useEffect(() => {
    if (!isActive || titleDone) return
    const titleText = title || ""
    const titleSpeed = 18
    const hold = Math.max(600, Math.ceil(titleText.length * titleSpeed * 0.6) + 120)
    setTitleDone(false)
    const t = setTimeout(() => setTitleDone(true), hold)
    return () => clearTimeout(t)
  }, [isActive, titleDone, title])

  return (
    <section ref={ref} id={id} data-section className="snap-start min-h-dvh px-6 pt-[calc(var(--nav-h)+24px)] scroll-mt-[var(--nav-h)]">
      <div className={`section-head ${isActive ? "is-active" : "is-inactive"}`}>
        {titleDone || hasEverShown.current ? (
          <h2 className="section-title text-6xl md:text-7xl font-extrabold text-center">{title}</h2>
        ) : (
          <TypedInView as="h2" className="section-title text-6xl md:text-7xl font-extrabold text-center" text={title} speed={18} />
        )}
      </div>

      <div className="pin-body mx-auto max-w-5xl pt-6 pb-16 content-scope">
        {typeof bodyText === "string" && (showContent || hasEverShown.current) && (
          bodyEffect === "fade" ? (
            <motion.p
              className="mb-8 text-center text-xl md:text-2xl whitespace-pre-line text-[var(--muted)] leading-relaxed"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              {bodyText}
            </motion.p>
          ) : (
            <TypedInView
              as="p"
              className="mb-8 text-center text-xl md:text-2xl whitespace-pre-line text-[var(--muted)] leading-relaxed"
              text={bodyText}
              speed={bodySpeed}
              startDelay={bodyDelay}
            />
          )
        )}
        {showContent || hasEverShown.current ? children : null}
      </div>
    </section>
  )
}

export default function Home() {
  const [theme, setTheme] = useState("dark")
  const [activeId, setActiveId] = useState("hero")
  const [codeOpen, setCodeOpen] = useState(false)

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme")
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark")
      document.documentElement.classList.toggle("light", theme === "light")
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  // swap favicon based on theme
  useEffect(() => {
    const href = theme === "dark" ? "/naman-avatar-dark.png" : "/naman-avatar-light.png"
    let link = document.querySelector('link[rel="icon"]')
    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      document.head.appendChild(link)
    }
    link.href = href

    let apple = document.querySelector('link[rel="apple-touch-icon"]')
    if (!apple) {
      apple = document.createElement("link")
      apple.rel = "apple-touch-icon"
      document.head.appendChild(apple)
    }
    apple.href = href
  }, [theme])

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") setCodeOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const main = document.querySelector("main")
    const sections = Array.from(document.querySelectorAll("[data-section]"))
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72

    const getActive = () => {
      let bestId = sections[0]?.id || ""
      let best = Infinity
      sections.forEach(s => {
        const top = s.getBoundingClientRect().top - navH
        const score = Math.abs(top)
        if (score < best) { best = score; bestId = s.id }
      })
      setActiveId(bestId)
    }

    getActive()
    const onScroll = () => requestAnimationFrame(getActive)
    main?.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", getActive)
    return () => { main?.removeEventListener("scroll", onScroll); window.removeEventListener("resize", getActive) }
  }, [])

  const aboutCopy = useMemo(() => (
`At JPMorgan Chase, I lead automation across trading portals and banking tools, designing solutions that blend Python, Java, Alteryx, UiPath, Tableau, and SQL to remove friction at scale.

I thrive on complex, high stakes problems. They force me to think sharper, act faster, and deliver smarter systems. Outside of work, I follow tech, politics, and global news with the same curiosity I bring to my projects. I’m also a "sometimes" photographer with one of my shots being published in Lonely Planet magazine, 2020.`
  ), [])

  const [pageCode, setPageCode] = useState("")
  useEffect(() => {
    if (codeOpen && !pageCode) {
      fetch("/code/page.js.txt")
        .then(r => r.ok ? r.text() : Promise.reject(r.status))
        .then(setPageCode)
        .catch(() => setPageCode("// Failed to load /code/page.js.txt. Add the file under public/code/ and reload."))
    }
  }, [codeOpen, pageCode])

  return (
    <>
      <NavBar
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        onToggleCode={() => setCodeOpen(o => !o)}
      />

      <main id="top" className="h-dvh snap-y snap-mandatory overflow-y-scroll overscroll-contain bg-[var(--bg)] text-[var(--fg)]">
        {/* HERO */}
        <section id="hero" className="snap-start min-h-[100svh] md:h-dvh relative px-4 md:px-6 pt-14 pb-2 md:pt-16 md:pb-0 grid items-start md:items-center">
          <div className="mx-auto w-full max-w-7xl">
            {/* Pass theme so avatar switches */}
            <HeroSplit theme={theme} />
          </div>
        </section>

        {/* ABOUT ME */}
        <SectionBlock id="about" activeId={activeId} title="About Me" bodyText={aboutCopy} bodyEffect="fade" />

        {/* WHAT I DO */}
        <SectionBlock id="what-i-do" activeId={activeId} title="What I Do">
          <WhatIDo />
        </SectionBlock>

        {/* EXPERIENCE */}
        <SectionBlock id="experience" activeId={activeId} title="Experience">
          <ExperienceTimeline />
        </SectionBlock>

        {/* PROJECTS */}
        <SectionBlock id="projects" activeId={activeId} title="Projects">
          <div className="mx-auto max-w-5xl">
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(n => (
                <a key={n} className="card group" href="#" target="_blank" rel="noreferrer">
                  <div className="h-40 rounded-xl bg-[var(--card)] border border-[var(--border)] grid place-items-center text-[var(--muted)]">
                    <span>Preview {n}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-medium">Case study {n}</div>
                    <span className="text-xs text-[var(--muted)] group-hover:text-[var(--fg)]">Read</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </SectionBlock>

        {/* SKILLS */}
        <SectionBlock id="skills" activeId={activeId} title="Skills">
          <div className="mx-auto max-w-5xl">
            <div className="mt-10 flex flex-wrap gap-3">
              {["React", "Next.js", "Tailwind", "Python", "Alteryx", "Tableau", "APIs", "Automation", "Leadership"].map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </SectionBlock>
      </main>

      <CodePeepOverlay open={codeOpen} code={pageCode} />
    </>
  )
}
