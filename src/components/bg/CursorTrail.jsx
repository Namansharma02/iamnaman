'use client'

import { useEffect, useRef } from 'react'

export default function CursorTrail({
  color = '255,255,255',
  headWidth = 1,        // smaller line
  tailMin = 1,          // smaller tail
  blur = 60,             // stronger glow
  maxStep = 0.7,         // tighter interpolation for smoothness
  decayPerSec = 1200,
  zIndex = 9,
  historySize = 20       // number of points kept for curve smoothing
}) {
  const viewRef = useRef(null)
  const rafRef = useRef(0)
  const unsubRef = useRef(() => {})

  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    const ctxOut = view.getContext('2d')
    const trail = document.createElement('canvas')
    const ctxTrail = trail.getContext('2d')

    let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let W = 0, H = 0

    // recent pointer positions for smooth curves
    const pts = []
    const pointer = { x: 0, y: 0, seen: false }

    function resize() {
      DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      W = window.innerWidth
      H = window.innerHeight

      view.width = Math.floor(W * DPR)
      view.height = Math.floor(H * DPR)
      view.style.width = W + 'px'
      view.style.height = H + 'px'
      ctxOut.setTransform(DPR, 0, 0, DPR, 0, 0)

      trail.width = Math.floor(W * DPR)
      trail.height = Math.floor(H * DPR)
      ctxTrail.setTransform(DPR, 0, 0, DPR, 0, 0)

      ctxOut.clearRect(0, 0, W, H)
      ctxTrail.clearRect(0, 0, W, H)
    }

    function pushPoint(x, y) {
      pts.push({ x, y })
      if (pts.length > historySize) pts.shift()
    }

    function setPointer(x, y) {
      pointer.x = x
      pointer.y = y
      pointer.seen = true
      pushPoint(x, y)
    }

    // draw a smooth path through points using mid point quadratic curves
    function drawSmoothPath(ctx) {
      if (pts.length < 2) return

      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowColor = `rgba(${color},0.9)`
      ctx.shadowBlur = blur
      ctx.strokeStyle = `rgba(${color},1)`

      // width eases from headWidth to tailMin along the path
      const n = pts.length
      const wHead = headWidth
      const wTail = tailMin

      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)

      for (let i = 1; i < n - 1; i++) {
        const p0 = pts[i]
        const p1 = pts[i + 1]
        const mx = (p0.x + p1.x) * 0.5
        const my = (p0.y + p1.y) * 0.5
        ctx.quadraticCurveTo(p0.x, p0.y, mx, my)
      }
      // last segment to the final point
      ctx.lineTo(pts[n - 1].x, pts[n - 1].y)

      // stroke in layers to fake width gradient without many paths
      // head
      ctx.lineWidth = wHead
      ctx.stroke()
      // mid
      ctx.lineWidth = (wHead + wTail) * 0.5
      ctx.globalAlpha = 0.7
      ctx.stroke()
      // tail
      ctx.lineWidth = wTail
      ctx.globalAlpha = 0.5
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // helper to interpolate extra points when the jump is large
    function addInterpolatedPoints(x0, y0, x1, y1) {
      const dx = x1 - x0
      const dy = y1 - y0
      const dist = Math.hypot(dx, dy)
      const steps = Math.max(1, Math.ceil(dist / maxStep))
      const ux = dx / steps
      const uy = dy / steps
      for (let i = 1; i <= steps; i++) {
        pushPoint(x0 + ux * i, y0 + uy * i)
      }
    }

    let prev = performance.now()
    let lastX = null
    let lastY = null

    function frame(now) {
      const dt = Math.max(0.001, (now - prev) / 1000)
      prev = now

      // alpha decay
      const fade = 1 - Math.exp(-decayPerSec * dt)
      ctxTrail.globalCompositeOperation = 'destination-out'
      ctxTrail.fillStyle = `rgba(0,0,0,${fade})`
      ctxTrail.fillRect(0, 0, W, H)

      if (pointer.seen) {
        // interpolate from last draw to current pointer to avoid sharp angles
        if (lastX != null && lastY != null) {
          addInterpolatedPoints(lastX, lastY, pointer.x, pointer.y)
        } else {
          pushPoint(pointer.x, pointer.y)
        }
        drawSmoothPath(ctxTrail)
        lastX = pointer.x
        lastY = pointer.y
      }

      ctxOut.globalCompositeOperation = 'source-over'
      ctxOut.clearRect(0, 0, W, H)
      ctxOut.drawImage(trail, 0, 0, W, H)

      rafRef.current = requestAnimationFrame(frame)
    }

    const onResize = () => resize()
    const onMouse = e => setPointer(e.clientX, e.clientY)
    const onTouchStart = e => { const t = e.touches?.[0]; if (t) setPointer(t.clientX, t.clientY) }
    const onTouchMove = e => { const t = e.touches?.[0]; if (t) setPointer(t.clientX, t.clientY) }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    unsubRef.current = () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }

    resize()
    setPointer(window.innerWidth * 0.5, window.innerHeight * 0.5)
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      unsubRef.current()
    }
  }, [color, headWidth, tailMin, blur, maxStep, decayPerSec, historySize])

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex, mixBlendMode: 'screen' }}
      aria-hidden="true"
    >
      <canvas ref={viewRef} className="h-full w-full" style={{ display: 'block' }} />
    </div>
  )
}
