'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Leaf } from 'lucide-react'
import { personalInfo } from '@/lib/content'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Testimonials & Recognitions', href: '#recognition' },
  { label: 'Photography', href: '#photography' },
  { label: 'Contact', href: '#contact' }
]

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

// Shaking animation for hover effect
const shakeAnimation = {
  x: [0, -1, 1, -1, 1, 0],
  y: [0, -1, 1, -1, 1, 0],
  transition: {
    duration: 0.4,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse" as const,
    repeatDelay: 0.5
  }
}

export default function CleanHeader() {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    setIsThemeMenuOpen(false)
  }

  const handleMenuClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 20 // Minimal desktop offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      window.open(href, '_blank')
    }
  }

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentTheme = mounted ? theme : 'light'
  const CurrentThemeIcon = themes.find(t => t.id === currentTheme)?.icon || Sun

  if (!mounted) {
    return (
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-8 bg-surface rounded-full"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-surface rounded-full"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      {/* Desktop Header Only */}
      <header 
        className={`hidden lg:block fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 shadow-none ${
          scrolled 
            ? currentTheme === 'dark' 
              ? 'bg-white shadow-lg' 
              : currentTheme === 'green'
                ? 'bg-brand shadow-lg'
                : 'bg-black shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Always visible */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={scrollToHero}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background rounded-full"
              aria-label="Go to homepage"
            >
              <img
                src={mounted && theme === 'dark' ? '/naman-avatar-dark.png' : '/naman-avatar-light.png'}
                alt="Naman Sharma"
                className="h-12 w-12 rounded-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                  onClick={() => handleMenuClick(item.href)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative lg:transition-colors lg:duration-200 text-lg font-semibold focus:outline-none px-2 py-1 ${
                    scrolled 
                      ? currentTheme === 'dark' 
                        ? 'text-black hover:text-blue-600'
                        : currentTheme === 'green'
                          ? 'text-black hover:text-black'
                          : 'text-white hover:text-blue-600'
                      : currentTheme === 'dark' 
                        ? 'text-white hover:text-brand'
                        : currentTheme === 'green'
                          ? 'text-black hover:text-green-600'
                          : 'text-black hover:text-blue-600'
                  }`}
                >
                  <motion.div
                    className="flex items-center"
                    animate={hoveredItem === item.label ? shakeAnimation : { x: 0, y: 0 }}
                  >
                    <motion.span
                      initial={false}
                      animate={{
                        scale: hoveredItem === item.label ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <AnimatePresence>
                        {hoveredItem === item.label && (
                          <>
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute -left-2 font-mono text-lg ${
                                scrolled
                                  ? currentTheme === 'dark'
                                    ? 'text-blue-600'
                                    : currentTheme === 'green'
                                      ? 'text-black'
                                      : 'text-blue-600'
                                  : currentTheme === 'dark'
                                    ? 'text-brand'
                                    : currentTheme === 'green'
                                      ? 'text-green-600'
                                      : 'text-blue-600'
                              }`}
                            >
                              &lt;
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute -right-2 font-mono text-lg ${
                                scrolled
                                  ? currentTheme === 'dark'
                                    ? 'text-blue-600'
                                    : currentTheme === 'green'
                                      ? 'text-black'
                                      : 'text-blue-600'
                                  : currentTheme === 'dark'
                                    ? 'text-brand'
                                    : currentTheme === 'green'
                                      ? 'text-green-600'
                                      : 'text-blue-600'
                              }`}
                            >
                              &gt;
                            </motion.span>
                          </>
                        )}
                      </AnimatePresence>
                      {item.label}
                    </motion.span>
                  </motion.div>
                </motion.button>
              ))}
            </nav>

            {/* Theme Toggle */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className={`p-2 hover:text-brand transition-colors rounded-full focus:outline-none ${
                  scrolled
                    ? currentTheme === 'dark' 
                        ? 'text-black bg-black/10 hover:bg-black/20 border border-black/20'
                        : currentTheme === 'green'
                          ? 'text-black bg-black/10 hover:bg-black/20 border border-black/20'
                          : 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
                    : (currentTheme === 'dark' 
                        ? 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
                        : 'text-black bg-black/10 hover:bg-black/20 border border-black/20')
                } hover:border-brand/50`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Change theme"
              >
                <CurrentThemeIcon size={16} />
              </motion.button>

              {/* Theme Dropdown */}
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 min-w-[120px] w-auto bg-surface backdrop-blur-md border border-border rounded-lg shadow-xl py-1 z-[99999]"
                  >
                    {themes.map((t) => {
                      const Icon = t.icon
                      return (
                        <button
                          key={t.id}
                          onClick={() => handleThemeChange(t.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors whitespace-nowrap ${
                            theme === t.id 
                              ? 'bg-brand/10 text-brand' 
                              : 'text-text hover:bg-brand/5 hover:text-brand'
                          }`}
                        >
                          <Icon size={14} />
                          {t.label}
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Click outside to close theme menu */}
      {isThemeMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsThemeMenuOpen(false)}
        />
      )}
    </>
  )
}