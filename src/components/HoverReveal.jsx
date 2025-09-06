"use client"

import { useState } from 'react'

export default function HoverReveal({ title, subtitle, description, className = "" }) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div 
      className={`group cursor-pointer transition-all duration-500 ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Main Content */}
      <div className="relative overflow-hidden">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight transition-all duration-700">
          <span className="inline-block transition-transform duration-700 group-hover:scale-105">
            {title}
          </span>
        </h1>
        
        <div className="relative h-20 overflow-hidden">
          {/* Initial subtitle */}
          <p className={`text-xl md:text-2xl lg:text-3xl text-gray-600 font-light leading-relaxed absolute inset-0 transition-all duration-500 ${isRevealed ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
            {subtitle}
          </p>
          
          {/* Revealed description */}
          <p className={`text-xl md:text-2xl lg:text-3xl text-blue-600 font-light leading-relaxed absolute inset-0 transition-all duration-500 ${isRevealed ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'}`}>
            {description}
          </p>
        </div>
      </div>

      {/* Reveal indicator */}
      <div className={`mt-8 text-sm text-gray-400 transition-all duration-300 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
        Hover to reveal more
      </div>
    </div>
  )
}