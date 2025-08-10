"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X, Sun, Moon, Code2 } from "lucide-react"

export default function NavBar({ theme, onToggleTheme, onToggleCode, codeOpen }) {
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
  const [showCodeHint, setShowCodeHint] = useState(false)
  useEffect(() => setMounted(true), [])

  // one-time tooltip when overlay opens
  useEffect(() => {
    if (!codeOpen) { setShowCodeHint(false); return }
    setShowCodeHint(true)
    const t = setTimeout(() => setShowCodeHint(false), 2000)
    return () => clearTimeout(t)
  }, [codeOpen])

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
      <div className="mx-auto w-full max-w-7xl px-2 md:px-3 mt-3 md:mt-4">
        <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] nav-surface px-2 md:px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Brand replaces "Top" text */}
          <a href="#hero" aria-label="Home" className="flex items-center gap-2 group">
            <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-[var(--border)] transition-transform group-hover:scale-105">
              <Image
                src="/naman-avatar.png"
                alt="Naman avatar"
                fill
                sizes="40px"
                priority
                className="object-contain"
              />
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-4">
            {links.map(l => (
              <a key={l.id} href={l.href} className="nav-link nav-anim text-[17px] lg:text-[18px] font-semibold tracking-tight">{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* See Code toggle desktop with one-time tooltip */}
            <div className="relative hidden sm:inline-block">
              <button
                type="button"
                onClick={onToggleCode}
                className="btn-toggle inline-flex items-center justify-center h-10 px-3 text-sm nav-anim"
                title={codeOpen ? "Hide Code" : "See Code"}
                aria-pressed={codeOpen}
              >
                {codeOpen ? "Hide Code" : "See Code"}
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_75%,transparent)] backdrop-blur px-3 py-1.5 text-xs shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition ${showCodeHint ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                Hover on the screen to reveal code
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[color-mix(in_srgb,var(--bg)_75%,transparent)] border-l border-t border-[var(--border)]"></span>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden btn-toggle p-0 w-10 h-10 grid place-items-center"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobileMenu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Mobile See Code icon */}
            <button
              className="btn-toggle p-0 w-10 h-10 grid place-items-center sm:hidden"
              onClick={onToggleCode}
              aria-pressed={codeOpen}
              aria-label={codeOpen ? "Hide code" : "See code"}
              title={codeOpen ? "Hide Code" : "See Code"}
            >
              <Code2 className="h-5 w-5" />
            </button>

            {/* Theme icon toggle */}
            <button
              className="btn-toggle p-0 w-10 h-10 grid place-items-center"
              onClick={onToggleTheme}
              aria-label={mounted ? (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
              title={mounted ? (theme === 'dark' ? 'Light' : 'Dark') : 'Theme'}
            >
              {mounted ? (
                theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
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
                className="px-3 py-2 rounded-lg text-[16px] hover:bg-[color-mix(in_srgb,var(--fg)_8%,transparent)] nav-anim"
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