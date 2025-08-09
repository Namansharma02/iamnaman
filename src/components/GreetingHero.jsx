'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function GreetingHero() {
  const parts = ['Hey,', 'I', 'am', 'Naman.']         // types word by word
  const charDelay = 50                               // ms per character
  const gapBetweenWords = 50                         // pause between words

  const [text, setText] = useState('')               // what’s visible
  const [done, setDone] = useState(false)            // when typing finishes

  useEffect(() => {
    let cancelled = false

    async function typeAll() {
      let current = ''
      for (let i = 0; i < parts.length; i++) {
        const word = parts[i]
        for (let c = 0; c < word.length; c++) {
          if (cancelled) return
          current += word[c]
          setText(current)
          await new Promise(r => setTimeout(r, charDelay))
        }
        if (i < parts.length - 1) {
          current += ' '
          setText(current)
          await new Promise(r => setTimeout(r, gapBetweenWords))
        }
      }
      setDone(true)
    }

    typeAll()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-40 pb-28 text-center md:pt-48 md:pb-36">
      
      {/* <p className="mb-3 text-sm tracking-widest text-emerald-300/90">WELCOME</p> */}

      {/* typing line */}
      <h1
        className=" font-bold leading-tight md:text-9xl"
        aria-live="polite"
        aria-label="Hey, I am Naman"
      >
        <span>{text}</span>
        <span className="typing-caret" aria-hidden="true">|</span>
      </h1>

      {/* tagline */}
      {/* <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 12 }}
        transition={{ duration: 0.4 }}
        className="mt-4 mx-auto max-w-2xl text-lg text-neutral-300"
      >
        I automate and analyze work most teams think is out of scope. Clean systems, measurable results.
      </motion.p> */}

      {/* buttons appear after typing */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 12 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        {/* <a
          href="#experience"
          className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:translate-y-0.5 active:translate-y-1"
        >
          View experience
        </a>
        <a
          href="mailto:hello@iamnaman.in"
          className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10 hover:border-white/30"
        >
          Contact me
        </a> */}
      </motion.div>
    </section>
    
    
  )
}
