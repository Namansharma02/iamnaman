'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

function InlineReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const controls = useAnimation()
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !seen) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay } })
            setSeen(true)
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [controls, delay, seen])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={controls}>
      {children}
    </motion.div>
  )
}

const roles = [
  {
    company: 'JPMorgan Chase & Co.',
    title: 'Automation Team Leader',
    period: 'Jul 2021 to Present',
    bullets: [
      'Lead automation / digitalization for PBA & IPB Platforms',
      'Team lead of four across Python, UiPath, Alteryx, Tableau, SQL',
      'Train 200 plus professionals each quarter'
    ]
  },
  {
    company: 'Deloitte USI',
    title: 'Associate Analyst',
    period: 'Jul 2019 to Jun 2021',
    bullets: [
      'Testing and data integrity for Louisiana Health Department systems',
      'COVID enhancements tested and deployed'
    ]
  }
]

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 pb-28 text-white scroll-mt-24">
      <h2 className="text-2xl font-semibold">Experience</h2>

      <div className="relative mt-8">
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />

        <div className="space-y-10">
          {roles.map((r, idx) => (
            <InlineReveal key={`${r.company}-${idx}`} delay={idx * 0.05}>
              <div
                className={`relative md:flex md:items-start md:gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-white md:left-1/2" />
                <motion.div
                  initial={{ x: idx % 2 === 0 ? 24 : -24, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur md:w-[46%]"
                >
                  <div className="text-sm text-neutral-400">{r.period}</div>
                  <div className="mt-1 text-lg font-semibold">{r.title}</div>
                  <div className="text-neutral-300">{r.company}</div>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                    {r.bullets.map((b, i) => <li key={`${r.company}-b-${i}`}>{b}</li>)}
                  </ul>
                </motion.div>
              </div>
            </InlineReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
