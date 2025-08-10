"use client"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

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

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto max-w-6xl mt-4">
        <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] nav-surface px-3 py-2">
          <a href="#hero" className="text-sm font-medium tracking-wide">iamnaman</a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.id} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              className="md:hidden btn-toggle"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <button className="btn-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
              {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-[var(--border)] nav-surface p-2">
            <nav className="grid">
              {links.map(l => (
                <a
                  key={l.id}
                  href={l.href}
                  className="px-3 py-2 rounded-lg text-sm hover:bg-[color-mix(in_srgb,var(--fg)_8%,transparent)]"
                  onClick={close}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}