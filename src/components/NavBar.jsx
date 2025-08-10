"use client"
import { useEffect, useState } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"

export default function NavBar({ theme, onToggleTheme }) {
  const links = [
    { id: "about", href: "#about", label: "About" },
    { id: "what-i-do", href: "#what-i-do", label: "What I Do" },
    { id: "experience", href: "#experience", label: "Experience" },
    { id: "projects", href: "#projects", label: "Projects" },
    { id: "skills", href: "#skills", label: "Skills" },
    { id: "contact", href: "#contact", label: "Contact" },
  ]

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => setMounted(true), [])

  const toggle = () => setOpen(v => !v)
  const close = () => setOpen(false)

  // close the drawer when hash changes
  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto w-full max-w-8xl px-4 md:px-100 mt-3 md:mt-4">
        <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] nav-surface px-2 md:px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden">
          <a href="#hero" className="text-sm font-medium tracking-wide">Hey!</a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map(l => (
              <a key={l.id} href={l.href} className="nav-link text-[15px] lg:text-sm">{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              className="md:hidden btn-toggle w-9 h-9 grid place-items-center"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobileMenu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            {/* Theme icon toggle */}
            <button
              className="btn-toggle w-9 h-9 grid place-items-center"
              onClick={onToggleTheme}
              aria-label={mounted ? (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
              title={mounted ? (theme === 'dark' ? 'Light' : 'Dark') : 'Theme'}
            >
              {mounted ? (
                theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown with slide down animation */}
        <div
          id="mobileMenu"
          className={`md:hidden mt-2 overflow-hidden rounded-2xl border border-[var(--border)] nav-surface mobile-menu ${open ? 'open' : ''}`}
          role="menu"
        >
          <nav className="grid p-2">
            {links.map(l => (
              <a
                key={l.id}
                href={l.href}
                className="px-3 py-2 rounded-lg text-sm hover:bg-[color-mix(in_srgb,var(--fg)_8%,transparent)]"
                onClick={close}
                role="menuitem"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}