"use client"

import { useEffect, useRef } from 'react'

export default function CodePeepOverlay({ open, code = '', radiusDesktop = 120, radiusMobile = 160, feather = 28, zoomDesktop = 1.06, zoomMobile = 1.08 }) {
  const ref = useRef(null)
  const pos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })
  const target = useRef({ x: pos.current.x, y: pos.current.y })
  const raf = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const applyDims = () => {
      const isMobile = window.innerWidth < 768
      el.style.setProperty('--peepR', (isMobile ? radiusMobile : radiusDesktop) + 'px')
      el.style.setProperty('--peepFeather', feather + 'px')
      el.style.setProperty('--zoom', String(isMobile ? zoomMobile : zoomDesktop))
    }

    const setVars = () => {
      el.style.setProperty('--peepX', pos.current.x + 'px')
      el.style.setProperty('--peepY', pos.current.y + 'px')
    }

    const tick = () => {
      // smooth follow
      pos.current.x += (target.current.x - pos.current.x) * 0.18
      pos.current.y += (target.current.y - pos.current.y) * 0.18
      setVars()
      raf.current = requestAnimationFrame(tick)
    }

    const onMove = e => {
      if (e.touches && e.touches[0]) {
        target.current.x = e.touches[0].clientX
        target.current.y = e.touches[0].clientY
      } else {
        target.current.x = e.clientX
        target.current.y = e.clientY
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchstart', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('resize', applyDims)

    applyDims()
    raf.current = requestAnimationFrame(tick)
    setVars()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('resize', applyDims)
    }
  }, [radiusDesktop, radiusMobile, feather, zoomDesktop, zoomMobile])

  return (
    <div ref={ref} className={`code-peep ${open ? 'is-open' : ''}`} aria-hidden>
      <pre className="inner">{code}</pre>
    </div>
  )
}