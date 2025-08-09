'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code, BarChart3, Users } from 'lucide-react'

const items = [
  {
    title: 'Automation',
    icon: <Code className="h-6 w-6 text-blue-400" />,
    body: 'I build and innovate automations. From Python, Java, Alteryx, Tableau, UiPath and SQL, if it’s repetitive, error-prone, or painfully slow, I’ll make it run itself.'
  },
  {
    title: 'Analytics',
    icon: <BarChart3 className="h-6 w-6 text-green-400" />,
    body: 'Data should speak for itself. I design ETL architectures and Tableau dashboards that cut through the noise, give decision makers clarity, and save hundreds of hours a year.'
  },
  {
    title: 'Enablement',
    icon: <Users className="h-6 w-6 text-purple-400" />,
    body: 'I don’t just build, I scale. I train 200+ professionals each quarter so teams can own, run, and grow the systems I create.'
  }
]

export default function WhatIDo() {
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const fullText = 'What I Do'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(prev => prev + fullText[i])
      i++
      if (i === fullText.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 70) // speed in ms
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="what-i-do" className="relative mx-auto max-w-6xl px-6 py-24 scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-10">
        {text}
        {!done && <span className="typing-caret">|</span>}
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur hover:bg-white/[0.06] transition-colors"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-neutral-300">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
