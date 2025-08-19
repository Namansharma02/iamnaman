"use client"

import { motion, useInView } from "framer-motion"
import { useMemo, useRef } from "react"

export default function FloatHeading({
  text,
  className = "section-title text-6xl md:text-7xl font-extrabold text-center",
  duration = 0.3,
  stagger = 0.01,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" })

  const chars = useMemo(() => {
    const s = typeof text === "string" ? text : ""
    return s.split("").map(ch => (ch === " " ? "\u00A0" : ch))
  }, [text])

  return (
    <h2 ref={ref} className={className} aria-label={typeof text === "string" ? text : undefined}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: "120%", scaleY: 2.1, scaleX: 0.8 }}
          animate={inView ? { opacity: 1, y: "0%", scaleY: 1, scaleX: 1 } : {}}
          transition={{ duration, delay: i * stagger, ease: "easeOut" }}
        >
          {ch}
        </motion.span>
      ))}
    </h2>
  )
}
