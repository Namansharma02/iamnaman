'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Leaf, Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '@/lib/content'

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

export default function FullScreenNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
  }

  if (!mounted) return null

  return (
    <div className="lg:hidden">
      {/* Top Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
        style={{
          position: 'fixed',
          zIndex: 9999
        }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3"
          >
            <img
              src="/naman-avatar-light.png"
              alt="Naman"
              className="w-10 h-10 rounded-full border-2 border-brand"
            />
            <div className="text-left">
              <h1 className="text-lg font-bold text-text">Naman</h1>
              <p className="text-xs text-subtle">Portfolio</p>
            </div>
          </motion.button>
          
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
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="p-3 rounded-full bg-brand text-brandOn shadow-lg"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-brand text-brandOn shadow-lg"
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
                transition={{ delay: 0.8 }}
                className="border-t border-border pt-8 mb-8"
              >
                <h3 className="text-sm font-medium text-subtle uppercase tracking-wider mb-4">
                  Theme
                </h3>
                <div className="flex gap-3">
                  {themes.map((t) => {
                    const Icon = t.icon
                    return (
                      <motion.button
                        key={t.id}
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

              {/* Social Links */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <h3 className="text-sm font-medium text-subtle uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleExternalLink(personalInfo.linkedin)}
                    className="p-3 bg-surface hover:bg-brand hover:text-brandOn text-text rounded-xl transition-colors shadow-lg"
                  >
                    <Linkedin size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleExternalLink(personalInfo.github)}
                    className="p-3 bg-surface hover:bg-brand hover:text-brandOn text-text rounded-xl transition-colors shadow-lg"
                  >
                    <Github size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleExternalLink(`mailto:${personalInfo.email}`)}
                    className="p-3 bg-surface hover:bg-brand hover:text-brandOn text-text rounded-xl transition-colors shadow-lg"
                  >
                    <Mail size={24} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}