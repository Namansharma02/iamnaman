"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import NavBar from "../components/NavBar"
import GreetingHero from "../components/GreetingHero"
import HeroSplit from "../components/HeroSplit"
import WhatIDo from "../components/WhatIDo"
import { motion } from "framer-motion"
import { Mail, Linkedin, ExternalLink } from "lucide-react"
import ExperienceTimeline from "../components/ExperienceTimeline"
import TypedInView from "../components/TypedInView"
import CodePeepOverlay from "../components/CodePeepOverlay"

function SectionBlock({ id, title, children, bodyText, activeId, bodySpeed = 10, bodyDelay = 40, bodyEffect = "type" }) {
  const ref = useRef(null)
  const [titleStarted, setTitleStarted] = useState(false) // begin typing only when we land here
  const [titleDone, setTitleDone] = useState(false)       // after typing finishes
  const [showContent, setShowContent] = useState(false)   // reveal body after title
  const hasEverShown = useRef(false)
  const timers = useRef({})

  const isActive = activeId === id

  // Start typing as soon as this section becomes the active one
  useEffect(() => {
    if (!titleStarted && isActive) setTitleStarted(true)
  }, [isActive, titleStarted])

  // When typing starts, schedule finish and body reveal exactly once
  useEffect(() => {
    if (!titleStarted || hasEverShown.current) return
    const titleText = title || ""
    const titleSpeed = 18
    const hold = Math.max(600, Math.ceil(titleText.length * titleSpeed * 0.6) + 120)

    clearTimeout(timers.current.title)
    clearTimeout(timers.current.body)

    timers.current.title = setTimeout(() => setTitleDone(true), hold)
    timers.current.body = setTimeout(() => { setShowContent(true); hasEverShown.current = true }, hold)

    return () => { clearTimeout(timers.current.title); clearTimeout(timers.current.body) }
  }, [titleStarted, title])

  return (
    <section ref={ref} id={id} data-section className="snap-start min-h-dvh px-6 pt-[calc(var(--nav-h)+24px)] scroll-mt-[var(--nav-h)]">
      <div className={`section-head ${isActive ? 'is-active' : 'is-inactive'}`}> 
        {titleDone ? (
          <h2 className="section-title text-6xl md:text-7xl font-extrabold text-center">{title}</h2>
        ) : titleStarted ? (
          <TypedInView as="h2" className="section-title text-6xl md:text-7xl font-extrabold text-center" text={title} speed={18} />
        ) : null}
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

  // add a class to hint at hover when code view is open
  useEffect(() => {
    const root = document.documentElement
    if (codeOpen) root.classList.add('code-open')
    else root.classList.remove('code-open')
  }, [codeOpen])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setCodeOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Determine current section by scrollTop relative to the scroll container, anchored under the navbar
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return

    const sections = Array.from(document.querySelectorAll('[data-section]'))

    const getActive = () => {
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72
      const anchor = main.scrollTop + navH + 8 // point just under the navbar inside the scroll content

      let bestId = sections[0]?.id || ''
      let best = Infinity

      sections.forEach(s => {
        // section top relative to the scroll container
        const sectionTop = s.offsetTop - main.offsetTop
        const dist = Math.abs(sectionTop - anchor)
        if (dist < best) { best = dist; bestId = s.id }
      })

      setActiveId(bestId)
    }

    getActive()
    const onScroll = () => requestAnimationFrame(getActive)
    main.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', getActive)
    return () => { main.removeEventListener('scroll', onScroll); window.removeEventListener('resize', getActive) }
  }, [])

  const aboutCopy = useMemo(() => (
`At JPMorgan Chase, I lead automation across trading portals and banking tools, designing solutions that blend Python, Java, Alteryx, UiPath, Tableau, and SQL to remove friction at scale.

I thrive on complex, high stakes problems. They force me to think sharper, act faster, and deliver smarter systems. Outside of work, I follow tech, politics, and global news with the same curiosity I bring to my projects. I’m also a "sometimes" photographer with one of my shots being published in Lonely Planet magazine, 2020.`
  ), [])

  // load the overlay code lazily from /public so we can store large files safely
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
        codeOpen={codeOpen}
        onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        onToggleCode={() => setCodeOpen(o => !o)}
      />

      <main id="top" className="h-dvh snap-y snap-mandatory overflow-y-scroll overscroll-contain bg-[var(--bg)] text-[var(--fg)]">
        {/* HERO */}
        <section id="hero" data-section className="snap-start min-h-[100svh] md:h-dvh relative px-4 md:px-6 pt-14 pb-2 md:pt-16 md:pb-0 grid items-start md:items-center">
          <div className="mx-auto w-full max-w-7xl">
            <HeroSplit imgSrc="/naman-avatar.png" imgAlt="Naman avatar" />
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

        {/* CONTACT */}
        <SectionBlock id="contact" activeId={activeId} title="Contact" bodyEffect="fade">
          <div className="mx-auto max-w-3xl">
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Email card */}
              <a
                href="mailto:namans0297@gmail.com"
                className="contact-card contact-email group"
              >
                <Mail className="contact-icon" />
                <div className="contact-text">
                  <div className="contact-title">Email</div>
                  <div className="contact-sub group-hover:text-[var(--fg)]">namans0297@gmail.com</div>
                </div>
              </a>

              {/* LinkedIn card with subtle glow and badge */}
              <a
                href="https://www.linkedin.com/in/namansharma0297/"
                target="_blank"
                rel="noreferrer"
                className="contact-card contact-linkedin contact-preferred group"
              >
                <Linkedin className="contact-icon" />
                <div className="contact-text">
                  <div className="contact-title">LinkedIn</div>
                  <div className="contact-sub group-hover:text-[var(--fg)]">/in/namansharma0297</div>
                </div>
                <ExternalLink className="ml-auto h-4 w-4 opacity-60 group-hover:opacity-100" />
                {/* <span className="badge">Preferred</span> */}
              </a>
            </div>

            <p className="mt-6 text-center text-sm text-[var(--muted)]">I respond fastest on LinkedIn. Email works great for longer notes.</p>
          </div>
        </SectionBlock>
      </main>

      {/* Code peephole overlay */}
      <CodePeepOverlay open={codeOpen} code={pageCode} />
    </>
  )
}