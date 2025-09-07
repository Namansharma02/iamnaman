'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, FolderOpen, Camera, Mail, Sun, Moon, Leaf } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Work', href: '#experience', icon: Briefcase },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Photos', href: '#photography', icon: Camera },
  { label: 'Contact', href: '#contact', icon: Mail }
]

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

export default function BottomTabNav() {
  const [activeSection, setActiveSection] = useState('hero')
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
      setActiveSection(sectionId)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const CurrentThemeIcon = themes.find(t => t.id === theme)?.icon || Sun

  if (!mounted) return null

  return (
    <div className="lg:hidden">
      {/* Top Theme Bar */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3"
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
          >
            <img
              src="/naman-avatar-light.png"
              alt="Naman"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-text">Naman</span>
          </button>
          <div className="flex gap-1">
            {themes.map((t) => {
              const Icon = t.icon
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleThemeChange(t.id)}
                  className={`p-2 rounded-full transition-colors ${
                    theme === t.id 
                      ? 'bg-brand text-brandOn shadow-lg' 
                      : 'text-subtle hover:bg-surface hover:text-text'
                  }`}
                >
                  <Icon size={16} />
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-border"
      >
        <div className="grid grid-cols-6 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.href.replace('#', '')
            
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="relative flex flex-col items-center justify-center py-2 px-1 transition-colors"
              >
                <div className={`p-1.5 rounded-full transition-all ${
                  isActive 
                    ? 'bg-brand text-brandOn scale-110' 
                    : 'text-subtle hover:text-text hover:bg-border'
                }`}>
                  <Icon size={18} />
                </div>
                <span className={`text-xs mt-1 transition-colors ${
                  isActive ? 'text-brand font-medium' : 'text-subtle'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-0.5 left-1/2 w-1 h-1 bg-brand rounded-full"
                    style={{ x: '-50%' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}