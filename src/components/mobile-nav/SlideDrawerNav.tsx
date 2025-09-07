'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Leaf, Home, User, Briefcase, FolderOpen, Camera, Mail, Github, Linkedin } from 'lucide-react'
import { personalInfo } from '@/lib/content'

const navItems = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Skills', href: '#skills', icon: FolderOpen },
  { label: 'Photography', href: '#photography', icon: Camera },
  { label: 'Contact', href: '#contact', icon: Mail }
]

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

export default function SlideDrawerNav() {
  const [isOpen, setIsOpen] = useState(false)
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
  }

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank')
    setIsOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="lg:hidden">
      {/* Top Header */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border"
      >
        <div className="flex items-center justify-between px-4 py-3">
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
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {themes.map((t) => {
                const Icon = t.icon
                return (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleThemeChange(t.id)}
                    className={`p-2 rounded-lg transition-colors ${
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
            
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg text-text hover:bg-surface transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Slide Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background border-l border-border z-50 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <img
                    src="/naman-avatar-light.png"
                    alt="Naman"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-text">Naman Sharma</h2>
                    <p className="text-sm text-subtle">Automation & Analytics Lead</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-subtle hover:text-text hover:bg-surface transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation */}
              <div className="p-6">
                <h3 className="text-sm font-medium text-subtle uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.label}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-text hover:bg-surface transition-colors"
                      >
                        <Icon size={20} className="text-brand" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    )
                  })}
                </nav>
              </div>

              {/* Theme Selection */}
              <div className="p-6 border-t border-border">
                <h3 className="text-sm font-medium text-subtle uppercase tracking-wider mb-4">
                  Theme
                </h3>
                <div className="flex gap-2">
                  {themes.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleThemeChange(t.id)}
                        className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                          theme === t.id 
                            ? 'bg-brand text-brandOn' 
                            : 'text-subtle hover:bg-surface hover:text-text'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-sm">{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 border-t border-border">
                <h3 className="text-sm font-medium text-subtle uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleExternalLink(personalInfo.linkedin)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-border text-text transition-colors"
                  >
                    <Linkedin size={18} />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleExternalLink(personalInfo.github)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-border text-text transition-colors"
                  >
                    <Github size={18} />
                    <span className="text-sm">GitHub</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}