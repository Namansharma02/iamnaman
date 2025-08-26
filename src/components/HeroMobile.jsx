"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import GreetingHero from "./GreetingHero"
import RollingWord from "./RollingWord"

export default function HeroMobile({ imgSrc = "/naman-avatar-light.png", imgAlt = "Profile" }) {
  const [showImage, setShowImage] = useState(false)
  const [showTagline, setShowTagline] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <div className="w-full text-center">
        <GreetingHero
          compact
          onDone={() => {
            setShowImage(true)
            setTimeout(() => setShowTagline(true), 300)
          }}
        />
      </div>

      {showImage && (
        <motion.div
          className="mt-6 mb-8 w-full flex justify-center relative z-[70]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={640}
            height={640}
            priority
            className="w-[96vw] max-w-[640px] h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      )}

      {showTagline && (
        <motion.div
          className="mt-6 relative "
          initial={{ height: 0 }}
          animate={{ height: 100 }}   // increase height for mobile readability
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 flex justify-center items-stretch font-mono text-[var(--muted)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
          >
            {/* LEFT < */}
            <div className="flex flex-col justify-center">
        <span className="leading-none text-[clamp(10px,50vw,160px)]">&lt;</span>
      </div>

            {/* MIDDLE: two rows */}
            <div className="mx-4  flex-col items-center justify-center text-center">
              <div className="text-xl leading-tight">COOKING INNOVATION THROUGH</div>
              <div className="mt-2">
                <span className="text-2xl inline-flex items-center justify-center w-50 h-12 rounded-md bg-[var(--cooking-accent)] text-white font-bold">
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
  )
}
