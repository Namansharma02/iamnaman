"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import StraightMarquee from "./StraightMarquee"

export default function HeroMobile({ imgSrc = "/naman-avatar-light.png", imgAlt = "Profile" }) {
  // New mobile layout states  
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

  // Animation sequence: Marquee first, then image, then text content
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
      {showMarquee && <StraightMarquee text="Naman Sharma" speed={0.1} direction="left" />}
      
      <div className="relative flex flex-col items-center gap-6 px-6 min-h-[85vh] justify-center text-center">
        {/* Large centered image */}
        <div className="relative flex justify-center items-center w-full">
          {/* Profile Image - Large and Centered */}
          {showImage && (
            <motion.div
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
              <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  sizes="(max-width: 768px) 350px, 450px"
                  priority
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Combined single line text - shifted down to avoid banner overlap */}
        {showHey && (
          <motion.div 
            className="z-20 relative mt-8 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-mono font-bold text-[clamp(32px,8vw,60px)] leading-[1.2] tracking-tight text-center max-w-lg mx-auto">
              <span className="block">Hey, </span>
              <span className="text-[clamp(18px,5vw,32px)] font-medium block mt-2">
                I cook innovation through{" "}
              </span>
              {showInnovation && (
                <span className="text-[var(--cooking-accent)] font-bold text-[clamp(22px,6vw,36px)] block mt-2">
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
    </>
  )
}
