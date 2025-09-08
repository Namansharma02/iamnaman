'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedTaglineProps {
  className?: string
  delay?: number // Delay before starting the animation
}

export default function AnimatedTagline({ className = '', delay = 0 }: AnimatedTaglineProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentPhase, setCurrentPhase] = useState(0) // 0=waiting, 1=typing, 2=cycling
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(false)
  
  const baseText = "Cooking innovation through "
  const words = useMemo(() => ["Technology", "Automation", "Strategy"], [])
  
  useEffect(() => {
    // Wait for delay before starting
    if (currentPhase === 0) {
      const timeoutId = setTimeout(() => {
        setCurrentPhase(1)
        setShowCursor(true)
      }, delay)
      return () => clearTimeout(timeoutId)
    }
    
    if (currentPhase === 1) {
      // Type the initial text with first word
      const fullInitialText = baseText + words[0]
      let currentIndex = 0
      
      const typeNextChar = () => {
        if (currentIndex <= fullInitialText.length) {
          setDisplayText(fullInitialText.slice(0, currentIndex))
          currentIndex++
          setTimeout(typeNextChar, 60) // Typing speed
        } else {
          // Wait then start cycling
          setTimeout(() => {
            setCurrentPhase(2)
            setCurrentWordIndex(1) // Start with second word
          }, 2000)
        }
      }
      typeNextChar()
    }
    
    if (currentPhase === 2) {
      // Cycling phase: remove current word and type new word
      const currentWord = words[(currentWordIndex - 1 + words.length) % words.length]
      const newWord = words[currentWordIndex]
      
      // Remove current word
      let removeIndex = currentWord.length
      const removeChar = () => {
        if (removeIndex > 0) {
          setDisplayText(baseText + currentWord.slice(0, removeIndex - 1))
          removeIndex--
          setTimeout(removeChar, 40) // Removal speed
        } else {
          // Type new word
          let typeIndex = 0
          const typeChar = () => {
            if (typeIndex <= newWord.length) {
              setDisplayText(baseText + newWord.slice(0, typeIndex))
              typeIndex++
              setTimeout(typeChar, 60) // Typing speed
            } else {
              // Wait before next cycle
              setTimeout(() => {
                setCurrentWordIndex((prev) => (prev + 1) % words.length)
              }, 2500) // Wait time between words
            }
          }
          typeChar()
        }
      }
      removeChar()
    }
  }, [currentPhase, currentWordIndex, delay, words])
  
  // Cursor blinking
  useEffect(() => {
    if (!showCursor) return
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [showCursor])

  if (currentPhase === 0) {
    return <div className={className}></div> // Empty while waiting
  }

  return (
    <div className={`${className}`}>
      <span className="text-subtle">
        {displayText}
        {showCursor && (
          <span className="text-brand animate-pulse">|</span>
        )}
      </span>
    </div>
  )
}