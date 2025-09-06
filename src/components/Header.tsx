'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Leaf, Github, Linkedin } from 'lucide-react'
import { personalInfo } from '@/lib/content'


const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'green', label: 'Green', icon: Leaf }
]

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Photography', href: '#photography' },
  { label: 'Contact', href: '#contact' }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
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

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentTheme = mounted ? theme : 'light'
  const CurrentThemeIcon = themes.find(t => t.id === currentTheme)?.icon || Sun

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={scrollToHero}
            className="text-xl font-bold text-text hover:text-brand transition-colors link-hover focus-ring rounded-md px-2 py-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {personalInfo.name}
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-subtle hover:text-text transition-colors link-hover focus-ring rounded-md px-2 py-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Social Links */}
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-brand transition-colors icon-hover focus-ring rounded-md p-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </motion.a>
            
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-brand transition-colors icon-hover focus-ring rounded-md p-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </motion.a>

            {/* Theme Toggle */}
            <div className="relative">
              <motion.button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center justify-center w-10 h-10 text-subtle hover:text-brand transition-colors focus-ring rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                aria-label="Toggle theme"
                aria-expanded={isThemeMenuOpen}
              >
                <CurrentThemeIcon size={20} />
              </motion.button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 bg-surface border border-border rounded-lg shadow-lg py-1"
                  >
                    {themes.map((themeOption) => {
                      const Icon = themeOption.icon
                      return (
                        <button
                          key={themeOption.id}
                          onClick={() => handleThemeChange(themeOption.id)}
                          className={`w-full flex items-center px-3 py-2 text-sm hover:bg-brand hover:text-brandOn transition-colors ${theme === themeOption.id ? 'bg-brand text-brandOn' : 'text-text'}`}
                        >
                          <Icon size={16} className="mr-2" />
                          {themeOption.label}
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-text hover:text-brand transition-colors focus-ring rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border bg-background"
            >
              <nav className="py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-text hover:text-brand transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex items-center space-x-4 px-4 pt-4 border-t border-border">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-subtle hover:text-brand transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-subtle hover:text-brand transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={20} />
                  </a>
                  
                  {/* Mobile Theme Toggle */}
                  <div className="flex items-center space-x-2 ml-auto">
                    {themes.map((themeOption) => {
                      const Icon = themeOption.icon
                      return (
                        <button
                          key={themeOption.id}
                          onClick={() => handleThemeChange(themeOption.id)}
                          className={`p-2 rounded-md transition-colors ${theme === themeOption.id ? 'bg-brand text-brandOn' : 'text-subtle hover:text-brand'}`}
                          aria-label={`Switch to ${themeOption.label} theme`}
                        >
                          <Icon size={16} />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}