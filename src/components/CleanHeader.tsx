'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react'
import { personalInfo } from '@/lib/content'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        element.scrollIntoView({ behavior: 'auto' })
      }
    } else {
      window.open(href, '_blank')
    }
    setIsMenuOpen(false)
  }

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const currentTheme = mounted ? theme : 'light'
  const CurrentThemeIcon = themes.find(t => t.id === currentTheme)?.icon || Sun

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-8 bg-surface rounded-full"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-surface rounded-full"></div>
              <div className="w-8 h-8 bg-surface rounded-full"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-text/90 backdrop-blur-md shadow-lg lg:shadow-none ${
        scrolled ? 'lg:bg-text/90 lg:backdrop-blur-md lg:shadow-lg' : 'lg:bg-transparent lg:backdrop-blur-none'
      }`}>
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
                src="/naman-avatar-light.png"
                alt="Naman Sharma"
                className="h-8 w-8 rounded-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </motion.button>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                  onClick={() => handleMenuClick(item.href)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative hover:text-brand transition-colors duration-200 text-lg font-semibold focus:outline-none px-2 py-1 text-background ${
                    scrolled ? '' : 'lg:text-text'
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
                              className="absolute -left-4 text-brand font-mono text-lg"
                            >
                              &lt;
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute -right-4 text-brand font-mono text-lg"
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

            {/* Right Side - Theme, Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <div className="relative">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className={`p-2 hover:text-brand transition-colors rounded-full focus:outline-none text-background bg-background/10 hover:bg-background/20 border border-background/20 hover:border-brand/50 ${
                    scrolled ? '' : 'lg:text-text lg:bg-surface/50 lg:hover:bg-surface/80 lg:border-border/50'
                  }`}
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
                      className="absolute right-0 mt-2 w-32 bg-surface/95 backdrop-blur-md border border-border rounded-lg shadow-lg py-1"
                    >
                      {themes.map((t) => {
                        const Icon = t.icon
                        return (
                          <button
                            key={t.id}
                            onClick={() => handleThemeChange(t.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                              theme === t.id 
                                ? 'bg-brand/10 text-brand' 
                                : 'text-text hover:bg-surface hover:text-brand'
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

              {/* Mobile Menu Button - Only visible on mobile */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative z-50 p-2 text-background hover:text-brand transition-colors focus:outline-none rounded-md"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Only visible on mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Navigation */}
                  <div>
                    <h3 className="text-sm font-semibold text-brand uppercase tracking-wider mb-4">
                      Navigation
                    </h3>
                    <nav className="space-y-2">
                      {navItems.map((item, index) => (
                        <motion.button
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          onClick={() => handleMenuClick(item.href)}
                          className="block w-full text-left text-2xl font-semibold text-text hover:text-brand transition-colors py-2"
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </nav>
                  </div>

                  {/* Connect */}
                  <div>
                    <h3 className="text-sm font-semibold text-brand uppercase tracking-wider mb-4">
                      Connect
                    </h3>
                    <div className="space-y-2">
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        onClick={() => handleMenuClick(personalInfo.linkedin)}
                        className="block w-full text-left text-lg text-subtle hover:text-brand transition-colors py-1"
                      >
                        LinkedIn
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                        onClick={() => handleMenuClick(personalInfo.github)}
                        className="block w-full text-left text-lg text-subtle hover:text-brand transition-colors py-1"
                      >
                        GitHub
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        onClick={() => handleMenuClick(`mailto:${personalInfo.email}`)}
                        className="block w-full text-left text-lg text-subtle hover:text-brand transition-colors py-1"
                      >
                        Email
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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