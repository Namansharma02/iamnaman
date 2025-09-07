'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Leaf } from 'lucide-react'

const navItems = [
  { label: 'Hero', href: '#hero', color: 'bg-blue-500' },
  { label: 'About', href: '#about', color: 'bg-green-500' },
  { label: 'Experience', href: '#experience', color: 'bg-purple-500' },
  { label: 'Projects', href: '#projects', color: 'bg-orange-500' },
  { label: 'Skills', href: '#skills', color: 'bg-teal-500' },
  { label: 'Photography', href: '#photography', color: 'bg-pink-500' },
  { label: 'Contact', href: '#contact', color: 'bg-red-500' }
]

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

export default function DotsNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: [0.5] }
    )

    navItems.forEach((item) => {
      const element = document.getElementById(item.href.replace('#', ''))
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  if (!mounted) return null

  return (
    <div className="lg:hidden">
      {/* Top Minimal Bar */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-4 right-4 z-40 flex justify-between items-center"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center"
        >
          <img
            src="/naman-avatar-light.png"
            alt="Home"
            className="w-8 h-8 rounded-full"
          />
        </motion.button>
        
        <div className="flex gap-2">
          {themes.map((t) => {
            const Icon = t.icon
            return (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleThemeChange(t.id)}
                className={`w-10 h-10 rounded-full backdrop-blur-md border border-border shadow-lg flex items-center justify-center transition-colors ${
                  theme === t.id 
                    ? 'bg-brand text-brandOn shadow-lg' 
                    : 'bg-background/80 text-text hover:bg-surface'
                }`}
              >
                <Icon size={16} />
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Right Side Dots Navigation */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-3"
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href.replace('#', '')
          
          return (
            <div key={item.label} className="relative group">
              <motion.button
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setShowTooltip(item.label)}
                onMouseLeave={() => setShowTooltip(null)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? `${item.color} scale-125 shadow-lg` 
                    : 'bg-border hover:bg-subtle'
                }`}
              >
                {/* Active indicator ring */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`absolute inset-0 rounded-full ${item.color} opacity-30`}
                    style={{ transform: 'scale(2)' }}
                  />
                )}
              </motion.button>
              
              {/* Tooltip */}
              {showTooltip === item.label && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-background border border-border rounded-lg shadow-lg whitespace-nowrap text-sm text-text"
                >
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-background border-y-4 border-y-transparent"></div>
                </motion.div>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-2 shadow-lg">
          <div className="text-xs text-text font-medium">
            {navItems.find(item => item.href.replace('#', '') === activeSection)?.label || 'Hero'}
          </div>
          <div className="mt-1 h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((navItems.findIndex(item => item.href.replace('#', '') === activeSection) + 1) / navItems.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}