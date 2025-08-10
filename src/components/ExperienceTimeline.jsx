"use client"

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
  { company: 'JPMorgan Chase', title: 'Automation Team Leader', period: 'Jul 2021 to Present', bullets: ['Lead automation / digitalization for PBA & IPB Platforms', 'Team lead of four across Python, UiPath, Alteryx, Tableau, SQL', 'Train 200 plus professionals each quarter'] },
  { company: 'Deloitte USI', title: 'Associate Analyst', period: 'Jul 2019 to Jun 2021', bullets: ['Testing and data integrity for Louisiana Health Department systems', 'COVID enhancements tested and deployed'] }
]

const listVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
}

export default function ExperienceTimeline() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 md:px-10 pb-28 content-scope">
      <div className="relative mt-2">
        {/* Left rail timeline on all sizes */}
        <div className="absolute left-4 top-0 h-full w-px bg-[color-mix(in_srgb,var(--fg)_12%,transparent)]" />

        <div className="space-y-12">
          {roles.map((r, idx) => (
            <InlineReveal key={`${r.company}-${idx}`} delay={idx * 0.05}>
              <div className="relative md:flex md:items-start md:gap-6">
                {/* Dot on the rail */}
                <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--fg)]" />

                {/* Wide horizontal card */}
                <motion.div
                  initial={{ x: 12, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45 }}
                  className="mt-6 w-full md:ml-10 rounded-2xl border border-[var(--border)] bg-[var(--translucent)] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-6 md:p-10"
                >
                  <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }} className="text-sm md:text-lg text-[var(--muted)]">{r.period}</motion.div>
                  <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.05 }} className="mt-1 text-xl md:text-3xl font-semibold">{r.title}</motion.div>
                  <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.08 }} className="text-sm md:text-lg text-[var(--muted)]">{r.company}</motion.div>

                  <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={listVariants} className="mt-4 space-y-2 text-sm md:text-lg leading-relaxed md:leading-8">
                    {r.bullets.map((b, i) => (
                      <motion.li key={`${r.company}-b-${i}`} variants={itemVariants}>{b}</motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            </InlineReveal>
          ))}
        </div>
      </div>
    </section>
  )
}