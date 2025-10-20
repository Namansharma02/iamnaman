'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Linkedin, Github, Download } from 'lucide-react'
import { personalInfo } from '@/lib/content'
import TypingName from './TypingName'
import TerminalContainer from './TerminalContainer'

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

export default function HeroDesktop() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Naman_Sharma_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const avatarSrc = mounted
    ? theme === 'dark'
      ? '/naman-avatar-dark.png'
      : theme === 'green'
        ? '/naman-avatar-green.png'
        : '/naman-avatar-light.png'
    : '/naman-avatar-light.png'

  return (
    <section id="hero" className="snap-section fixed inset-0 min-h-screen flex items-center justify-center overflow-hidden w-full max-w-full z-0">
      {/* Background Watermark Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" suppressHydrationWarning>
        <div className="absolute top-[1%] w-full whitespace-nowrap animate-marquee-right">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[30%] w-full whitespace-nowrap animate-marquee-left">
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[60%] w-full whitespace-nowrap animate-marquee-right">
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[85%] w-full whitespace-nowrap animate-marquee-left">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 xl:gap-32 items-center min-h-screen max-w-7xl mx-auto w-full max-w-full">
          
          {/* Text Content - Desktop Layout */}
          <div className="text-left lg:pr-8 pt-16 lg:mt-0 h-full flex flex-col">
            {/* Top Section: Name - 40% of height with top padding */}
            <div className="h-[40%] flex items-center justify-start pt-12 lg:pt-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-black tracking-display leading-none">
                  <TypingName className="text-text" />
                </h1>
              </motion.div>
            </div>
            
            {/* Bottom Section: Terminal Container - 60% of height */}
            <div className="h-[60%] flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.23, 1, 0.32, 1],
                  delay: 6,
                  type: "spring",
                  stiffness: 50,
                  damping: 15
                }}
                className="max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl"
                style={{ perspective: "1000px" }}
              >
                <TerminalContainer
                  className="shadow-2xl"
                />
              </motion.div>
            </div>
          </div>

          {/* Desktop Avatar - Right Side */}
          <div className="lg:pl-8 max-w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center lg:justify-end max-w-full"
            >
              <div className="relative w-[28rem] h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] 2xl:w-[40rem] 2xl:h-[40rem] 3xl:w-[52rem] 3xl:h-[52rem] flex-shrink-0 max-w-full">
                <img
                  src={avatarSrc}
                  alt="Naman Sharma"
                  className="w-full h-full rounded-full object-cover border-4 border-brand shadow-2xl aspect-square"
                />
                <div className="absolute inset-0 rounded-full bg-brand/30 blur-2xl -z-10 animate-pulse"></div>
                
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-brand/30 aspect-square -z-20"
                  style={{ aspectRatio: '1 / 1' }}
                />
                
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

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </section>
  )
}