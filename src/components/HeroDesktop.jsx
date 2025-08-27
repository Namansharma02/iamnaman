"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, animate } from "framer-motion"
import StraightMarquee from "./StraightMarquee"

export default function HeroDesktop({ imgSrc = "/naman-avatar-light.png", imgAlt = "Profile" }) {
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const maxShift = 10
  
  // New layout states
  const [showImage, setShowImage] = useState(false)
  const [showHey, setShowHey] = useState(false)
  const [showInnovation, setShowInnovation] = useState(false)
  const [showMarquee, setShowMarquee] = useState(false)
  
  // Dynamic word typing states
  const [currentWord, setCurrentWord] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTypingWord, setIsTypingWord] = useState(false)
  const wordIndexRef = useRef(0)
  
  const words = ["Automation", "Technology", "Strategy"]

  // Mouse parallax effect
  const onMouseMove = e => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (e.clientX - rect.left) / rect.width
    const target = (ratio - 0.5) * 2 * maxShift
    animate(x, target, { type: "spring", stiffness: 140, damping: 20 })
  }
  const onMouseLeave = () => animate(x, 0, { type: "spring", stiffness: 140, damping: 20 })

  // Animation sequence
  useEffect(() => {
    // Straight marquee appears first (behind everything)
    setTimeout(() => setShowMarquee(true), 100)
    // Image appears
    setTimeout(() => setShowImage(true), 500)
    // Hey appears
    setTimeout(() => setShowHey(true), 900)
    // Innovation text appears and starts typing
    setTimeout(() => {
      setShowInnovation(true)
      startDynamicTyping()
    }, 1300)
  }, [])

  const startDynamicTyping = async () => {
    setIsTypingWord(true)
    
    while (true) {
      const word = words[wordIndexRef.current]
      
      // Type the word
      setIsDeleting(false)
      for (let i = 0; i <= word.length; i++) {
        setCurrentWord(word.substring(0, i))
        await new Promise(resolve => setTimeout(resolve, 20))
      }
      
      // Pause before deleting
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Delete the word
      setIsDeleting(true)
      for (let i = word.length; i >= 0; i--) {
        setCurrentWord(word.substring(0, i))
        await new Promise(resolve => setTimeout(resolve, 20))
      }
      
      // Move to next word
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      await new Promise(resolve => setTimeout(resolve, 300))
    }
  }

  return (
    <>
      {/* Full-width background marquee */}
      {showMarquee && <StraightMarquee text="Naman Sharma" speed={0.08} direction="left" />}
      
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative grid grid-cols-1 lg:grid-cols-3 items-end gap-8 md:gap-12 min-h-[85vh] px-8 md:px-16 lg:px-24"
      >
        {/* LEFT COLUMN: Text content - bottom-left positioned */}
        <div className="text-left space-y-6 order-2 lg:order-1 z-20 relative pb-8 lg:pb-12">
          {/* Combined single line: Hey, I cook innovation through [dynamic] */}
          {showHey && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="font-mono font-bold text-[clamp(40px,8vw,80px)] leading-[1.1] tracking-tight">
                <span className="block">Hey, </span>
                <span className="text-[clamp(24px,5vw,48px)] font-medium block">
                  I cook innovation through{" "}
                </span>
                {showInnovation && (
                  <span className="text-[var(--cooking-accent)] font-bold text-[clamp(28px,6vw,52px)] block">
                    {currentWord}
                    {isTypingWord && (
                      <span className="typing-cursor animate-pulse">|</span>
                    )}
                  </span>
                )}
              </h1>
            </motion.div>
          )}
        </div>

        {/* MIDDLE & RIGHT: Large centered image */}
        <div className="lg:col-span-2 relative flex justify-center items-center order-1 lg:order-2 min-h-[60vh] lg:min-h-[80vh] self-center">
          {/* Profile Image - Large and Centered */}
          {showImage && (
            <motion.div
              style={{ x }}
              className="relative z-30"
              initial={{ opacity: 0, scale: 0.3, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                duration: 0.8
              }}
            >
              <div className="relative w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] xl:w-[900px] xl:h-[900px]">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  sizes="(max-width: 768px) 500px, (max-width: 1024px) 650px, (max-width: 1280px) 800px, 900px"
                  priority
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
