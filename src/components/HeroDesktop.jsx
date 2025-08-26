"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, animate } from "framer-motion"
import GreetingHero from "./GreetingHero"
import RollingWord from "./RollingWord"

export default function HeroDesktop({ imgSrc = "/naman-avatar-light.png", imgAlt = "Profile" }) {
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const maxShift = 10
  const [showImage, setShowImage] = useState(false)
  const [showTagline, setShowTagline] = useState(false)

  const onMouseMove = e => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (e.clientX - rect.left) / rect.width
    const target = (ratio - 0.5) * 2 * maxShift
    animate(x, target, { type: "spring", stiffness: 140, damping: 20 })
  }
  const onMouseLeave = () => animate(x, 0, { type: "spring", stiffness: 140, damping: 20 })

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="grid items-center gap-10 grid-cols-2"
    >
      <div className="text-left">
        {/* 1) Heading types */}
        <GreetingHero
          onDone={() => {
            setShowImage(true)
            setTimeout(() => setShowTagline(true), 800)
          }}
        />



       {/* smooth push-up + fade-in tagline */}
{showTagline && (
  <motion.div
    className="mt-6 relative overflow-hidden"
    initial={{ height: 0 }}
    animate={{ height: 110 }}   // adjust px to match your design
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    <motion.div
      className="absolute inset-0 flex justify-start items-stretch font-mono text-[var(--muted)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
    >
      {/* LEFT < */}
      <div className="flex flex-col justify-center">
        <span className="leading-loose text-[clamp(10px,50vw,160px)]">&lt;</span>
      </div>

      {/* MIDDLE: two rows */}
      <div className="mx-4 flex flex-col items-center justify-center text-center">
  <div className="text-2xl leading-tight">COOKING INNOVATION THROUGH</div>
  <div className="mt-2">
    <span className="text-4xl inline-flex items-center justify-center w-90 h-12 rounded-md bg-[var(--cooking-accent)] text-white font-bold">
      <RollingWord
        words={["Technology", "Automation", "Strategy"]}
        interval={1200}
      />
    </span>
  </div>
</div>
      {/* RIGHT > */}
      <div className="flex flex-col justify-center">
        <span className="leading-none text-[clamp(10px,50vw,160px)]">&gt;</span>
      </div>
    </motion.div>
  </motion.div>
)}

      </div>

      {/* 3) Image appears with animation */}
      {showImage && (
        <motion.div
          style={{ x }}
          className="justify-self-center relative z-[70]"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="relative md:w-[660px] md:h-[660px] lg:w-[820px] lg:h-[820px]">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              sizes="(max-width: 1024px) 660px, 820px"
              priority
              style={{ objectFit: "contain" }}
              className="drop-shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
