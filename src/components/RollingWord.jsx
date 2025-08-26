"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function RollingWord({
  words = ["Technology", "Automation", "Strategy"],
  interval = 1200,
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [interval, words.length])

  return (
    <span className="rw-box text-center">
      <span className="text-center rw-window" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={idx}
            className="rw-word text-center"
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-120%", opacity: 1 }}
            transition={{ duration: 0.20, ease: "easeOut" }}
          >
            {words[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only text-center">{words[idx]}</span>
    </span>
  )
}
