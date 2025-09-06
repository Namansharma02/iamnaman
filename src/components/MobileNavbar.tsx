'use client'

import { useState, useEffect } from 'react'
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

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light')
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

  if (!mounted) return null

  return (
    <>
      {/* Mobile Navigation Bar - Only visible on mobile screens */}
      <div className="lg:hidden">
        {/* Fixed Navigation Bar */}
        <nav 
          className="fixed top-0 left-0 right-0 bg-black shadow-lg"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '10000',
            height: '64px',
            backgroundColor: '#000000'
          }}
        >
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo */}
            <button
              onClick={scrollToHero}
              className="flex items-center"
              aria-label="Go to homepage"
            >
              <img
                src="/naman-avatar-light.png"
                alt="Naman Sharma"
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Theme Button */}
              <div className="relative">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="p-2 text-white hover:text-blue-400 rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Change theme"
                >
                  <CurrentThemeIcon size={16} />
                </button>

                {/* Theme Dropdown */}
                {isThemeMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-1">
                    {themes.map((t) => {
                      const Icon = t.icon
                      return (
                        <button
                          key={t.id}
                          onClick={() => handleThemeChange(t.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                            theme === t.id 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          <Icon size={14} />
                          {t.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-blue-400"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/95"
              style={{ zIndex: '9999', top: '64px' }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <div
              className="fixed left-0 right-0 bg-black"
              style={{ zIndex: '9999', top: '64px' }}
            >
              <div className="px-4 py-8">
                <div className="grid gap-8">
                  {/* Navigation */}
                  <div>
                    <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">
                      Navigation
                    </h3>
                    <nav className="space-y-2">
                      {navItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleMenuClick(item.href)}
                          className="block w-full text-left text-2xl font-semibold text-white hover:text-blue-400 py-2"
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Connect */}
                  <div>
                    <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">
                      Connect
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleMenuClick(personalInfo.linkedin)}
                        className="block w-full text-left text-lg text-gray-300 hover:text-blue-400 py-1"
                      >
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleMenuClick(personalInfo.github)}
                        className="block w-full text-left text-lg text-gray-300 hover:text-blue-400 py-1"
                      >
                        GitHub
                      </button>
                      <button
                        onClick={() => handleMenuClick(`mailto:${personalInfo.email}`)}
                        className="block w-full text-left text-lg text-gray-300 hover:text-blue-400 py-1"
                      >
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Click outside to close theme menu */}
        {isThemeMenuOpen && (
          <div
            className="fixed inset-0"
            style={{ zIndex: '9998' }}
            onClick={() => setIsThemeMenuOpen(false)}
          />
        )}
      </div>
    </>
  )
}