'use client'

import { useEffect, useState } from 'react'

export default function NavBar({ onChangeBg, currentBg = 'matrix' }) {
  const [open, setOpen] = useState(false)

  // Close on route hash change or escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full overflow-x-clip">
      <nav className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between md:rounded-b-2xl bg-black/40 backdrop-blur border-b border-white/10">
        {/* Brand */}
        <a href="#top" className="font-semibold tracking-tight text-white">Top</a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <a href="#what-i-do" className="hover:text-white">What I do</a>
          <a href="#story" className="hover:text-white">Story</a>
          <a href="#experience" className="hover:text-white">Experience</a>

          {/* Matrix toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Matrix</span>
            <button
              onClick={() => onChangeBg?.('matrix')}
              className={`rounded px-2 py-1 text-xs border ${currentBg === 'matrix' ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white/40'}`}
              aria-pressed={currentBg === 'matrix'}
            >
              On
            </button>
            <button
              onClick={() => onChangeBg?.('off')}
              className={`rounded px-2 py-1 text-xs border ${currentBg === 'off' ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white/40'}`}
              aria-pressed={currentBg === 'off'}
            >
              Off
            </button>
          </div>

          <a href="mailto:hello@iamnaman.in" className="rounded px-3 py-1.5 bg-white text-black font-medium">
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(s => !s)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded border border-white/15 text-white"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <>
          {/* Dimmer */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Sheet */}
          <div className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-xs bg-neutral-900/95 border-l border-white/10 shadow-xl p-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded border border-white/15 text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-4 text-sm">
              <a href="#what-i-do" onClick={() => setOpen(false)} className="text-neutral-200 hover:text-white">
                What I do
              </a>
              <a href="#story" onClick={() => setOpen(false)} className="text-neutral-200 hover:text-white">
                Story
              </a>
              <a href="#experience" onClick={() => setOpen(false)} className="text-neutral-200 hover:text-white">
                Experience
              </a>

              <div className="mt-2 pt-2 border-t border-white/10">
                <div className="text-xs text-neutral-400 mb-2">Matrix background</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { onChangeBg?.('matrix'); setOpen(false) }}
                    className={`rounded px-3 py-1.5 text-xs border ${currentBg === 'matrix' ? 'bg-white text-black border-white' : 'border-white/20 text-neutral-200 hover:border-white/40'}`}
                    aria-pressed={currentBg === 'matrix'}
                  >
                    On
                  </button>
                  <button
                    onClick={() => { onChangeBg?.('off'); setOpen(false) }}
                    className={`rounded px-3 py-1.5 text-xs border ${currentBg === 'off' ? 'bg-white text-black border-white' : 'border-white/20 text-neutral-200 hover:border-white/40'}`}
                    aria-pressed={currentBg === 'off'}
                  >
                    Off
                  </button>
                </div>
              </div>

              <a
                href="mailto:hello@iamnaman.in"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded px-3 py-2 bg-white text-black font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
