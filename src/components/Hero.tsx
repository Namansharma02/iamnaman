'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Linkedin, Github } from 'lucide-react'
import { personalInfo } from '@/lib/content'
import TypingName from './TypingName'

const socialLinks = [
  {
    icon: Linkedin,
    href: personalInfo.linkedin,
    label: 'LinkedIn'
  },
  {
    icon: Github,
    href: personalInfo.github,
    label: 'GitHub'
  }
]

export default function Hero() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    
    // Listen for theme changes via MutationObserver (more reliable)
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 
                          localStorage.getItem('theme') || 'light'
      setTheme(currentTheme)
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
    
    // Also listen for localStorage changes
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem('theme') || 'light'
      setTheme(currentTheme)
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'auto' })
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'auto' })
  }

  const avatarSrc = mounted && theme === 'dark' ? '/naman-avatar-dark.png' : '/naman-avatar-light.png'

  return (
    <section id="hero" className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden w-full max-w-full">
      {/* Background Watermark Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" suppressHydrationWarning>
        {/* Desktop: 4 lines with better spacing */}
        <div className="absolute top-[1%] w-full whitespace-nowrap animate-marquee-right hidden lg:block">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[30%] w-full whitespace-nowrap animate-marquee-left hidden lg:block">
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[60%] w-full whitespace-nowrap animate-marquee-right hidden lg:block">
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[85%] w-full whitespace-nowrap animate-marquee-left hidden lg:block">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        
        {/* Mobile: 6 lines with better spacing */}
        <div className="absolute top-[6%] w-full whitespace-nowrap animate-marquee-right lg:hidden">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[22%] w-full whitespace-nowrap animate-marquee-left lg:hidden">
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[39%] w-full whitespace-nowrap animate-marquee-right lg:hidden">
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[56%] w-full whitespace-nowrap animate-marquee-left lg:hidden">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[73%] w-full whitespace-nowrap animate-marquee-right lg:hidden">
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[90%] w-full whitespace-nowrap animate-marquee-left lg:hidden">
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 xl:gap-32 items-center min-h-screen max-w-7xl mx-auto w-full max-w-full">
          {/* Mobile Avatar - Top */}
          <div className="lg:hidden flex justify-center mb-8 pt-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <img
                  src={avatarSrc}
                  alt="Naman Sharma"
                  className="w-full h-full rounded-full object-cover border-4 border-brand shadow-2xl"
                />
                {/* Simple glow effect */}
                <div className="absolute inset-0 rounded-full bg-brand/20 blur-lg -z-10"></div>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left lg:pr-8">
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 mt-16 lg:mt-24"
            >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] 2xl:text-[9rem] font-black tracking-display leading-none mb-6">
            <TypingName className="text-text" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-subtle max-w-4xl mx-auto leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>
        </motion.div>
          </div>

          {/* Desktop Avatar - Right Side */}
          <div className="hidden lg:block lg:pl-8 max-w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center lg:justify-end max-w-full"
            >
              <div className="relative w-[28rem] h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] 2xl:w-[40rem] 2xl:h-[40rem] flex-shrink-0 max-w-full">
                <img
                  src={avatarSrc}
                  alt="Naman Sharma"
                  className="w-full h-full rounded-full object-cover border-4 border-brand shadow-2xl aspect-square"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-brand/30 blur-2xl -z-10 animate-pulse"></div>
                
                {/* Decorative elements */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-brand/30 aspect-square"
                  style={{ aspectRatio: '1 / 1' }}
                />
                
                {/* Floating dots */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-4 h-4 bg-brand rounded-full shadow-lg"
                />
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-3 h-3 bg-brand/60 rounded-full shadow-md"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </section>
  )
}