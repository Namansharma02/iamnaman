"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import NavBar from "../components/NavBar"
import GreetingHero from "../components/GreetingHero"
import WhatIDo from "../components/WhatIDo"
import ExperienceTimeline from "../components/ExperienceTimeline"
import TypedInView from "../components/TypedInView"

function SectionBlock({ id, title, children, bodyText }) {
  const ref = useRef(null)
  const [showContent, setShowContent] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  const timers = useRef({})
  const hasShown = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleEnter = () => {
      if (hasShown.current) {
        setShowContent(true)
        setTitleDone(true)
        return
      }
      const titleText = title || ""
      const titleSpeed = 18
      const hold = Math.max(600, titleText.length * titleSpeed + 120)
      clearTimeout(timers.current.reveal)
      setShowContent(false)
      setTitleDone(false)
      timers.current.reveal = setTimeout(() => {
        setShowContent(true)
        setTitleDone(true)
        hasShown.current = true
      }, hold)
    }

    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) handleEnter() }) },
      { threshold: 0.55, rootMargin: "0px 0px -5% 0px" }
    )

    io.observe(el)
    return () => { clearTimeout(timers.current.reveal); io.disconnect() }
  }, [title])

  return (
    <section ref={ref} id={id} className="snap-start min-h-dvh px-6 pt-[calc(var(--nav-h)+24px)] scroll-mt-[var(--nav-h)]">
      <div className="pin-head">
        {titleDone ? (
          <h2 className="section-title text-6xl md:text-7xl font-extrabold text-center">{title}</h2>
        ) : (
          <TypedInView as="h2" className="section-title text-6xl md:text-7xl font-extrabold text-center" text={title} speed={18} />
        )}
      </div>

      <div className="pin-body mx-auto max-w-5xl pt-6 pb-16 content-scope">
        {typeof bodyText === "string" && (showContent || hasShown.current) && (
          <TypedInView as="p" className="mb-8 text-center text-xl md:text-2xl whitespace-pre-line text-[var(--muted)] leading-relaxed" text={bodyText} speed={10} startDelay={40} />
        )}
        {showContent || hasShown.current ? children : null}
      </div>
    </section>
  )
}

export default function Home() {
  const [theme, setTheme] = useState("dark")

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

  const aboutCopy = useMemo(() => (
`At JPMorgan Chase, I lead automation across trading portals and banking tools, designing solutions that blend Python, Java, Alteryx, UiPath, Tableau, and SQL to remove friction at scale.

I thrive on complex, high stakes problems. They force me to think sharper, act faster, and deliver smarter systems. Outside of work, I follow tech, politics, and global news with the same curiosity I bring to my projects. I’m also a "sometimes" photographer with one of my shots being published in Lonely Planet magazine, 2020.`
  ), [])

  return (
    <>
      <NavBar theme={theme} onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))} />

      <main id="top" className="h-dvh snap-y snap-mandatory overflow-y-scroll overscroll-contain bg-[var(--bg)] text-[var(--fg)]">
        {/* HERO */}
        <section id="hero" className="snap-start h-dvh relative flex items-center justify-center px-6 pt-16">
          <div className="max-w-5xl text-center">
            <GreetingHero />
          </div>
        </section>

        {/* ABOUT ME */}
        <SectionBlock id="about" title="About Me" bodyText={aboutCopy} />

        {/* WHAT I DO */}
        <SectionBlock id="what-i-do" title="What I Do">
          <WhatIDo />
        </SectionBlock>

        {/* EXPERIENCE */}
        <SectionBlock id="experience" title="Experience">
          <ExperienceTimeline />
        </SectionBlock>

        {/* PROJECTS */}
        <SectionBlock id="projects" title="Projects">
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
        <SectionBlock id="skills" title="Skills">
          <div className="mx-auto max-w-5xl">
            <div className="mt-10 flex flex-wrap gap-3">
              {["React", "Next.js", "Tailwind", "Python", "Alteryx", "Tableau", "APIs", "Automation", "Leadership"].map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </SectionBlock>
      </main>
    </>
  )
}