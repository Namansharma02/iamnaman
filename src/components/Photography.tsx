'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import DecryptedText from '@/components/DecryptedText'
import { photography } from '@/lib/content'

const allPhotos = [
  '/photography/1 (1).jpg',
  '/photography/1 (1).png',
  '/photography/1 (2).jpg',
  '/photography/1 (2).png',
  '/photography/1 (3).jpg',
  '/photography/1 (3).png',
  '/photography/1 (4).jpg',
  '/photography/1 (4).png',
  '/photography/1 (5).jpg',
  '/photography/1 (5).png',
  '/photography/1 (6).jpg',
  '/photography/1 (6).png',
  '/photography/1 (7).jpg',
  '/photography/1 (8).jpg',
  '/photography/2 (1).png',
  '/photography/2 (2).jpg',
  '/photography/2 (2).png',
  '/photography/2 (3).jpg',
  '/photography/2 (3).png',
  '/photography/2 (4).jpg',
  '/photography/2 (4).png',
  '/photography/2 (5).jpg',
  '/photography/2 (5).png',
  '/photography/2 (6).jpg',
  '/photography/2 (6).png',
  '/photography/2 (7).jpg',
  '/photography/2 (8).jpg',
  '/photography/3 (1).jpg',
  '/photography/3 (1).png',
  '/photography/3 (2).jpg',
  '/photography/3 (2).png',
  '/photography/3 (3).jpg',
  '/photography/3 (3).png',
  '/photography/3 (4).jpg',
  '/photography/3 (4).png',
  '/photography/3 (5).jpg',
  '/photography/3 (5).png',
  '/photography/3 (6).jpg',
  '/photography/3 (6).png',
  '/photography/3 (7).jpg',
  '/photography/3 (8).jpg',
]

// Split photos into two rows
const row1Photos = allPhotos.filter((_, i) => i % 2 === 0)
const row2Photos = allPhotos.filter((_, i) => i % 2 !== 0)

interface MarqueeRowProps {
  photos: string[]
  direction: 1 | -1 // 1 = left-to-right, -1 = right-to-left
  speed?: number
}

function MarqueeRow({ photos, direction, speed = 0.5 }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(direction * speed)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragOffsetStartRef = useRef(0)
  const lastDragXRef = useRef(0)
  const lastDragTimeRef = useRef(0)
  const dragVelocityRef = useRef(0)
  const rafRef = useRef<number>(0)
  const singleSetWidthRef = useRef(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const clickCandidateRef = useRef(true)

  // Measure one set of images width
  useEffect(() => {
    if (!trackRef.current) return
    const items = trackRef.current.querySelectorAll('.marquee-item')
    const perSet = photos.length
    let w = 0
    for (let i = 0; i < perSet && i < items.length; i++) {
      w += (items[i] as HTMLElement).offsetWidth + 12 // 12px gap
    }
    singleSetWidthRef.current = w
  }, [photos.length])

  // Animation loop
  useEffect(() => {
    let lastTime = performance.now()

    const animate = (now: number) => {
      const dt = Math.min(now - lastTime, 50) // cap delta
      lastTime = now

      if (!isDraggingRef.current) {
        // Ease velocity back toward natural direction
        const target = direction * speed
        velocityRef.current += (target - velocityRef.current) * 0.02
        offsetRef.current += velocityRef.current * dt * 0.06
      }

      // Wrap offset to prevent overflow
      const setW = singleSetWidthRef.current
      if (setW > 0) {
        if (offsetRef.current > 0) offsetRef.current -= setW
        if (offsetRef.current < -setW) offsetRef.current += setW
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [direction, speed])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true
    clickCandidateRef.current = true
    dragStartXRef.current = e.clientX
    dragOffsetStartRef.current = offsetRef.current
    lastDragXRef.current = e.clientX
    lastDragTimeRef.current = performance.now()
    dragVelocityRef.current = 0
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return

    const dx = e.clientX - dragStartXRef.current
    if (Math.abs(dx) > 5) clickCandidateRef.current = false

    offsetRef.current = dragOffsetStartRef.current + dx

    // Track drag velocity
    const now = performance.now()
    const dtDrag = now - lastDragTimeRef.current
    if (dtDrag > 0) {
      dragVelocityRef.current = (e.clientX - lastDragXRef.current) / dtDrag
    }
    lastDragXRef.current = e.clientX
    lastDragTimeRef.current = now
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    // Apply fling velocity then let it ease back to auto-scroll
    velocityRef.current = dragVelocityRef.current * 15
  }, [])

  const handleImageClick = useCallback((src: string) => {
    if (clickCandidateRef.current) {
      setSelectedImage(src)
    }
  }, [])

  // Render 3 copies for seamless looping
  const tripled = [...photos, ...photos, ...photos]

  return (
    <>
      <div className="overflow-hidden select-none touch-pan-y" style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}>
        <div
          ref={trackRef}
          className="flex gap-3 will-change-transform"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'pan-y' }}
        >
          {tripled.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="marquee-item flex-shrink-0 rounded-xl overflow-hidden relative"
              style={{ width: 280, height: 200 }}
              onClick={() => handleImageClick(src)}
            >
              <Image
                src={src}
                alt="Photography"
                fill
                className="object-cover pointer-events-none"
                sizes="280px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl font-light hover:opacity-70 transition-opacity z-10"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <div className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto">
            <Image
              src={selectedImage}
              alt="Photography enlarged"
              width={1200}
              height={900}
              className="object-contain max-h-[85vh] w-auto rounded-lg"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function Photography() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section
      id="photography"
      ref={ref}
      className="snap-section relative z-10 bg-background"
    >
      {/* Section Header */}
      <div className="text-center pt-16 sm:pt-20 lg:pt-24 pb-8 px-6 relative z-10">
        <div className="mb-6">
          <DecryptedText
            text={photography.headline}
            animateOn="view"
            loopInterval={10000}
            sequential={true}
            revealDirection="center"
            speed={60}
            className="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-text"
            encryptedClassName="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-brand"
          />
        </div>
      </div>

      {/* Photo Marquee Rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-3 relative"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-background to-transparent" />

        <MarqueeRow photos={row1Photos} direction={1} speed={0.5} />
        <MarqueeRow photos={row2Photos} direction={-1} speed={0.5} />
      </motion.div>

      {/* Quote Section with Featured Photo */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Featured Photo - Desktop: Right, Mobile: Top */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border shadow-lg">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                <Image
                  src="/photography/feature/featured-quote.jpg"
                  alt="Featured photography"
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>
            </div>

            {/* Quote - Desktop: Left, Mobile: Bottom */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-r from-brand/5 to-brand/10 rounded-2xl p-8 lg:p-10 border border-brand/20">
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-text leading-relaxed mb-6 break-words">
                  &ldquo;Creativity has always been my compass. Whether through code, camera or strategy,
                  I believe the best solutions emerge when technical precision meets creative vision.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 75% 25%, rgb(var(--color-brand)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
    </section>
  )
}
