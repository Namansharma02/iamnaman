'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DecryptedText from './DecryptedText'

interface TypingNameDesktopProps {
  className?: string
}

export default function TypingNameDesktop({ className = '' }: TypingNameDesktopProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [theme, setTheme] = useState('light')
  
  const fullText = "Hello, I am Naman Sharma"
  const finalText = "Naman Sharma"
  
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
          timeoutId = setTimeout(typeNextChar, 80)
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
  }, [currentPhase])
  
  // Cursor blinking
  useEffect(() => {
    if (currentPhase >= 1) return
    
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
          className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[12rem] font-black tracking-display leading-none"
          style={{ transformOrigin: 'left center' }}
        >
          <DecryptedText
            text="Naman "
            speed={80}
            maxIterations={150}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            className="text-text font-bold"
            encryptedClassName="opacity-70"
          />
          <DecryptedText
            text="Sharma"
            speed={80}
            maxIterations={150}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            className={`font-bold ${getSharmaColor()}`}
            encryptedClassName="opacity-70"
          />
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
        className="text-brand ml-1 transition-opacity duration-300"
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