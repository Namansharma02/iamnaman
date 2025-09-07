'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#hero', number: '01' },
  { label: 'About', href: '#about', number: '02' },
  { label: 'Experience', href: '#experience', number: '03' },
  { label: 'Projects', href: '#projects', number: '04' },
  { label: 'Skills', href: '#skills', number: '05' },
  { label: 'Photography', href: '#photography', number: '06' },
  { label: 'Contact', href: '#contact', number: '07' }
]

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

export default function FixedFullScreenNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        // Always show at top of page
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.height = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.height = 'auto'
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)
    if (element) {
      // Close menu immediately to show scrolling animation
      setIsOpen(false)
      
      // Small delay to allow menu close animation, then scroll
      setTimeout(() => {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 20 // Minimal mobile offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, 50)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }


  if (!mounted) return null

  return (
    <>
      {/* Fixed Mobile Header - Smart Scroll Behavior */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="lg:hidden fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          height: '64px'
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 h-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <img
                  src={mounted && theme === 'dark' ? '/naman-avatar-dark.png' : '/naman-avatar-light.png'}
                  alt="Naman"
                  className="w-12 h-12 rounded-full border-2 border-brand shadow-md object-cover"
                />
                {/* Subtle glow ring */}
                <div className="absolute inset-0 rounded-full bg-brand/10 blur-sm -z-10"></div>
                {/* Animated border ring */}
                <motion.div
                  initial={{ rotate: 0, scale: 1 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-brand/20 -m-1"
                />
              </motion.div>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-text">Naman</h1>
              <p className="text-xs text-subtle">Portfolio</p>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="p-3 rounded-full bg-brand text-brandOn shadow-lg"
          >
            <Menu size={20} />
          </motion.button>
        </div>
      </motion.div>

      {/* Add top padding to body content when on mobile to account for fixed header */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          body {
            padding-top: 64px;
          }
          
          #main-content {
            padding-top: 0;
          }
          
          /* Override section padding for better scroll positioning */
          .snap-section {
            scroll-margin-top: 20px;
          }
        }
        
        @media (min-width: 1024px) {
          .snap-section {
            scroll-margin-top: 20px;
          }
        }
      `}</style>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999999,
              background: 'rgb(var(--color-background))',
              overflow: 'hidden'
            }}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-brand text-brandOn shadow-lg z-10"
            >
              <X size={20} />
            </motion.button>

            <div className="flex flex-col justify-center min-h-screen p-8">
              {/* Main Navigation */}
              <div className="space-y-4 mb-12">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 20, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavClick(item.href)}
                    className="group flex items-center gap-6 text-left w-full py-3"
                  >
                    <div className="text-2xl font-mono text-brand opacity-60 group-hover:opacity-100 transition-opacity">
                      {item.number}
                    </div>
                    <div className="text-4xl font-bold text-text group-hover:text-brand transition-colors">
                      {item.label}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Theme Selection */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ 
                  delay: isOpen ? 0.8 : 0,
                  duration: isOpen ? 0.6 : 0.3
                }}
                className="border-t border-border pt-8 mb-8"
              >
                <h3 className="text-sm font-medium text-subtle uppercase tracking-wider mb-4">
                  Theme
                </h3>
                <div className="flex gap-3">
                  {themes.map((t, index) => {
                    const Icon = t.icon
                    return (
                      <motion.button
                        key={t.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          delay: isOpen ? 0.9 + (index * 0.1) : 0,
                          duration: 0.3
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleThemeChange(t.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          theme === t.id 
                            ? 'bg-brand text-brandOn shadow-lg' 
                            : 'bg-surface text-text hover:bg-border'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{t.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}