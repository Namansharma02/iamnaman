'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Linkedin, Github, Download } from 'lucide-react'
import { personalInfo } from '@/lib/content'
import TypingName from './TypingName'
import RotatingText from './RotatingText'

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

export default function HeroMobile() {
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

  const avatarSrc = mounted && theme === 'dark' ? '/naman-avatar-dark.png' : '/naman-avatar-light.png'

  return (
    <section id="hero" className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden w-full max-w-full">
      {/* Background Watermark Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" suppressHydrationWarning>
        <div className="absolute top-[6%] w-full whitespace-nowrap animate-marquee-right">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[22%] w-full whitespace-nowrap animate-marquee-left">
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[39%] w-full whitespace-nowrap animate-marquee-right">
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[56%] w-full whitespace-nowrap animate-marquee-left">
          <span className="watermark-line">THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[73%] w-full whitespace-nowrap animate-marquee-right">
          <span className="watermark-line">PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
        <div className="absolute top-[90%] w-full whitespace-nowrap animate-marquee-left">
          <span className="watermark-line">EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  THINK  ●  PLAN  ●  EXECUTE  ●  </span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 overflow-hidden">
        <div className="items-center min-h-screen max-w-7xl mx-auto w-full max-w-full">
          
          {/* Mobile Avatar - Top */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-72 h-72 sm:w-72 sm:h-72">
                <img
                  src={avatarSrc}
                  alt="Naman Sharma"
                  className="w-full h-full rounded-full object-cover border-4 border-brand shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-brand/20 blur-lg -z-10"></div>
                
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-brand/30 aspect-square -z-20"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Text Content - Mobile Layout */}
          <div className="text-center pt-80 h-full flex flex-col">
            {/* Top Section: Name - 40% of height */}
            <div className="h-[40%] flex items-center justify-center pt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-display leading-none">
                  <TypingName className="text-text" />
                </h1>
              </motion.div>
            </div>
            
            {/* Bottom Section: Tagline + Buttons - 60% of height */}
            <div className="h-[60%] flex flex-col justify-center space-y-12">
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 2.5 }}
                className="text-center"
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono font-light text-subtle">
                  <div className="mb-2">Cooking innovation through</div>
                  <div className="inline-block">
                    <RotatingText
                      texts={['Technology', 'Automation', 'Strategy']}
                      rotationInterval={3000}
                      mainClassName={`inline-block px-2 py-1 rounded-md text-base sm:text-lg md:text-xl lg:text-2xl ${
                        theme === 'green' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
                      } font-medium shadow-sm`}
                      staggerFrom="first"
                      initial={{ y: "100%", scale: 0.9 }}
                      animate={{ y: 0, scale: 1 }}
                      exit={{ y: "-120%", scale: 0.9 }}
                      staggerDuration={0.02}
                      splitLevelClassName="overflow-hidden"
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 3 }}
                className="grid grid-cols-1 gap-4 max-w-sm mx-auto"
              >
                {/* Let's Explore Button */}
                <button
                  onClick={scrollToAbout}
                  className="group flex items-center justify-center px-8 py-6 bg-brand text-brandOn rounded-xl font-medium text-base transition-all duration-300 hover:bg-brand/90 hover:shadow-lg hover:-translate-y-1 min-h-[60px]"
                >
                  <span>Let's Explore</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                
                {/* Download Resume Button */}
                <button
                  onClick={downloadResume}
                  className="group flex items-center justify-center px-8 py-6 bg-surface border-2 border-border text-text rounded-xl font-medium text-base transition-all duration-300 hover:border-brand hover:bg-brand/5 hover:shadow-lg hover:-translate-y-1 min-h-[60px]"
                >
                  <Download className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>No time? Download Resume</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </section>
  )
}