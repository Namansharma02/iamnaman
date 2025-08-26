'use client'

import { useEffect, useRef } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  // >>> TWEAK THIS NUMBER to change blur amount (in pixels)
  const BLUR_PX = 0  // try 0, 4, 8, 12, 16

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })

    const glyphs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+<>?'
    const cell = 40
    const fontSize = 18
    const lensRadius = 150
    const maxZoom = 2.5
    const bgColor = '#0a0a0a'
    const glyphColor = '#e8e8e8'

    let cw = 0, ch = 0, cols = 0, rows = 0
    let grid = []
    let dpr = 1

    let mouseX = -9999
    let mouseY = -9999
    let mouseActive = false

    const randChar = () => glyphs[(Math.random() * glyphs.length) | 0]

    function rebuildGrid() {
      cols = Math.ceil(cw / cell) + 2
      rows = Math.ceil(ch / cell) + 2
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => randChar())
      )
    }

    function resize() {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const rect = canvas.getBoundingClientRect()
      cw = rect.width
      ch = rect.height
      canvas.width = Math.floor(cw * dpr)
      canvas.height = Math.floor(ch * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      rebuildGrid()
    }

    function draw() {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, cw, ch)

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
      ctx.textBaseline = 'top'
      ctx.fillStyle = glyphColor

      for (let r = 0; r < rows; r++) {
        const y = r * cell
        for (let c = 0; c < cols; c++) {
          const x = c * cell

          let scale = 1
          if (mouseActive) {
            const dx = mouseX - x
            const dy = mouseY - y
            const d = Math.hypot(dx, dy)
            if (d < lensRadius) {
              const k = 1 - d / lensRadius
              scale = 1 + k * (maxZoom - 1)
            }
          }

          if (scale !== 1) {
            ctx.save()
            ctx.translate(x, y)
            ctx.scale(scale, scale)
            ctx.fillText(grid[r][c], 0, 0)
            ctx.restore()
          } else {
            ctx.fillText(grid[r][c], x, y)
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      mouseActive = true
    }
    function onLeave() {
      mouseActive = false
      mouseX = -9999
      mouseY = -9999
    }
    function onTouchMove(e) {
      const t = e.touches?.[0]
      if (!t) return
      const rect = canvas.getBoundingClientRect()
      mouseX = t.clientX - rect.left
      mouseY = t.clientY - rect.top
      mouseActive = true
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onLeave, { passive: true })

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onLeave)
    }
  }, [])

  return (
    <div
   className="absolute inset-0 pointer-events-none"
   style={{ zIndex: -1 }}
 >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          display: 'block',
          filter: `blur(${BLUR_PX}px)`,     // << blur applied here
          willChange: 'filter',
        }}
      />
    </div>
  )
}
