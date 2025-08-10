"use client"

import { motion } from 'framer-motion'
import { Code, BarChart3, Users } from 'lucide-react'
import TypedInView from './TypedInView'

const items = [
  { title: 'Automation', icon: <Code className="h-6 w-6 text-blue-400" />, body: 'I build and innovate automations. From Python, Java, Alteryx, Tableau, UiPath and SQL, if it’s repetitive, error-prone, or painfully slow, I’ll make it run itself.' },
  { title: 'Analytics', icon: <BarChart3 className="h-6 w-6 text-green-400" />, body: 'Data should speak for itself. I design ETL architectures and Tableau dashboards that cut through the noise, give decision makers clarity, and save hundreds of hours a year.' },
  { title: 'Enablement', icon: <Users className="h-6 w-6 text-purple-400" />, body: 'I don’t just build, I scale. I train 200+ professionals each quarter so teams can own, run, and grow the systems I create.' }
]

export default function WhatIDo() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--translucent)] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-6"
          >
            <div className="mb-4">{item.icon}</div>
            <TypedInView as="h3" className="text-lg font-semibold mb-2" text={item.title} speed={28} startDelay={80} />
            <TypedInView as="p" className="text-sm text-[var(--muted)]" text={item.body} speed={14} startDelay={220} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}