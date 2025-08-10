"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ShimmerText({ text, className = '', duration = 900, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.22, delay: delay / 1000 }}
      className={`shimmer-wrap ${className}`}
    >
      <span className="relative z-10 whitespace-pre-line">{text}</span>
      {inView && (
        <span
          className="shimmer-bar"
          style={{ animationDuration: `${duration}ms`, animationDelay: `${delay}ms` }}
          aria-hidden="true"
        />
      )}
    </motion.p>
  )
}