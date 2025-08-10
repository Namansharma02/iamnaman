"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, animate } from 'framer-motion'
import GreetingHero from './GreetingHero'

export default function HeroDesktop({ imgSrc = "/naman-avatar.png", imgAlt = "Profile" }) {
  const containerRef = useRef(null)
  const x = useMotionValue(0)

  const maxShift = 10

  const onMouseMove = e => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (e.clientX - rect.left) / rect.width
    const target = (ratio - 0.5) * 2 * maxShift
    animate(x, target, { type: 'spring', stiffness: 140, damping: 20 })
  }

  const onMouseLeave = () => animate(x, 0, { type: 'spring', stiffness: 140, damping: 20 })

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="grid items-center gap-10 grid-cols-2"
    >
      <div className="text-left">
        <GreetingHero />
      </div>

      {/* Lift avatar above the code overlay */}
      <motion.div style={{ x }} className="justify-self-center relative z-[70]">
        <div className="relative md:w-[660px] md:h-[660px] lg:w-[820px] lg:h-[820px]">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 1024px) 660px, 820px"
            priority
            style={{ objectFit: 'contain' }}
            className="drop-shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
          />
        </div>
      </motion.div>
    </div>
  )
}