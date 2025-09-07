'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingNameMobileProps {
  className?: string
}

export default function TypingNameMobile({ className = '' }: TypingNameMobileProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isSelected, setIsSelected] = useState(false)
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
      const textToRemove = "Hello, I am "
      let removeIndex = textToRemove.length
      
      const removeNextChar = () => {
        if (removeIndex > 0) {
          const currentText = textToRemove.slice(0, removeIndex - 1) + finalText
          setDisplayText(currentText)
          removeIndex--
          timeoutId = setTimeout(removeNextChar, 50)
        } else {
          setDisplayText(finalText)
          timeoutId = setTimeout(() => setCurrentPhase(2), 500)
        }
      }
      removeNextChar()
    } 
    else if (currentPhase === 2) {
      setIsSelected(true)
      timeoutId = setTimeout(() => {
        setIsSelected(false)
        setCurrentPhase(3)
      }, 800)
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

  if (currentPhase === 3) {
    // Final formatted text with cursor space for consistent positioning
    return (
      <div className={`font-mono ${className}`}>
        <motion.span 
          className="inline-block"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: 'left center' }}
        >
          <motion.span
            initial={{ fontWeight: 'inherit' }}
            animate={{ fontWeight: 'bold' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            Naman&nbsp;
          </motion.span><motion.span
            initial={{ color: 'inherit', fontWeight: 'inherit' }}
            animate={{ color: theme === 'green' ? '#22C55E' : '#3B82F6', fontWeight: 'bold' }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="inline-block"
          >
            Sharma
          </motion.span>
        </motion.span>
        {/* Cursor space for mobile layout consistency */}
        <span 
          className="ml-1"
          style={{ 
            opacity: 0,
            width: '0.6em',
            display: 'inline-block'
          }}
        ></span>
      </div>
    )
  }

  return (
    <div className={`font-mono ${className}`}>
      <span className={`transition-all duration-300 ${
        isSelected ? (theme === 'green' ? 'bg-green-500 text-white px-2 py-1 rounded' : 'bg-blue-500 text-white px-2 py-1 rounded') : ''
      }`}>
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