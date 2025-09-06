"use client"

import { useState, useEffect } from 'react'

export default function TypedText({ 
  texts, 
  speed = 100, 
  delayBetween = 1000, 
  className = "" 
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentTextIndex >= texts.length) return

    const targetText = texts[currentTextIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= targetText.length) {
        setCurrentText(targetText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        
        // Move to next text after delay
        setTimeout(() => {
          setCurrentTextIndex(prev => prev + 1)
          setIsTyping(true)
        }, delayBetween)
      }
    }, speed)

    return () => clearInterval(typeInterval)
  }, [currentTextIndex, texts, speed, delayBetween])

  return (
    <div className={className}>
      {texts.map((text, index) => (
        <div key={index} className={index > currentTextIndex ? 'opacity-0' : 'opacity-100'}>
          {index === currentTextIndex ? (
            <>
              {currentText}
              {isTyping && <span className="animate-pulse">|</span>}
            </>
          ) : index < currentTextIndex ? (
            text
          ) : null}
        </div>
      ))}
    </div>
  )
}