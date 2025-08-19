"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function GreetingHero({ compact = false }) {
  const parts = ['Hey,', "I'm", 'Naman.']
  const charDelay = 20
  const gapBetweenWords = 50
  const BREAK = '\n' // escaped newline

  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

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
          // Force exactly 2 lines: after "I'm" insert a newline
          current += i === 1 ? BREAK : ' '
          setText(current)
          await new Promise(r => setTimeout(r, gapBetweenWords))
        }
      }
      setDone(true)
    }

    typeAll()
    return () => { cancelled = true }
  }, [])

  const hasBreak = text.includes(BREAK)
  const [line1, line2] = hasBreak ? text.split(BREAK) : [text, '']

  const sectionClasses = compact
    ? 'relative mx-auto max-w-3xl px-4 pt-8 pb-2 text-center'
    : 'relative mx-auto max-w-6xl px-6 min-h-[86vh] flex items-center justify-center text-center md:text-left pt-14 md:pt-10 pb-16'

  return (
    <section className={sectionClasses}>
      <div>
        <h1
          className="font-bold leading-[0.95] tracking-tight text-[clamp(80px,9vw,240px)]"
          aria-live="polite"
          aria-label="Hey, I'm Naman"
        >
          {hasBreak ? (
            <>
              <span className="block whitespace-nowrap">{line1}</span>
              <span className="block whitespace-nowrap">
                {line2}
                {!done && <span className="typing-caret" aria-hidden="true">|</span>}
              </span>
            </>
          ) : (
            <span className="block whitespace-nowrap">
              {line1}
              {!done && <span className="typing-caret" aria-hidden="true">|</span>}
            </span>
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 12 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Add buttons here if needed */}
        </motion.div>
      </div>
    </section>
  )
}