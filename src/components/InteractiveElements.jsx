"use client"

import { useState, useEffect } from 'react'

export default function InteractiveElements({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Mouse follower */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none z-50 transition-transform duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          opacity: 0.6
        }}
      />

      {/* Interactive background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 border border-blue-200/30 rounded-full transition-all duration-500 hover:border-blue-400/60 hover:scale-110"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              transform: `translateX(${(mousePosition.x - window.innerWidth / 2) * 0.01 * (i + 1)}px) translateY(${(mousePosition.y - window.innerHeight / 2) * 0.01 * (i + 1)}px)`,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
        ))}
      </div>

      {children}
    </div>
  )
}