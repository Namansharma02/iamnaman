'use client'

import { useState } from 'react'

export default function SimpleMobileNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const goToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style jsx>{`
        .mobile-nav {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 60px !important;
          background: #000000 !important;
          z-index: 99999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 0 20px !important;
        }
        
        .mobile-nav img {
          width: 40px !important;
          height: 40px !important;
          border-radius: 50% !important;
        }
        
        .mobile-nav button {
          background: transparent !important;
          border: none !important;
          color: white !important;
          font-size: 24px !important;
          cursor: pointer !important;
        }
        
        .mobile-menu {
          position: fixed !important;
          top: 60px !important;
          left: 0 !important;
          right: 0 !important;
          background: #000000 !important;
          z-index: 99998 !important;
          padding: 20px !important;
        }
        
        .mobile-menu button {
          display: block !important;
          width: 100% !important;
          text-align: left !important;
          padding: 15px 0 !important;
          background: transparent !important;
          border: none !important;
          color: white !important;
          font-size: 20px !important;
          cursor: pointer !important;
          border-bottom: 1px solid #333 !important;
        }
        
        .mobile-menu button:hover {
          color: #3b82f6 !important;
        }
        
        @media (min-width: 1024px) {
          .mobile-nav, .mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      {/* Mobile Navigation Bar */}
      <div className="mobile-nav">
        <button onClick={goToTop}>
          <img src="/naman-avatar-light.png" alt="Home" />
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => goToSection('about')}>About</button>
          <button onClick={() => goToSection('experience')}>Experience</button>
          <button onClick={() => goToSection('projects')}>Projects</button>
          <button onClick={() => goToSection('skills')}>Skills</button>
          <button onClick={() => goToSection('photography')}>Photography</button>
          <button onClick={() => goToSection('contact')}>Contact</button>
        </div>
      )}

      {/* Backdrop */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0,0,0,0.5)',
            zIndex: '99997'
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}