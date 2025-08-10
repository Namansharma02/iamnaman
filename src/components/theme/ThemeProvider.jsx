'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext({ theme: 'dark', toggle: () => {} })

export function useTheme() {
  return useContext(ThemeCtx)
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  // Load saved or system preference once
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
      setTheme(prefersLight ? 'light' : 'dark')
    }
  }, [])

  // Apply to <html data-theme="..."> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      {children}
    </ThemeCtx.Provider>
  )
}
