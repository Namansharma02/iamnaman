'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import DecryptedText from './DecryptedText'

interface TypingNameMobileProps {
  className?: string
}

export default function TypingNameMobile({ className = '' }: TypingNameMobileProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [theme, setTheme] = useState('light')
  
  const fullText = useMemo(() => "Hello, I am Naman Sharma", [])
  const finalText = useMemo(() => "Naman Sharma", [])
  
  // Theme detection
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 
                          localStorage.getItem('theme') || 'light'
      setTheme(currentTheme)
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    return () => observer.disconnect()
  }, [])
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    if (currentPhase === 0) {
      let currentIndex = 0
      const typeNextChar = () => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex++
          timeoutId = setTimeout(typeNextChar, 100)
        } else {
          setShowCursor(false)
          timeoutId = setTimeout(() => setCurrentPhase(1), 1500)
        }
      }
      typeNextChar()
    } 
    else if (currentPhase === 1) {
      // Backspace deletion effect
      let deleteIndex = fullText.length
      const deleteNextChar = () => {
        if (deleteIndex > 0) {
          setDisplayText(fullText.slice(0, deleteIndex - 1))
          deleteIndex--
          timeoutId = setTimeout(deleteNextChar, 30)
        } else {
          setDisplayText('')
          timeoutId = setTimeout(() => setCurrentPhase(2), 300)
        }
      }
      deleteNextChar()
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentPhase, fullText])
  
  // Cursor blinking - optimized
  useEffect(() => {
    if (currentPhase >= 1) {
      setShowCursor(false)
      return
    }
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [currentPhase])

  if (currentPhase === 2) {
    // Final stage with DecryptedText effect - fixed font size
    const getSharmaColor = () => {
      if (theme === 'green') return 'text-green-500'
      return 'text-blue-500' // blue for both light and dark themes
    }

    return (
      <div className={`font-mono ${className}`}>
        <div
          className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] 2xl:text-[9rem] font-black tracking-display leading-none"
          style={{ transformOrigin: 'center center' }}
        >
          <div className="leading-tight">
            <DecryptedText
              text="Naman "
              speed={80}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              className="text-text font-bold"
              encryptedClassName="opacity-70"
            />
            <DecryptedText
              text="Sharma"
              speed={80}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              className={`font-bold ${getSharmaColor()}`}
              encryptedClassName="opacity-70"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`font-mono ${className}`}>
      <span>
        {displayText}
      </span>
      <span 
        className="text-brand ml-1"
        style={{ 
          opacity: (currentPhase === 0 && showCursor) ? 1 : 0,
          width: '0.6em',
          display: 'inline-block'
        }}
      >
        |
      </span>
    </div>
  )
}