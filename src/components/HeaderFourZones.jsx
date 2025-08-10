'use client'

import { useEffect, useState } from 'react'

export default function HeaderFourZones() {
  // tiny status you can toggle later
  const [status] = useState('Available this month')

  // shrink header on scroll a bit
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? 'backdrop-blur bg-black/30' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main"
    >
      <nav className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-4 gap-2 py-3 md:py-4">
          <a
            href="#about"
            className="group flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm md:text-base text-neutral-200 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          >
            <span className="opacity-90 group-hover:opacity-100">About</span>
          </a>
          <a
            href="#clients"
            className="group flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm md:text-base text-neutral-200 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          >
            <span className="opacity-90 group-hover:opacity-100">Customers</span>
          </a>
          <a
            href="#projects"
            className="group flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm md:text-base text-neutral-200 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          >
            <span className="opacity-90 group-hover:opacity-100">Projects</span>
          </a>
          <a
            href="#contact"
            className="group flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm md:text-base text-neutral-50 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          >
            <span className="opacity-90 group-hover:opacity-100">Contact</span>
          </a>
        </div>

        {/* micro status line */}
        <div className="pb-2 text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-neutral-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            {status}
          </span>
        </div>
      </nav>
    </header>
  )
}
