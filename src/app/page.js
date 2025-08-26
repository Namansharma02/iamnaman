"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import NavBar from "../components/NavBar"
import HeroSplit from "../components/HeroSplit"
import WhatIDo from "../components/WhatIDo"
import { motion } from "framer-motion"
import { Mail, Linkedin, ExternalLink } from "lucide-react"
import ExperienceTimeline from "../components/ExperienceTimeline"
import TypedInView from "../components/TypedInView"
import CodePeepOverlay from "../components/CodePeepOverlay"
import MatrixBackground from "../components/bg/MatrixBackground"





function SectionBlock({
  id,
  title,
  children,
  bodyText,
  activeId,
  hasScrolled,
  bodySpeed = 10,
  bodyDelay = 40,
  bodyEffect = "type",
}) {
  const ref = useRef(null)
  const [titleStarted, setTitleStarted] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const hasEverShown = useRef(false)
  const timers = useRef({})

  const isActive = activeId === id

  // Start typing ONLY when section becomes active AND user has scrolled
  useEffect(() => {
    if (!titleStarted && isActive && hasScrolled) setTitleStarted(true)
  }, [isActive, hasScrolled, titleStarted])

  // When typing starts, schedule finish and body reveal once
  useEffect(() => {
    if (!titleStarted || hasEverShown.current) return
    const titleText = title || ""
    const titleSpeed = 18
    const hold = Math.max(600, Math.ceil(titleText.length * titleSpeed * 0.6) + 120)

    clearTimeout(timers.current.title)
    clearTimeout(timers.current.body)

    timers.current.title = setTimeout(() => setTitleDone(true), hold)
    timers.current.body = setTimeout(() => {
      setShowContent(true)
      hasEverShown.current = true
    }, hold)

    return () => {
      clearTimeout(timers.current.title)
      clearTimeout(timers.current.body)
    }
  }, [titleStarted, title])

  return (
    <section
      ref={ref}
      id={id}
      data-section
      className="snap-start min-h-dvh px-6 pt-[calc(var(--nav-h)+24px)] scroll-mt-[var(--nav-h)]"
    >
      <div className={`section-head ${isActive ? "is-active" : "is-inactive"}`}>
  <h2 className="section-title text-6xl md:text-7xl font-extrabold text-center">
    {titleDone || hasEverShown.current
      ? title
      : titleStarted && hasScrolled
        ? <TypedInView as="span" text={title} speed={18} />
        : <span className="opacity-0">{title}</span>}
  </h2>
</div>


      <div className="pin-body mx-auto max-w-5xl pt-6 pb-16 content-scope">
        {typeof bodyText === "string" && (showContent || hasEverShown.current) && (
          bodyEffect === "fade" ? (
            <motion.p
              className="mb-8 text-center text-xl md:text-2xl whitespace-pre-line text-[var(--muted)] leading-relaxed"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.20 }}
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
        <div style={{ visibility: (showContent || hasEverShown.current) ? "visible" : "hidden" }}>
  {children}
</div>

      </div>
    </section>
  )
}

export default function Home() {
  const [theme, setTheme] = useState("light")
  const [activeId, setActiveId] = useState("hero")
  const [codeOpen, setCodeOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // hydrate theme from localStorage
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme")
    if (saved) setTheme(saved)
  }, [])

  // apply theme classes
  useEffect(() => {
  if (typeof document !== "undefined") {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }
}, [theme])


  // add/remove helper class when code overlay is open
  useEffect(() => {
    const root = document.documentElement
    if (codeOpen) root.classList.add("code-open")
    else root.classList.remove("code-open")
  }, [codeOpen])

  // ESC to close overlay
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") setCodeOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // force top on hard refresh and strip any hash
  useEffect(() => {
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    } catch {}
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search)
    }
    window.scrollTo(0, 0)
    const main = document.querySelector("main")
    if (main) {
      const prev = main.style.scrollBehavior
      main.style.scrollBehavior = "auto"
      main.scrollTop = 0
      requestAnimationFrame(() => {
        main.style.scrollBehavior = prev || ""
      })
    }
    setActiveId("hero")
  }, [])

  // detect first user scroll on the main scroller
  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return
    const onScroll = () => {
      if (!hasScrolled && main.scrollTop > 2) setHasScrolled(true)
    }
    main.addEventListener("scroll", onScroll, { passive: true })
    return () => main.removeEventListener("scroll", onScroll)
  }, [hasScrolled])

  // active section tracking against the scroll container
  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return
    const sections = Array.from(document.querySelectorAll("[data-section]"))

    const getActive = () => {
      const navH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 72
      const anchor = main.scrollTop + navH + 8
      let bestId = sections[0]?.id || ""
      let best = Infinity
      sections.forEach(s => {
        const sectionTop = s.offsetTop - main.offsetTop
        const dist = Math.abs(sectionTop - anchor)
        if (dist < best) {
          best = dist
          bestId = s.id
        }
      })
      setActiveId(bestId)
    }

    getActive()
    const onScroll = () => requestAnimationFrame(getActive)
    main.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", getActive)
    return () => {
      main.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", getActive)
    }
  }, [])

  // About text
  const aboutCopy = useMemo(
    () =>
``,
    []
  )

  // Lazy-load the code text for the overlay
  const [pageCode, setPageCode] = useState("")
  useEffect(() => {
    if (codeOpen && !pageCode) {
      fetch("/code/page.js.txt")
        .then(r => (r.ok ? r.text() : Promise.reject(r.status)))
        .then(setPageCode)
        .catch(() =>
          setPageCode("// Failed to load /code/page.js.txt. Add the file under public/code/ and reload.")
        )
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

      <main
  suppressHydrationWarning
  id="top"
  className="relative h-dvh snap-y snap-mandatory overflow-y-scroll overscroll-contain bg-[var(--bg)] text-[var(--fg)]"
>

        {/* HERO */}
       <section
  id="hero"
  className="snap-start min-h-[100svh] md:h-dvh relative overflow-hidden px-4 md:px-6 pt-14 pb-2 md:pt-16 md:pb-0 grid items-start md:items-center"
>
  {/* Background — absolutely positioned and forced behind via zIndex:-1 */}
  <MatrixBackground />

  {/* Foreground content — ensure above the background */}
  <div className="relative z-[2] mx-auto w-full max-w-7xl">
    <HeroSplit theme={theme} />
  </div>
</section>



        {/* ABOUT ME */}
        <SectionBlock
          id="about"
          activeId={activeId}
          hasScrolled={hasScrolled}
          title="About Me"
          bodyText={aboutCopy}
          bodyEffect="fade"
        />

        {/* WHAT I DO */}
        <SectionBlock id="what-i-do" activeId={activeId} hasScrolled={hasScrolled} title="What I Do" >
          <WhatIDo />
        </SectionBlock>

        {/* EXPERIENCE */}
        <SectionBlock id="experience" activeId={activeId} hasScrolled={hasScrolled} title="Experience">
          <ExperienceTimeline />
        </SectionBlock>

        {/* PROJECTS */}
        <SectionBlock id="projects" activeId={activeId} hasScrolled={hasScrolled} title="Projects">
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
        <SectionBlock id="skills" activeId={activeId} hasScrolled={hasScrolled} title="Skills">
          <div className="mx-auto max-w-5xl">
            <div className="mt-10 flex flex-wrap gap-3">
              {["React", "Next.js", "Tailwind", "Python", "Alteryx", "Tableau", "APIs", "Automation", "Leadership"].map(
                s => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
        </SectionBlock>

        {/* CONTACT */}
        <SectionBlock id="contact" activeId={activeId} hasScrolled={hasScrolled} title="Contact" bodyEffect="fade">
          <div className="mx-auto max-w-3xl">
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a href="mailto:namans0297@gmail.com" className="contact-card contact-email group">
                <Mail className="contact-icon" />
                <div className="contact-text">
                  <div className="contact-title">Email</div>
                  <div className="contact-sub group-hover:text-[var(--fg)]">namans0297@gmail.com</div>
                </div>
                
              </a>

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
                {/* <ExternalLink className="ml-auto h-4 w-4 opacity-60 group-hover:opacity-100" />
                <span className="badge">Preferred</span> */}
              </a>
            </div>

            <p className="mt-6 text-center text-sm text-[var(--muted)]">
              I respond fastest on Email. LinkedIn works great for conversations.
            </p>
          </div>
        </SectionBlock>
      </main>

      <CodePeepOverlay open={codeOpen} code={pageCode} />
    </>
  )
}
