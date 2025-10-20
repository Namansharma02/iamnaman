'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ImagePair {
  front: string
  back: string
}

interface ScrollImageMergeProps {
  // Mobile: 2 pairs (4 images → 2 combined)
  mobilePairs: ImagePair[]
  // Desktop: 3 pairs (6 images → 3 combined)
  desktopPairs: ImagePair[]
  className?: string
}

export default function ScrollImageMerge({
  mobilePairs,
  desktopPairs,
  className = ''
}: ScrollImageMergeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState('light')

  // Track theme changes
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
      setTheme(currentTheme)
    }

    // Initial theme
    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])

  // Track scroll progress of this specific element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"] // Starts when entering viewport, completes at center
  })

  // Animation transforms
  const frontX = useTransform(scrollYProgress, [0, 1], ['-100%', '0%'])
  const backX = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])
  const frontRotate = useTransform(scrollYProgress, [0, 1], [-15, 0])
  const backRotate = useTransform(scrollYProgress, [0, 1], [15, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 1])

  // Get background color based on theme
  const backgroundColor =
    theme === 'dark' ? 'rgb(9, 9, 11)' :
    theme === 'green' ? 'rgb(248, 250, 252)' :
    'rgb(255, 255, 255)'

  const renderPair = (pair: ImagePair, index: number) => (
    <div key={index} className="relative flex-1 h-full">
      {/* Back Image (comes from right) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          x: backX,
          rotate: backRotate,
          opacity
        }}
      >
        <img
          src={pair.back}
          alt={`Background layer ${index + 1}`}
          className="h-full w-auto object-contain"
        />
      </motion.div>

      {/* Front Image (comes from left) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{
          x: frontX,
          rotate: frontRotate,
          opacity
        }}
      >
        <img
          src={pair.front}
          alt={`Front layer ${index + 1}`}
          className="h-full w-auto object-contain"
        />
      </motion.div>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-32 sm:h-64 overflow-visible z-50 ${className}`}
    >
      {/* Solid background - white for light/green, black for dark */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor }}
      />

      {/* Mobile: 2 pairs side by side */}
      <div className="lg:hidden flex h-full relative z-10">
        {mobilePairs.map((pair, index) => renderPair(pair, index))}
      </div>

      {/* Desktop: 3 pairs side by side */}
      <div className="hidden lg:flex h-full relative z-10">
        {desktopPairs.map((pair, index) => renderPair(pair, index))}
      </div>
    </div>
  )
}
