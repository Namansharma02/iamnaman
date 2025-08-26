"use client"

import { useEffect, useState } from "react"

export default function GreetingHero({ compact = false, onDone }) {
  // no fake newlines
  const parts = ["Hey,", "I'm", "Naman."]
  const charDelay = 30
  const gapBetweenWords = 50
  const BREAK = "\n"

  const [text, setText] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function typeAll() {
      let current = ""
      for (let i = 0; i < parts.length; i++) {
        const word = parts[i]
        for (let c = 0; c < word.length; c++) {
          if (cancelled) return
          current += word[c]
          setText(current)
          await new Promise(r => setTimeout(r, charDelay))
        }
        if (i < parts.length - 1) {
          // insert the BREAK after "I'm" to force 2 lines
          current += i === 1 ? BREAK : " "
          setText(current)
          await new Promise(r => setTimeout(r, gapBetweenWords))
        }
      }
      setDone(true)
      onDone?.()
    }
    typeAll()
    return () => { cancelled = true }
  }, []) // run once

  const [line1, line2] = text.includes(BREAK) ? text.split(BREAK) : [text, ""]

  // IMPORTANT: no vertical centering; keep content from shifting
  const sectionClasses = compact
    ? "relative mx-auto max-w-3xl px-4 pt-8 pb-2 text-center"
    : "relative mx-auto max-w-6xl px-6 flex flex-col items-start text-center md:text-left pt-14 md:pt-10 pb-0"

  return (
    <section className={sectionClasses}>
      <h1 className="font-bold leading-[0.95] tracking-tight text-[clamp(80px,9vw,150px)]">
        {/* Always render TWO lines with fixed line height to lock total height */}
        <span className="block whitespace-nowrap min-h-[0.95em]">
          {line1 || "\u00A0"}
        </span>
        <span className="block whitespace-nowrap min-h-[0.95em]">
          {line2 || "\u00A0"}
          {!done && <span className="typing-caret">|</span>}
        </span>
      </h1>
    </section>
  )
}
