'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Home, User, Briefcase, FolderOpen, Camera, Mail, Sun, Moon, Leaf } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#hero', icon: Home, color: 'bg-blue-500' },
  { label: 'About', href: '#about', icon: User, color: 'bg-green-500' },
  { label: 'Experience', href: '#experience', icon: Briefcase, color: 'bg-purple-500' },
  { label: 'Projects', href: '#projects', icon: FolderOpen, color: 'bg-orange-500' },
  { label: 'Photography', href: '#photography', icon: Camera, color: 'bg-pink-500' },
  { label: 'Contact', href: '#contact', icon: Mail, color: 'bg-red-500' }
]

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

export default function FloatingActionNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [showThemes, setShowThemes] = useState(false)
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    setShowThemes(false)
  }

  if (!mounted) return null

  return (
    <div className="lg:hidden">
      {/* Minimal Top Bar */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-4 right-4 z-30 flex justify-between items-center"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center"
        >
          <img
            src="/naman-avatar-light.png"
            alt="Home"
            className="w-6 h-6 rounded-full"
          />
        </button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowThemes(!showThemes)}
          className={`w-10 h-10 rounded-full backdrop-blur-md border border-border flex items-center justify-center transition-colors ${
            showThemes 
              ? 'bg-brand text-brandOn shadow-lg' 
              : 'bg-background/80 text-text hover:bg-surface'
          }`}
        >
          {(() => {
            const ThemeIcon = themes.find(t => t.id === theme)?.icon
            return ThemeIcon ? <ThemeIcon size={18} /> : null
          })()}
        </motion.button>
      </motion.div>

      {/* Theme Selector */}
      <AnimatePresence>
        {showThemes && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-16 right-4 z-40 bg-background/95 backdrop-blur-md border border-border rounded-xl p-2 shadow-lg"
          >
            <div className="flex flex-col gap-1">
              {themes.map((t) => {
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      theme === t.id 
                        ? 'bg-brand text-brandOn' 
                        : 'text-text hover:bg-surface'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand text-brandOn rounded-full shadow-lg flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={24} />
        </motion.div>
      </motion.button>

      {/* Floating Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-30"
            />
            
            {/* Menu Items */}
            {navItems.map((item, index) => {
              const Icon = item.icon
              const angle = (index * 60) - 90 // Spread items in a fan
              const radius = 100
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x: x, y: y }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                  className="fixed bottom-6 right-6 z-35"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`w-12 h-12 ${item.color} text-white rounded-full shadow-lg flex items-center justify-center relative group`}
                  >
                    <Icon size={20} />
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.label}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-black border-y-2 border-y-transparent"></div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}