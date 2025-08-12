"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X, Sun, Moon } from "lucide-react"

export default function NavBar({ theme, onToggleTheme, onToggleCode }) {
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

  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const brandSrc =
    theme === "dark" ? "/naman-avatar-dark.png" : "/naman-avatar-light.png"

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto w-full max-w-8xl px-4 md:px-80 mt-3 md:mt-4">
        <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] nav-surface px-2 md:px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Brand avatar goes to top */}
          <a href="#hero" className="flex items-center gap-2 px-1" aria-label="Top">
            <Image
              src={brandSrc}
              alt="Naman avatar"
              width={40}
              height={40}
              priority
              className="rounded-full ring-1 ring-[var(--border)] transition-transform duration-150 hover:scale-105"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map(l => (
              <a key={l.id} href={l.href} className="nav-link text-[15px] lg:text-sm">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* See Code desktop */}
            <button
              type="button"
              onClick={onToggleCode}
              className="hidden sm:inline-flex items-center rounded-lg border px-3 py-1.5 text-sm nav-link"
              title="See Code"
            >
              See Code
            </button>

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
              aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
              title={mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
            >
              {mounted ? (
                theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobileMenu"
          className={`md:hidden mt-2 overflow-hidden rounded-2xl border border-[var(--border)] nav-surface mobile-menu ${open ? "open" : ""}`}
          role="menu"
        >
          <nav className="grid p-2">
            <button
              type="button"
              onClick={() => { onToggleCode?.(); close() }}
              className="text-left px-3 py-2 rounded-lg text-sm hover:bg-[color-mix(in_srgb,var(--fg)_8%,transparent)]"
              role="menuitem"
            >
              See Code
            </button>
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
