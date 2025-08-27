"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import RollingWord from "./RollingWord"

export default function HeroMobile({ imgSrc = "/naman-avatar-light.png", imgAlt = "Profile" }) {
  // States for sequential animations - same as desktop
  const [greetingText, setGreetingText] = useState("")
  const [greetingStarted, setGreetingStarted] = useState(false)
  const [greetingDone, setGreetingDone] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showTagline, setShowTagline] = useState(false)

  // Same animation sequence as desktop: Image first, then greeting, then tagline
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
    <div className="flex flex-col items-center gap-4 px-4 min-h-[85vh] justify-center">
      {/* Image appears first */}
      {showImage && (
        <motion.div
          className="w-full flex justify-center relative z-[70] order-first"
          initial={{ opacity: 0, scale: 0.3, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 0.8
          }}
        >
          <div className="relative w-[400px] h-[400px]">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              sizes="320px"
              priority
              style={{ objectFit: "contain" }}
              className="drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            />
          </div>
        </motion.div>
      )}

      {/* Greeting with typing effect - appears second */}
      <motion.div 
        className="w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: greetingStarted ? 1 : 0, y: greetingStarted ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold leading-[0.95] tracking-tight text-[clamp(48px,12vw,80px)]">
          <span className="block whitespace-nowrap min-h-[0.95em]">
            {line1 || "\u00A0"}
          </span>
          <span className="block whitespace-nowrap min-h-[0.95em]">
            {line2 || "\u00A0"}
            {greetingStarted && !greetingDone && greetingText && <span className="typing-caret ml-1">|</span>}
          </span>
        </h1>
      </motion.div>

      {/* Cooking tagline - appears last */}
      {showTagline && (
        <motion.div
          className="w-full px-2"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6
          }}
        >
          <div className="relative overflow-visible">
            <motion.div
              className="flex justify-center items-center font-mono text-[var(--muted)]"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* LEFT < */}
              <div className="flex items-center justify-center flex-shrink-0">
                <span className="leading-none text-[clamp(120px,15vw,200px)] opacity-40">&lt;</span>
              </div>

              {/* MIDDLE: two rows */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <div className="text-lg leading-tight whitespace-nowrap mb-1">
                  COOKING INNOVATION THROUGH
                </div>
                <div className="flex justify-center">
                  <span className="text-xl flex items-center justify-center px-3 py-1.5 h-12 rounded-md bg-[var(--cooking-accent)] text-white font-bold w-[240px]">
                    <RollingWord
                      words={["Technology", "Automation", "Strategy"]}
                      interval={1200}
                    />
                  </span>
                </div>
              </div>

              {/* RIGHT > */}
              <div className="flex items-center justify-center flex-shrink-0">
                <span className="leading-none text-[clamp(120px,15vw,200px)] opacity-40">&gt;</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
