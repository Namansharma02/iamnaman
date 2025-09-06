'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Leaf } from 'lucide-react'
import StaggeredMenu from './StaggeredMenu'
import { personalInfo } from '@/lib/content'

const menuItems = [
  { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
  { label: 'Experience', ariaLabel: 'View my experience', link: '#experience' },
  { label: 'Projects', ariaLabel: 'See my projects', link: '#projects' },
  { label: 'Skills', ariaLabel: 'View my skills', link: '#skills' },
  { label: 'Photography', ariaLabel: 'See my photography', link: '#photography' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
  { label: 'LinkedIn', link: personalInfo.linkedin },
  { label: 'GitHub', link: personalInfo.github },
  { label: 'Email', link: `mailto:${personalInfo.email}` }
];

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

export default function EnhancedHeader() {
  const [theme, setTheme] = useState('light')
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    setIsThemeMenuOpen(false)
  }

  const currentTheme = mounted ? theme : 'light'
  const CurrentThemeIcon = themes.find(t => t.id === currentTheme)?.icon || Sun

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 w-full h-16 z-50" suppressHydrationWarning>
      {/* Theme Button - positioned to appear beside menu */}
      <div className="absolute top-4 right-20 z-[60]">
        <div className="relative">
          <motion.button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="p-2 text-text hover:text-brand transition-colors bg-surface/80 backdrop-blur-md rounded-full border border-border/50 hover:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background"
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
      </div>

      {/* StaggeredMenu */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={currentTheme === 'dark' ? '#f4f4f5' : '#111827'}
        openMenuButtonColor={currentTheme === 'dark' ? '#f4f4f5' : '#111827'}
        changeMenuColorOnOpen={false}
        colors={
          currentTheme === 'dark' 
            ? ['#1e293b', '#334155']
            : currentTheme === 'green'
            ? ['#10b981', '#34d399'] 
            : ['#3b82f6', '#93c5fd']
        }
        logoUrl="/naman-avatar-light.png"
        accentColor={
          currentTheme === 'green' 
            ? '#10b981' 
            : '#3b82f6'
        }
        onMenuOpen={() => setIsThemeMenuOpen(false)}
      />

      {/* Click outside to close theme menu */}
      {isThemeMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsThemeMenuOpen(false)}
        />
      )}
    </div>
  )
}