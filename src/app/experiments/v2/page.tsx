'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// DESIGN SYSTEM — Swiss × Editorial × Retro-Futuristic × Soft Brutalist
// ═══════════════════════════════════════════════════════════════

const C = {
  bg: '#faf7f2',
  bgAlt: '#f3ede4',
  white: '#ffffff',
  ink: '#2d2d2d',
  inkLight: '#4a4a4a',
  coral: '#e07a5f',
  sage: '#81b29a',
  sand: '#f2cc8f',
  lavender: '#b8b8d1',
  red: '#d64045',
  phosphor: '#39ff14',
  termBg: '#1a1a2e',
  termSurface: '#16213e',
  muted: '#8a8478',
  border: 'rgba(45,45,45,0.12)',
}

const F = {
  display: '"Fraunces", Georgia, serif',
  heading: '"Bricolage Grotesque", sans-serif',
  body: '"Schibsted Grotesk", sans-serif',
  mono: '"IBM Plex Mono", monospace',
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 22 }
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ═══════════════════════════════════════════════════════════════
// REAL DATA from content.ts
// ═══════════════════════════════════════════════════════════════

const PERSONAL = {
  name: 'Naman Sharma',
  title: 'Automation & Analytics Lead',
  email: 'namans0297@gmail.com',
  linkedin: 'https://www.linkedin.com/in/namansharma0297/',
  location: 'Mumbai, India',
  tagline: 'I cook innovation through technology, automation, and strategy.',
}

const ABOUT_TEXT = [
  `I was born curious. From painting digital art in Photoshop to writing my first lines of code, creativity has always been my compass. Today, I lead automation at JPMorgan Chase, where I transform complex challenges in trading portals and banking systems into solutions that feel almost effortless.`,
  `I don't just build or test — I innovate. I thrive in spaces that many call out of scope, turning them into possibilities and realities. My main tools are Python, Java, UiPath, Alteryx, Tableau and SQL, but my real craft is weaving them together to solve high-stakes problems at scale.`,
  `Beyond work, I'm a photographer whose lens has been featured in Lonely Planet Magazine. I'm a gamer, a movie lover who once dreamed of directing films, and a lifelong learner currently pursuing an Executive MBA at SPJIMR, India.`,
  `I believe innovation always beats excellence, because innovation redefines what excellence even means.`,
]

const EXPERIENCE = [
  {
    company: 'JP Morgan Chase',
    period: '2021 – Present',
    role: 'Automation Manager',
    summary: 'Leading automation for one of the bank\'s largest platforms. Building Python, Alteryx ETL pipelines and dashboards powering daily reporting and testing for 500+ professionals.',
    tools: ['Python', 'UiPath', 'Alteryx', 'SQL', 'Tableau'],
    color: C.coral,
  },
  {
    company: 'Deloitte USI',
    period: '2019 – 2021',
    role: 'Business Technology Analyst',
    summary: 'Worked on healthcare automation for Louisiana Department of Health. Ranked #1 among 500+ new hires nationwide.',
    tools: ['Java', 'Playwright', 'Selenium', 'SQL', 'ETL'],
    color: C.sage,
  },
  {
    company: 'SPJIMR, Mumbai',
    period: '2024 – 2026',
    role: 'Executive MBA Student',
    summary: 'Post Graduate Programme in General Management with focus on strategy, operations, finance, and organizational behavior.',
    tools: ['Strategy', 'Finance', 'Leadership', 'Analytics'],
    color: C.sand,
  },
]

const PROJECTS = [
  {
    title: 'Analytics Platform',
    role: 'Automation Lead',
    summary: 'Comprehensive analytics platform powering daily reporting for 500+ banking professionals with automated workflows and real-time dashboards.',
    timeframe: '2022 – Present',
    tools: ['Python', 'Alteryx', 'Tableau', 'SQL'],
    tags: ['Banking', 'Analytics', 'Automation'],
    image: '/projects/pmod-platform.jpg',
    color: C.coral,
  },
  {
    title: 'Project LEAP — Liquidity Reporting',
    role: 'Technical Architect',
    summary: 'AI/ML-powered system for automated liquidity reporting (LCR) that reduces manual processing time and improves regulatory compliance accuracy.',
    timeframe: '2024 – Present',
    tools: ['Python', 'Machine Learning', 'Financial Modeling'],
    tags: ['FinTech', 'Compliance', 'AI/ML'],
    image: '/projects/leap-liquidity.jpg',
    color: C.sage,
  },
  {
    title: 'Web Automation Framework',
    role: 'Lead Developer',
    summary: 'Robust web automation framework built with Playwright, providing stable regression coverage and reducing cycles across multiple banking applications.',
    timeframe: '2023 – Present',
    tools: ['Playwright', 'TypeScript', 'CI/CD'],
    tags: ['DevOps', 'Banking'],
    image: '/projects/automation-framework.jpg',
    color: C.sand,
  },
]

const SKILLS = {
  technical: {
    label: 'Languages & Tools',
    items: ['Python', 'Java', 'Alteryx', 'Playwright', 'SQL', 'JavaScript', 'UiPath', 'Tableau', 'Power BI', 'ETL Pipelines'],
  },
  finance: {
    label: 'Finance & Analytics',
    items: ['Financial Statement Analysis', 'Capital & Liquidity Metrics', 'CET1 & LCR', 'ROA, ROE, ROTCE', 'NIM & Efficiency Ratios'],
  },
  domains: {
    label: 'Core Domains',
    items: ['Automation Strategy', 'Data Engineering', 'Risk Analytics', 'Process Optimization', 'Testing Frameworks', 'Regulatory Reporting'],
  },
}

const TESTIMONIALS = [
  { text: "Naman has done a fabulous job of bringing efficiency to the frontline. Not only he is contributing to his core project but also never shies away from taking additional responsibilities. I have reached out to him on multiple occasions & every time he has delivered.", from: "S.D., Vice President", company: "JPMorgan Chase" },
  { text: "Your exceptional work in developing automation solutions for over 500 users and the broader department has been phenomenal. The help with the Tableau dashboard setup, as well as your efforts in automating the trade booking, is truly appreciated.", from: "K.T., Executive Director", company: "JPMorgan Chase" },
  { text: "Your expertise in Python, UiPath, and Alteryx is nothing short of exceptional and your assistance has been invaluable in navigating through complex challenges. You have consistently been a reliable source of guidance and support.", from: "A.B., Vice President", company: "JPMorgan Chase" },
  { text: "Your maturity and understanding in your role, especially at such a young age, are truly impressive. Your logical mind combined with your superb communication skills make you a strong player in our team.", from: "P.J., Vice President", company: "JPMorgan Chase" },
  { text: "Naman is a great asset and has demonstrated a great potential for himself. You give him the work and he will ensure it's completed with no errors. He knows his stuff to the core and always willing to help others in need.", from: "C.D., Asst. Vice President", company: "JPMorgan Chase" },
  { text: "Thank you for taking control of the work to move to automation. You grabbed the project and led it to a successful completion. I am so excited to have you leading the charge on Automation going forward.", from: "P.Z., Executive Director", company: "JPMorgan Chase" },
  { text: "Naman has been a fantastic colleague to work with and a great boon to the team. His enthusiasm, always willing to help, and out-of-box innovation solutions have helped my team out a lot through the year.", from: "W.C., Asst. Vice President", company: "JPMorgan Chase" },
  { text: "Naman, you have been instrumental, a very important cog in the wheel. I'm inspired by clarity of your thinking and your lucid and impactful solutions. There is still a lot from you that remains untapped.", from: "B.D., Vice President", company: "JPMorgan Chase" },
  { text: "Congratulations Naman, for winning the First Class Client Experience Award. This recognition is very well deserved. Thank you for being the go-to person for all reporting needs. Keep up the good work.", from: "M.S., Asst. Vice President", company: "JPMorgan Chase" },
]

const HOBBIES = [
  { title: 'Photography', desc: 'Featured in Lonely Planet Magazine and on the JPMorgan homepage.' },
  { title: 'Gaming', desc: 'Gaming on PC and PS5 for focus and strategy practice.' },
  { title: 'Cinema', desc: 'Cinema and creativity. Once aimed to direct films.' },
  { title: 'Music', desc: 'Music across classical, hip hop, and more.' },
]

const NAV = ['About', 'Experience', 'Projects', 'Skills', 'Recognition', 'Contact']

// ═══════════════════════════════════════════════════════════════
// PRIMITIVES
// ═══════════════════════════════════════════════════════════════

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  )
}

function Rule({ color = C.ink, w = '100%', h = 1 }: { color?: string; w?: string; h?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return <motion.div ref={ref} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, ease: EASE }} style={{ height: h, background: color, width: w, transformOrigin: 'left' }} />
}

function SNum({ n }: { n: string }) {
  return <span style={{ fontFamily: F.mono, fontSize: '0.72rem', letterSpacing: '0.06em', color: C.muted }}>{n}</span>
}

function Badge({ children, color = C.coral }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '4px 12px', fontFamily: F.mono, fontSize: '0.68rem',
      letterSpacing: '0.05em', textTransform: 'uppercase', background: color, color: C.white,
      border: `2px solid ${C.ink}`, boxShadow: `3px 3px 0 ${C.ink}`,
    }}>{children}</span>
  )
}

function SectionHead({ n, label, color }: { n: string; label: string; color: string }) {
  return (
    <Reveal>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <SNum n={n} />
        <Rule w="50px" color={color} h={3} />
        <span style={{ fontFamily: F.mono, fontSize: '0.7rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      </div>
    </Reveal>
  )
}

function BgNum({ n, side = 'right' }: { n: string; side?: 'left' | 'right' }) {
  return (
    <div style={{
      position: 'absolute', [side]: -20, top: '50%', transform: 'translateY(-50%)',
      fontFamily: F.mono, fontSize: 'clamp(140px, 18vw, 280px)', fontWeight: 100,
      color: C.ink, opacity: 0.025, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
    }}>{n}</div>
  )
}

function useCounter(end: number, inView: boolean, dur = 1800) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = Date.now()
    const id = setInterval(() => {
      const p = Math.min((Date.now() - t0) / dur, 1)
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * end))
      if (p >= 1) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [end, inView, dur])
  return v
}

function Terminal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: C.termBg, border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, fontFamily: F.mono, fontSize: '0.78rem', overflow: 'hidden' }}>
      <div style={{ background: C.termSurface, borderBottom: `2px solid ${C.ink}`, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.coral }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.sand }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.sage }} />
        <span style={{ color: C.muted, fontSize: '0.68rem', marginLeft: 6 }}>{title}</span>
      </div>
      <div style={{ padding: '14px 16px', color: C.phosphor, lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

function TLine({ p = '$', children, c = C.phosphor }: { p?: string; children: React.ReactNode; c?: string }) {
  return <div><span style={{ color: C.sage, marginRight: 8 }}>{p}</span><span style={{ color: c }}>{children}</span></div>
}

function Marquee({ text, color, dir = 'left' }: { text: string; color: string; dir?: 'left' | 'right' }) {
  const items = Array(14).fill(text)
  return (
    <div style={{ overflow: 'hidden', background: color, borderTop: `3px solid ${C.ink}`, borderBottom: `3px solid ${C.ink}`, padding: '9px 0' }}>
      <motion.div animate={{ x: dir === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {items.map((t, i) => (
          <span key={i} style={{ fontFamily: F.heading, fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.ink, padding: '0 24px' }}>{t}</span>
        ))}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  const go = useCallback((id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }, [])

  return (
    <>
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: EASE }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? C.bg : 'transparent', borderBottom: scrolled ? `3px solid ${C.ink}` : '3px solid transparent', transition: 'background .3s, border-color .3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
          <motion.div whileHover={{ rotate: -3 }} transition={SPRING}
            style={{ width: 38, height: 38, background: C.ink, color: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 900, fontSize: '1.15rem', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>N</motion.div>
          <div className="nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {NAV.map(n => (
              <motion.button key={n} onClick={() => go(n.toLowerCase())} whileHover={{ y: -2 }} transition={SPRING}
                style={{ fontFamily: F.mono, fontSize: '0.72rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: C.ink, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', borderBottom: '2px solid transparent' }}
                onMouseEnter={e => (e.currentTarget.style.borderBottomColor = C.coral)} onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'transparent')}>{n}</motion.button>
            ))}
          </div>
          <button className="nav-mobile" onClick={() => setOpen(!open)}
            style={{ background: 'none', border: `3px solid ${C.ink}`, width: 38, height: 38, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', boxShadow: `3px 3px 0 ${C.ink}` }}>
            <span style={{ width: 16, height: 2, background: C.ink, transition: 'all .3s', transform: open ? 'rotate(45deg) translateY(6px)' : '' }} />
            <span style={{ width: 16, height: 2, background: C.ink, transition: 'all .3s', opacity: open ? 0 : 1 }} />
            <span style={{ width: 16, height: 2, background: C.ink, transition: 'all .3s', transform: open ? 'rotate(-45deg) translateY(-6px)' : '' }} />
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: 60, left: 0, right: 0, background: C.bg, borderBottom: `3px solid ${C.ink}`, zIndex: 99, padding: 24 }}>
            {NAV.map((n, i) => (
              <motion.button key={n} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}
                onClick={() => go(n.toLowerCase())}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: F.heading, fontSize: '1.1rem', fontWeight: 700, color: C.ink, background: 'none', border: 'none', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.coral, marginRight: 10 }}>0{i + 1}</span>{n}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <motion.section ref={ref} style={{ y, opacity: op, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '110px 24px 50px' }}>
      {/* Swiss grid bg */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none' }}>
        {Array.from({ length: 13 }).map((_, i) => <div key={`v${i}`} style={{ position: 'absolute', left: `${(i / 12) * 100}%`, top: 0, bottom: 0, width: 1, background: C.ink }} />)}
        {Array.from({ length: 20 }).map((_, i) => <div key={`h${i}`} style={{ position: 'absolute', top: `${i * 5}%`, left: 0, right: 0, height: 1, background: C.ink }} />)}
      </div>
      <BgNum n="00" side="right" />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <SNum n="00" /><Rule w="50px" color={C.coral} h={3} />
            <span style={{ fontFamily: F.mono, fontSize: '0.72rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Portfolio 2025</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 style={{ fontFamily: F.display, fontSize: 'clamp(3.2rem, 10vw, 8.5rem)', fontWeight: 900, lineHeight: 0.92, color: C.ink, fontStyle: 'italic' }}>Naman</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <h1 style={{ fontFamily: F.display, fontSize: 'clamp(3.2rem, 10vw, 8.5rem)', fontWeight: 900, lineHeight: 0.92, color: C.ink, marginBottom: 28 }}>
            Sharma<span style={{ color: C.coral }}>.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.28}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 36 }}>
            <Badge color={C.coral}>Finance</Badge>
            <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.muted }}>×</span>
            <Badge color={C.sage}>Technology</Badge>
            <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.muted }}>×</span>
            <Badge color={C.sand}>Automation</Badge>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 36 }}>
          <Reveal delay={0.36}>
            <div style={{ borderLeft: `4px solid ${C.coral}`, paddingLeft: 22 }}>
              <p style={{ fontFamily: F.display, fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.6, color: C.inkLight }}>
                &ldquo;{PERSONAL.tagline}&rdquo;
              </p>
              <div style={{ marginTop: 14 }}>
                <Rule color={C.border} />
                <p style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.muted, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {PERSONAL.title} &middot; Ex-JPMorgan &middot; Ex-Deloitte &middot; MBA @ SPJIMR
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.44}>
            <Terminal title="naman@portfolio:~">
              <TLine>cat intro.txt</TLine>
              <TLine p=">" c={C.sand}>Automation Manager → MBA Candidate</TLine>
              <TLine p=">" c={C.sand}>500+ professionals rely on my dashboards</TLine>
              <TLine p=">" c={C.sand}>Lonely Planet featured photographer</TLine>
              <div style={{ marginTop: 6 }}>
                <TLine>echo $STATUS</TLine>
                <TLine p="">{`● Open to opportunities — ${PERSONAL.location}`}</TLine>
              </div>
            </Terminal>
          </Reveal>
        </div>

        <Reveal delay={0.56}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Rule w="36px" color={C.muted} />
            <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll to explore</span>
            <span style={{ fontFamily: F.mono, color: C.coral }}>↓</span>
          </motion.div>
        </Reveal>
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════

function StatCard({ stat: s, index: i, inView }: { stat: { v: number; s: string; l: string; c: string }; index: number; inView: boolean }) {
  const count = useCounter(s.v, inView)
  return (
    <Reveal delay={0.12 + i * 0.06}>
      <motion.div whileHover={{ y: -4, rotate: -1 }} transition={SPRING}
        style={{ border: `3px solid ${C.ink}`, boxShadow: `4px 4px 0 ${C.ink}`, padding: '18px 14px', background: C.white, cursor: 'default' }}>
        <div style={{ fontFamily: F.mono, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: s.c, lineHeight: 1 }}>{count}{s.s}</div>
        <div style={{ fontFamily: F.mono, fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: C.muted, marginTop: 6 }}>{s.l}</div>
      </motion.div>
    </Reveal>
  )
}

function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const stats = [
    { v: 4, s: '+', l: 'Years Experience', c: C.coral },
    { v: 44, s: '', l: 'Testimonials', c: C.sage },
    { v: 500, s: '+', l: 'Users Served', c: C.sand },
    { v: 1, s: 'st', l: 'Rank at Deloitte', c: C.lavender },
  ]

  return (
    <section id="about" ref={ref} style={{ padding: '90px 24px', position: 'relative' }}>
      <BgNum n="01" side="left" />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead n="01" label="About" color={C.coral} />
        <Reveal delay={0.08}>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, color: C.ink, marginBottom: 40, fontStyle: 'italic', maxWidth: 650 }}>
            The person behind the <span style={{ color: C.coral, textDecoration: 'underline', textDecorationThickness: 3, textUnderlineOffset: 6 }}>automation</span>
          </h2>
        </Reveal>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14, marginBottom: 50 }}>
          {stats.map((s, i) => (
            <StatCard key={s.l} stat={s} index={i} inView={inView} />
          ))}
        </div>

        {/* Bio grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 36 }}>
          <Reveal delay={0.25}>
            <div>
              <p style={{ fontFamily: F.body, fontSize: '0.98rem', lineHeight: 1.8, color: C.inkLight }}>
                <span style={{ fontFamily: F.display, fontSize: '3.2rem', fontWeight: 900, float: 'left', lineHeight: 0.82, marginRight: 8, marginTop: 4, color: C.coral }}>I</span>
                {ABOUT_TEXT[0]}
              </p>
              {ABOUT_TEXT.slice(1).map((t, i) => (
                <p key={i} style={{ fontFamily: F.body, fontSize: '0.98rem', lineHeight: 1.8, color: C.inkLight, marginTop: 18 }}>{t}</p>
              ))}
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.32}>
              <div style={{ borderLeft: `4px solid ${C.sage}`, paddingLeft: 22, marginBottom: 28 }}>
                <p style={{ fontFamily: F.display, fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.5, color: C.ink }}>
                  &ldquo;Innovation always beats excellence, because innovation redefines what excellence even means.&rdquo;
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.38}>
              <Terminal title="naman@hobbies:~">
                <TLine>ls ~/interests/</TLine>
                {HOBBIES.map(h => <TLine key={h.title} p=">" c={C.sand}>{h.title} — {h.desc}</TLine>)}
              </Terminal>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// EXPERIENCE
// ═══════════════════════════════════════════════════════════════

function Exp() {
  return (
    <section id="experience" style={{ padding: '90px 24px', background: C.bgAlt, position: 'relative' }}>
      <BgNum n="02" side="right" />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead n="02" label="Experience" color={C.sage} />
        <Reveal delay={0.08}>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, color: C.ink, marginBottom: 40, fontStyle: 'italic', maxWidth: 650 }}>
            Where strategy meets <span style={{ color: C.sage }}>execution</span>
          </h2>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.company} delay={0.12 + i * 0.1}>
              <motion.div whileHover={{ y: -4, rotate: i % 2 === 0 ? -0.5 : 0.5 }} transition={SPRING}
                style={{ border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, background: C.white, overflow: 'hidden', cursor: 'default' }}>
                <div style={{ background: e.color, borderBottom: `3px solid ${C.ink}`, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700, color: C.white }}>{e.period}</span>
                  <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: 'rgba(255,255,255,.8)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{e.role}</span>
                </div>
                <div style={{ padding: 22 }}>
                  <h3 style={{ fontFamily: F.heading, fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)', fontWeight: 800, color: C.ink, marginBottom: 4 }}>{e.company}</h3>
                  <Rule color={C.border} />
                  <p style={{ fontFamily: F.body, fontSize: '0.92rem', lineHeight: 1.7, color: C.inkLight, marginTop: 14, marginBottom: 18 }}>{e.summary}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {e.tools.map(t => (
                      <span key={t} style={{ fontFamily: F.mono, fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '3px 9px', border: `2px solid ${C.ink}`, boxShadow: `2px 2px 0 ${C.ink}`, background: C.bg, color: C.ink }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════

function Projects() {
  return (
    <section id="projects" style={{ padding: '90px 24px', position: 'relative' }}>
      <BgNum n="03" side="left" />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead n="03" label="Projects" color={C.sand} />
        <Reveal delay={0.08}>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, color: C.ink, marginBottom: 40, fontStyle: 'italic', maxWidth: 650 }}>
            Things I&apos;ve <span style={{ color: C.sand }}>built</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={0.12 + i * 0.08}>
              <motion.div whileHover={{ y: -6, rotate: i === 1 ? 0.5 : -0.5 }} transition={SPRING}
                style={{ border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, background: C.white, overflow: 'hidden', height: '100%', cursor: 'default', display: 'flex', flexDirection: 'column' }}>
                {/* Project image placeholder */}
                <div style={{ height: 160, background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, borderBottom: `3px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontFamily: F.display, fontSize: '2.5rem', fontWeight: 900, color: p.color, opacity: 0.3 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ position: 'absolute', top: 10, right: 10 }}><Badge color={p.color}>{p.timeframe}</Badge></div>
                </div>
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: F.mono, fontSize: '0.63rem', color: p.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{p.role}</div>
                  <h3 style={{ fontFamily: F.heading, fontSize: '1.15rem', fontWeight: 800, color: C.ink, marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontFamily: F.body, fontSize: '0.88rem', lineHeight: 1.65, color: C.inkLight, marginBottom: 16, flex: 1 }}>{p.summary}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {p.tools.map(t => (
                      <span key={t} style={{ fontFamily: F.mono, fontSize: '0.6rem', textTransform: 'uppercase', padding: '3px 8px', border: `2px solid ${C.ink}`, boxShadow: `2px 2px 0 ${C.ink}`, background: C.bg, color: C.ink }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════════════════════

function SkillsSection() {
  const cats = [
    { ...SKILLS.technical, color: C.coral, n: '01' },
    { ...SKILLS.finance, color: C.sage, n: '02' },
    { ...SKILLS.domains, color: C.sand, n: '03' },
  ]
  return (
    <section id="skills" style={{ padding: '90px 24px', background: C.bgAlt, position: 'relative' }}>
      <BgNum n="04" side="right" />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead n="04" label="Skills" color={C.lavender} />
        <Reveal delay={0.08}>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, color: C.ink, marginBottom: 40, fontStyle: 'italic', maxWidth: 650 }}>
            Tools of the <span style={{ color: C.lavender }}>trade</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 22 }}>
          {cats.map((cat, i) => (
            <Reveal key={cat.label} delay={0.12 + i * 0.08}>
              <motion.div whileHover={{ y: -4, rotate: i === 1 ? 0.5 : -0.5 }} transition={SPRING}
                style={{ border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, background: C.white, overflow: 'hidden', height: '100%', cursor: 'default' }}>
                <div style={{ background: cat.color, borderBottom: `3px solid ${C.ink}`, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: F.heading, fontSize: '0.85rem', fontWeight: 800, color: C.white, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cat.label}</span>
                  <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: 'rgba(255,255,255,.7)' }}>{cat.n}</span>
                </div>
                <div style={{ padding: 18, display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {cat.items.map(s => (
                    <motion.span key={s} whileHover={{ y: -2, boxShadow: `3px 3px 0 ${C.ink}` }}
                      style={{ fontFamily: F.mono, fontSize: '0.68rem', padding: '5px 11px', border: `2px solid ${C.ink}`, boxShadow: `2px 2px 0 ${C.ink}`, background: C.bg, color: C.ink, cursor: 'default', letterSpacing: '0.02em' }}>{s}</motion.span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// RECOGNITION
// ═══════════════════════════════════════════════════════════════

function Recognition() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCounter(44, inView)
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage)
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="recognition" ref={ref} style={{ padding: '90px 24px', position: 'relative' }}>
      <BgNum n="05" side="left" />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead n="05" label="Recognition" color={C.coral} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 18, marginBottom: 40 }}>
          <Reveal delay={0.08}>
            <span style={{ fontFamily: F.mono, fontSize: 'clamp(3.5rem, 9vw, 7rem)', fontWeight: 700, color: C.coral, lineHeight: 1 }}>{count}</span>
          </Reveal>
          <Reveal delay={0.14}>
            <h2 style={{ fontFamily: F.display, fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 900, lineHeight: 1.1, color: C.ink, fontStyle: 'italic' }}>
              colleagues wrote these<span style={{ color: C.coral }}>.</span>
            </h2>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 22 }}>
          <AnimatePresence mode="wait">
            {visible.map((t, i) => (
              <motion.div key={`${page}-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <motion.div whileHover={{ y: -4, rotate: i === 1 ? 0.5 : -0.5 }} transition={SPRING}
                  style={{ border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, background: C.white, padding: '28px 22px', position: 'relative', cursor: 'default', height: '100%' }}>
                  <span style={{ position: 'absolute', top: 10, left: 14, fontFamily: F.display, fontSize: '3.5rem', color: [C.coral, C.sage, C.sand][i % 3], opacity: 0.15, lineHeight: 1, pointerEvents: 'none' }}>&ldquo;</span>
                  <p style={{ fontFamily: F.display, fontSize: '0.92rem', fontStyle: 'italic', lineHeight: 1.7, color: C.inkLight, marginBottom: 18, position: 'relative', zIndex: 1 }}>{t.text}</p>
                  <Rule color={C.border} />
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: F.heading, fontSize: '0.82rem', fontWeight: 700, color: C.ink }}>{t.from}</div>
                      <div style={{ fontFamily: F.mono, fontSize: '0.62rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t.company}</div>
                    </div>
                    <Badge color={[C.coral, C.sage, C.sand][i % 3]}>#{String(page * perPage + i + 1).padStart(2, '0')}</Badge>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 32 }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button key={i} onClick={() => setPage(i)} whileHover={{ y: -2 }} transition={SPRING}
                style={{
                  width: 36, height: 36, fontFamily: F.mono, fontSize: '0.72rem', fontWeight: 700,
                  border: `2px solid ${C.ink}`, boxShadow: page === i ? `3px 3px 0 ${C.ink}` : 'none',
                  background: page === i ? C.coral : C.white, color: page === i ? C.white : C.ink, cursor: 'pointer',
                }}>
                {i + 1}
              </motion.button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════

function Contact() {
  return (
    <section id="contact" style={{ padding: '90px 24px', background: C.bgAlt, position: 'relative' }}>
      <BgNum n="06" side="right" />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHead n="06" label="Contact" color={C.sage} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 40 }}>
          <div>
            <Reveal delay={0.08}>
              <h2 style={{ fontFamily: F.display, fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, color: C.ink, marginBottom: 20, fontStyle: 'italic' }}>
                Let&apos;s build something <span style={{ color: C.coral }}>remarkable</span><span style={{ color: C.sage }}>.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.8, color: C.inkLight, marginBottom: 28, maxWidth: 480 }}>
                If my work and story resonate with you, I&apos;d love to connect. Whether it&apos;s about automation strategy, financial technology, or your next ambitious project.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <motion.a href={`mailto:${PERSONAL.email}`} whileHover={{ y: -3, rotate: -1, boxShadow: `7px 7px 0 ${C.ink}` }} whileTap={{ scale: 0.97 }} transition={SPRING}
                  style={{ display: 'inline-block', fontFamily: F.heading, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '13px 26px', background: C.coral, color: C.white, border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, textDecoration: 'none', cursor: 'pointer' }}>
                  Send Email →
                </motion.a>
                <motion.a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, rotate: 1, boxShadow: `7px 7px 0 ${C.ink}` }} whileTap={{ scale: 0.97 }} transition={SPRING}
                  style={{ display: 'inline-block', fontFamily: F.heading, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '13px 26px', background: C.sage, color: C.white, border: `3px solid ${C.ink}`, boxShadow: `5px 5px 0 ${C.ink}`, textDecoration: 'none', cursor: 'pointer' }}>
                  LinkedIn ↗
                </motion.a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.28}>
            <Terminal title="naman@connect:~">
              <TLine>cat contact.json</TLine>
              <div style={{ color: C.phosphor, marginTop: 4 }}>{'{'}</div>
              <div style={{ paddingLeft: 18 }}>
                <span style={{ color: C.sand }}>&quot;email&quot;</span><span style={{ color: C.muted }}>: </span><span style={{ color: C.sage }}>&quot;{PERSONAL.email}&quot;</span><span style={{ color: C.muted }}>,</span>
              </div>
              <div style={{ paddingLeft: 18 }}>
                <span style={{ color: C.sand }}>&quot;linkedin&quot;</span><span style={{ color: C.muted }}>: </span><span style={{ color: C.sage }}>&quot;/in/namansharma0297&quot;</span><span style={{ color: C.muted }}>,</span>
              </div>
              <div style={{ paddingLeft: 18 }}>
                <span style={{ color: C.sand }}>&quot;location&quot;</span><span style={{ color: C.muted }}>: </span><span style={{ color: C.sage }}>&quot;{PERSONAL.location}&quot;</span><span style={{ color: C.muted }}>,</span>
              </div>
              <div style={{ paddingLeft: 18 }}>
                <span style={{ color: C.sand }}>&quot;status&quot;</span><span style={{ color: C.muted }}>: </span><span style={{ color: C.phosphor }}>&quot;● Open to opportunities&quot;</span>
              </div>
              <div style={{ color: C.phosphor }}>{'}'}</div>
              <div style={{ marginTop: 10 }}>
                <TLine>echo &quot;Looking forward to connecting!&quot;</TLine>
                <TLine p="">Looking forward to connecting!</TLine>
              </div>
            </Terminal>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer style={{ background: C.ink, padding: '36px 24px', borderTop: `3px solid ${C.ink}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: F.heading, fontSize: '0.95rem', fontWeight: 800, color: C.bg }}>Naman Sharma</span>
          <span style={{ fontFamily: F.mono, fontSize: '0.68rem', color: C.muted }}>© {new Date().getFullYear()}</span>
        </div>
        <div style={{ fontFamily: F.mono, fontSize: '0.65rem', color: C.muted, letterSpacing: '0.04em' }}>
          DESIGNED WITH PURPOSE
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

export default function V2Portfolio() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700;1,9..144,900&family=Bricolage+Grotesque:wght@400;600;700;800&family=Schibsted+Grotesk:wght@400;500;600&family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.ink}; font-family: ${F.body}; overflow-x: hidden; }
        ::selection { background: ${C.coral}; color: ${C.white}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.ink}; border: 1px solid ${C.bg}; }
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
        @media (min-width: 769px) { .nav-mobile { display: none !important; } }
      `}</style>

      {/* Scanline texture */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(45,45,45,0.012) 2px, rgba(45,45,45,0.012) 4px)' }} />

      {/* Scroll progress */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: C.coral, scaleX: scrollYProgress, transformOrigin: 'left', zIndex: 101 }} />

      <Nav />
      <Hero />
      <Marquee text="THINK ● PLAN ● EXECUTE ● AUTOMATE ● INNOVATE" color={C.coral} dir="left" />
      <About />
      <Marquee text="JPMORGAN CHASE ● DELOITTE ● SPJIMR ● FINANCE × TECHNOLOGY" color={C.sage} dir="right" />
      <Exp />
      <Projects />
      <Marquee text="PYTHON ● SQL ● UIPATH ● ALTERYX ● TABLEAU ● PLAYWRIGHT ● JAVA ● POWER BI" color={C.sand} dir="left" />
      <SkillsSection />
      <Recognition />
      <Marquee text="44 TESTIMONIALS ● LONELY PLANET FEATURED ● FIRST CLASS CLIENT EXPERIENCE AWARD" color={C.lavender} dir="right" />
      <Contact />
      <Footer />
    </>
  )
}
