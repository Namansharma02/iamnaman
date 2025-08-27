"use client"

import { useEffect, useRef } from "react"

const StraightMarquee = ({
  text = "Naman Sharma",
  speed = 0.3,
  className = "",
  direction = "left" // left = right to left, right = left to right
}) => {
  const marqueeRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    const content = contentRef.current
    if (!marquee || !content) return

    let animationId
    let translateX = direction === "left" ? 0 : -100

    const animate = () => {
      if (direction === "left") {
        translateX -= speed
        if (translateX <= -100) {
          translateX = 0
        }
      } else {
        translateX += speed
        if (translateX >= 0) {
          translateX = -100
        }
      }
      
      content.style.transform = `translateX(${translateX}%)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [speed, direction])

  // Create repeated text to ensure seamless loop
  const repeatedText = Array(8).fill(text).join(" • ")

  return (
    <div 
      ref={marqueeRef}
      className="fixed inset-0 z-0 flex items-center overflow-hidden pointer-events-none marquee-text"
      style={{ 
        fontSize: 'clamp(2rem, 50vw, 15rem)',
        fontWeight: '900',
        fontFamily: "'Priestacy', system-ui, -apple-system, sans-serif",
        letterSpacing: '0.1em',
        lineHeight: '1'
      }}
    >
      <div 
        ref={contentRef}
        className={`whitespace-nowrap will-change-transform ${className}`}
        style={{ 
          width: '200%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {repeatedText}
      </div>
    </div>
  )
}

export default StraightMarquee