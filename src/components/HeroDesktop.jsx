"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, animate } from "framer-motion"
import RollingWord from "./RollingWord"

export default function HeroDesktop({ imgSrc = "/naman-avatar-light.png", imgAlt = "Profile" }) {
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const maxShift = 10
  
  // States for sequential animations
  const [greetingText, setGreetingText] = useState("")
  const [greetingStarted, setGreetingStarted] = useState(false)
  const [greetingDone, setGreetingDone] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showTagline, setShowTagline] = useState(false)

  // Mouse parallax effect
  const onMouseMove = e => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (e.clientX - rect.left) / rect.width
    const target = (ratio - 0.5) * 2 * maxShift
    animate(x, target, { type: "spring", stiffness: 140, damping: 20 })
  }
  const onMouseLeave = () => animate(x, 0, { type: "spring", stiffness: 140, damping: 20 })

  // Animation sequence: Image first, then greeting, then tagline
  useEffect(() => {
    // Start with image appearing with proper popup effect
    setTimeout(() => setShowImage(true), 300)
    
    // Then start greeting after image appears
    setTimeout(() => {
      startTyping()
    }, 1200)
  }, [])

  const startTyping = async () => {
    const parts = ["Hey,", "I'm", "Naman."]
    const charDelay = 20
    const gapBetweenWords = 80
    const BREAK = "\n"

    setGreetingStarted(true)
    let current = ""
    
    for (let i = 0; i < parts.length; i++) {
      const word = parts[i]
      for (let c = 0; c < word.length; c++) {
        current += word[c]
        setGreetingText(current)
        await new Promise(r => setTimeout(r, charDelay))
      }
      if (i < parts.length - 1) {
        current += i === 1 ? BREAK : " "
        setGreetingText(current)
        await new Promise(r => setTimeout(r, gapBetweenWords))
      }
    }
    setGreetingDone(true)
    // Show tagline after greeting is done
    setTimeout(() => setShowTagline(true), 600)
  }

  const [line1, line2] = greetingText.includes("\n") ? greetingText.split("\n") : [greetingText, ""]

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 md:gap-8 min-h-[85vh] px-4 md:px-8"
    >
      {/* LEFT COLUMN: Greeting with typing effect */}
      <motion.div 
        className="text-center lg:text-left lg:justify-self-end order-2 lg:order-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: greetingStarted ? 1 : 0, y: greetingStarted ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold leading-[0.95] tracking-tight text-[clamp(48px,8vw,150px)]">
          <span className="block whitespace-nowrap min-h-[0.95em]">
            {line1 || "\u00A0"}
          </span>
          <span className="block whitespace-nowrap min-h-[0.95em]">
            {line2 || "\u00A0"}
            {greetingStarted && !greetingDone && greetingText && <span className="typing-caret ml-1">|</span>}
          </span>
        </h1>
      </motion.div>

      {/* MIDDLE COLUMN: Profile Image */}
      <div className="justify-self-center relative z-[70] order-1 lg:order-2">
        {showImage && (
          <motion.div
            style={{ x }}
            initial={{ opacity: 0, scale: 0.3, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              duration: 0.8
            }}
          >
            <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]">
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 700px"
                priority
                style={{ objectFit: "contain" }}
                className="drop-shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* RIGHT COLUMN: Cooking tagline */}
      <div className="text-center lg:text-right lg:justify-self-start w-full lg:w-auto order-3 lg:order-3">
        {showTagline && (
          <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6
          }}
        >
          <div className="relative overflow-hidden">
            <motion.div
              className="flex justify-center items-stretch font-mono text-[var(--muted)]"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* LEFT < */}
              <div className="flex flex-col justify-center">
                <span className="leading-none text-[clamp(40px,9vw,200px)] opacity-40">&lt;</span>
              </div>

              {/* MIDDLE: two rows */}
              <div className="flex flex-col items-center justify-center text-center min-w-0">
                <div className="text-base md:text-xl lg:text-2xl leading-tight whitespace-nowrap mb-2">
                  COOKING INNOVATION THROUGH
                </div>
                <div className="w-full flex justify-center">
                  <span className="text-xl md:text-2xl lg:text-3xl flex items-center justify-center px-4 py-2 h-12 rounded-md bg-[var(--cooking-accent)] text-white font-bold w-[240px] md:w-[280px] lg:w-[320px]">
                    <RollingWord
                      words={["Technology", "Automation", "Strategy"]}
                      interval={1200}
                    />
                  </span>
                </div>
              </div>

              {/* RIGHT > */}
              <div className="flex flex-col justify-center">
                <span className="leading-none text-[clamp(40px,9vw,200px)] opacity-40">&gt;</span>
              </div>
            </motion.div>
          </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
