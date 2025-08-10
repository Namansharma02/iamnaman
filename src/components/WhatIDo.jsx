"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, BarChart3, Users } from 'lucide-react'

const items = [
  { key: 'automation', title: 'Automation', icon: Code, color: 'text-blue-400', body: 'I build and innovate automations. From Python, Java, Alteryx, Tableau, UiPath and SQL, if it’s repetitive, error-prone, or painfully slow, I’ll make it run itself.' },
  { key: 'analytics', title: 'Analytics', icon: BarChart3, color: 'text-green-400', body: 'Data should speak for itself. I design ETL architectures and Tableau dashboards that cut through the noise, give decision makers clarity, and save hundreds of hours a year.' },
  { key: 'enablement', title: 'Enablement', icon: Users, color: 'text-purple-400', body: 'I don’t just build, I scale. I train 200+ professionals each quarter so teams can own, run, and grow the systems I create.' }
]

export default function WhatIDo() {
  const [sel, setSel] = useState(0)
  const active = items[sel]

  return (
    <section className="relative mx-auto max-w-7xl px-4 md:px-10 py-12 md:py-24 content-scope">
      {/* Buttons on all breakpoints */}
      <div role="tablist" aria-label="What I Do" className="flex items-center justify-center gap-2 md:gap-4">
        {items.map((it, i) => {
          const Icon = it.icon
          const isActive = i === sel
          return (
            <button
              key={it.key}
              id={`tab-${it.key}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${it.key}`}
              onClick={() => setSel(i)}
              className={`flex flex-col items-center justify-center rounded-xl border px-3 py-2 md:px-4 md:py-3 transition ${isActive ? 'bg-[color-mix(in_srgb,var(--fg)_8%,transparent)] border-[var(--fg)] text-[var(--fg)]' : 'border-[var(--border)] text-[var(--muted)]'}`}
            >
              <Icon className={`h-5 w-5 md:h-6 md:w-6 ${it.color}`} />
              <span className="mt-1 text-xs md:text-sm font-medium">{it.title}</span>
            </button>
          )
        })}
      </div>

      {/* Snappy fade panel */}
      <motion.div
        key={active.key}
        id={`tab-panel-${active.key}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.key}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6 md:mt-8 rounded-2xl border border-[var(--border)] bg-[var(--translucent)] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-6 md:p-12 mx-auto max-w-5xl text-center"
      >
        <div className="text-lg md:text-3xl font-semibold mb-3 md:mb-4">{active.title}</div>
        <p className="text-sm md:text-xl text-[var(--muted)] leading-relaxed md:leading-8">{active.body}</p>
      </motion.div>
    </section>
  )
}