'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, Trophy, Medal } from 'lucide-react'
import Image from 'next/image'
import DecryptedText from '@/components/DecryptedText'
import { appreciations, award } from '@/lib/content'

/* ------------------------------------------------------------------ */
/*  Carousel sub-component                                             */
/* ------------------------------------------------------------------ */

function useSwipe(onNext: () => void, onPrev: () => void) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const deltaRef = useRef({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState(0)
  const isDragging = useRef(false)

  const onTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    touchStart.current = { x: clientX, y: clientY }
    deltaRef.current = { x: 0, y: 0 }
    isDragging.current = true
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStart.current || !isDragging.current) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    deltaRef.current = {
      x: clientX - touchStart.current.x,
      y: clientY - touchStart.current.y,
    }
    const isMobile = window.innerWidth <= 640
    setDragOffset(isMobile ? deltaRef.current.y : deltaRef.current.x)
  }, [])

  const onTouchEnd = useCallback(() => {
    isDragging.current = false
    const threshold = 50
    const isMobile = window.innerWidth <= 640
    const delta = isMobile ? deltaRef.current.y : deltaRef.current.x
    if (delta < -threshold) onNext()
    else if (delta > threshold) onPrev()
    touchStart.current = null
    deltaRef.current = { x: 0, y: 0 }
    setDragOffset(0)
  }, [onNext, onPrev])

  return { dragOffset, onTouchStart, onTouchMove, onTouchEnd }
}

function TestimonialsCarousel({
  items,
  totalRecognitions,
  onViewAll,
}: {
  items: typeof appreciations.items
  totalRecognitions: number
  onViewAll: () => void
}) {
  const displayItems = items.slice(0, 10)
  const total = displayItems.length
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setExpandedCard(null)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 500)
    },
    [isAnimating],
  )

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo])
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo])

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(next, 8000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPaused, next])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const { dragOffset, onTouchStart, onTouchMove, onTouchEnd } = useSwipe(next, prev)

  const getOffset = (index: number) => {
    let diff = index - current
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  return (
    <>
      <style>{`
        .rc-stage {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-x;
          user-select: none;
          margin: 0 auto;
        }
        .rc-card {
          position: absolute;
          width: 92%;
          max-width: 800px;
          background: #fffdf9;
          border: 1px solid #e6ddd0;
          border-radius: 20px;
          padding: 2.5rem 2.2rem 2rem;
          box-shadow: 0 4px 24px rgba(60,46,28,0.06), 0 1px 4px rgba(60,46,28,0.04);
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.5s ease;
          will-change: transform, opacity, filter;
        }
        .rc-card[data-offset="0"] { z-index:10; transform:translateX(0) scale(1); opacity:1; filter:blur(0); }
        .rc-card[data-offset="-1"] { z-index:5; transform:translateX(-105%) scale(0.85); opacity:0.4; filter:blur(3px); pointer-events:none; }
        .rc-card[data-offset="1"] { z-index:5; transform:translateX(105%) scale(0.85); opacity:0.4; filter:blur(3px); pointer-events:none; }
        .rc-card[data-offset="-2"], .rc-card[data-offset="2"] { z-index:2; opacity:0; pointer-events:none; }
        .rc-card[data-offset="-2"] { transform:translateX(-120%) scale(0.78); }
        .rc-card[data-offset="2"] { transform:translateX(120%) scale(0.78); }
        .rc-card.rc-hidden { opacity:0; pointer-events:none; z-index:0; transform:translateX(0) scale(0.7); }
        .rc-readmore { display: none; }
        .rc-text-clamp { }

        @media (min-width: 641px) {
          .rc-stage { height: auto; min-height: 420px; }
          .rc-card { max-width: 860px; }
          .rc-text-clamp { display: -webkit-box !important; -webkit-line-clamp: unset !important; -webkit-box-orient: vertical !important; overflow: visible !important; }
          .rc-readmore { display: none !important; }
        }
        @media (max-width: 640px) {
          .rc-stage { height:440px; perspective:1200px; }
          .rc-readmore { display: block; }
          .rc-card { width:92%; padding:2rem 1.5rem 1.5rem; border-radius:16px; left:4%; }
          .rc-card[data-offset="0"] { z-index:10; transform:translateY(60px) scale(1); opacity:1; filter:blur(0); background:#fffdf9; box-shadow:0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06); }
          .rc-card[data-offset="-1"], .rc-card[data-offset="1"] { z-index:8; transform:translateY(20px) scale(0.92) translateX(0); opacity:0.55; filter:blur(2px); pointer-events:none; }
          .rc-card[data-offset="-2"], .rc-card[data-offset="2"] { z-index:6; transform:translateY(-14px) scale(0.84) translateX(0); opacity:0.3; filter:blur(4px); pointer-events:none; }
          .rc-card.rc-hidden { transform:translateY(-40px) scale(0.76) translateX(0); opacity:0; pointer-events:none; z-index:0; }
          .rc-arrows { display:none !important; }
          .rc-dots { display:none !important; }
        }
        @media (min-width: 641px) {
          .rc-mobile-counter { display:none !important; }
        }
      `}</style>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Stage */}
        <div
          className="rc-stage"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onTouchStart}
          onMouseMove={onTouchMove}
          onMouseUp={onTouchEnd}
          onMouseLeave={onTouchEnd}
        >
          {displayItems.map((item, i) => {
            const offset = getOffset(i)
            const absOffset = Math.abs(offset)
            const isVisible = absOffset <= 2

            let extraStyle: React.CSSProperties | undefined
            if (offset === 0 && dragOffset !== 0) {
              const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 640
              extraStyle = {
                transform: `${isMobileView ? `translateY(${60 + dragOffset}px)` : `translateX(${dragOffset}px)`} scale(1)`,
                transition: 'none',
              }
            }

            return (
              <div
                key={item.id}
                className={`rc-card ${!isVisible ? 'rc-hidden' : ''}`}
                data-offset={isVisible ? offset : undefined}
                style={{ ...extraStyle, ...(expandedCard === item.id ? { maxHeight: '80vh', overflowY: 'auto' as const } : {}) }}
              >
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '5rem', lineHeight: 1, color: '#d4c9b8', position: 'absolute', top: '0.6rem', left: '1.6rem', pointerEvents: 'none', opacity: 0.5 }}>&ldquo;</span>
                <p className="rc-text-clamp" style={{
                  fontSize: 'clamp(0.95rem, 2.2vw, 1.12rem)', fontWeight: 400, lineHeight: 1.75, margin: '0 0 0.8rem', position: 'relative', zIndex: 1, color: '#3a3024',
                  ...(expandedCard === item.id ? {} : { display: '-webkit-box', WebkitLineClamp: 8, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' })
                }}>
                  {item.text}
                </p>
                {item.text.length > 280 && (
                  <button
                    className="rc-readmore"
                    onClick={(e) => { e.stopPropagation(); setExpandedCard(expandedCard === item.id ? null : item.id) }}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#6b5c4c', marginBottom: '0.8rem' }}
                  >
                    {expandedCard === item.id ? 'Read less' : 'Read more'}
                  </button>
                )}
                <hr style={{ width: 48, height: 2, background: '#d4c9b8', border: 'none', margin: '0 0 1rem' }} />
                <div>
                  <span style={{ fontWeight: 600, fontSize: '1rem', display: 'block', color: '#2c2418' }}>{item.from}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.03em', color: '#8a7d6e' }}>{item.company}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="rc-arrows w-12 h-12 rounded-full border border-border bg-surface text-subtle flex items-center justify-center hover:bg-text hover:text-background hover:border-text transition-all duration-200"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <div className="rc-dots flex gap-2 items-center">
            {displayItems.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full border-0 cursor-pointer transition-all duration-300 ${i === current ? 'bg-text w-6 h-2' : 'bg-border w-2 h-2 hover:bg-subtle'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <span className="rc-mobile-counter text-subtle text-sm font-semibold tracking-wide">{current + 1} / {total}</span>

          <button
            onClick={next}
            className="rc-arrows w-12 h-12 rounded-full border border-border bg-surface text-subtle flex items-center justify-center hover:bg-text hover:text-background hover:border-text transition-all duration-200"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </div>

        {/* Progress + View All */}
        <div className="flex flex-col items-center mt-6 gap-4">
          <div className="w-full max-w-[640px] h-0.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-text rounded-full transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
          </div>

          <p className="text-subtle text-sm">
            <strong className="text-text">{current + 1}</strong> of {total} &middot; showing a curated selection
          </p>

          <p className="text-subtle text-xs sm:hidden">Swipe up or down to navigate</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewAll}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All {totalRecognitions}+ Recognitions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default function Recognition() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [modalClickedId, setModalClickedId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAwardImageOpen, setIsAwardImageOpen] = useState(false)

  const totalRecognitions = appreciations.items.length

  // Truncate text to first few words
  const truncateText = (text: string, wordCount: number = 8) => {
    const words = text.split(' ')
    if (words.length <= wordCount) return text
    return words.slice(0, wordCount).join(' ') + '...'
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen || isAwardImageOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, isAwardImageOpen])

  const RecognitionPill = ({ item }: { item: typeof appreciations.items[0] }) => {
    const isExpanded = modalClickedId === item.id

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={() => setModalClickedId(modalClickedId === item.id ? null : item.id)}
        className="relative"
        style={{
          zIndex: isExpanded ? 10 : 1,
        }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed pill view
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative bg-surface border border-border rounded-full px-6 py-3 shadow-sm cursor-pointer"
            >
              <p className="text-sm text-text truncate italic">
                &ldquo;{truncateText(item.text)}&rdquo;
              </p>
            </motion.div>
          ) : (
            // Expanded card view
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative bg-surface border border-brand rounded-xl px-8 py-6 shadow-2xl cursor-pointer"
            >
              {/* Quote */}
              <div className="mb-6">
                <p className="text-base text-text leading-relaxed italic break-words">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Attribution */}
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-text mb-1 text-sm">
                  {item.from}
                </div>
                <div className="text-xs text-subtle">
                  {item.company}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <section
      id="recognition"
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4">
            <DecryptedText
              text="Testimonials & Recognitions"
              animateOn="view"
              loopInterval={10000}
              sequential={true}
              revealDirection="center"
              speed={60}
              className="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-text"
              encryptedClassName="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-brand"
            />
          </div>

          {/* Decorative Marquee Line */}
          <div className="relative h-1 bg-border rounded-full overflow-hidden mt-8 max-w-xs mx-auto">
            <motion.div
              className="absolute inset-0 bg-brand"
              initial={{ x: '-100%' }}
              whileInView={{ x: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-subtle text-lg max-w-2xl mx-auto"
          >
            {totalRecognitions}+ recognitions from colleagues, managers, and leaders across my career journey
          </motion.p>
        </div>

        {/* Award Card — Full width horizontal pill */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-2xl border border-amber-300/50 shadow-lg"
            style={{ background: 'linear-gradient(170deg, #fefcf3 0%, #fdf6e3 40%, #faf0d1 100%)' }}
          >
            {/* Top ornamental line */}
            <div className="h-1.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />

            <div className="p-6 sm:p-8">
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                {/* Left: Image */}
                <div className="lg:col-span-2">
                  <div
                    className="relative rounded-xl overflow-hidden border-2 border-amber-400/30 shadow-md cursor-pointer group/img"
                    onClick={() => setIsAwardImageOpen(true)}
                  >
                    <Image
                      src={award.image}
                      alt={`${award.title} ${award.subtitle} — Naman Sharma`}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        View Full Image
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-3">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <Medal className="w-5 h-5 text-amber-700" />
                    <span className="text-amber-800 text-xs font-semibold tracking-widest uppercase">{award.badgeLabel}</span>
                    <div className="ml-auto w-10 h-10 rounded-full bg-amber-700/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-700" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-amber-950 mb-2 leading-normal tracking-tight">
                    {award.displayTitle}
                  </h3>
                  <div className="w-16 h-0.5 bg-amber-600/40 mb-4" />

                  <p className="text-amber-900/70 text-sm mb-5 leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
                    &ldquo;{award.reason}&rdquo;
                  </p>

                  {/* Org */}
                  <div className="mb-5">
                    <p className="text-amber-950 text-sm font-bold">{award.company}</p>
                    <p className="text-amber-900/70 text-xs">{award.title} — {award.subtitle}</p>
                  </div>

                  {/* Signatories — horizontal on desktop */}
                  <div className="border-t border-amber-400/30 pt-4">
                    <p className="text-amber-900/70 text-[10px] uppercase tracking-widest mb-3">Recognized by</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {award.signatories.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600/40 mt-1.5 shrink-0" />
                          <p className="text-xs leading-relaxed">
                            <span className="font-semibold text-amber-950">{s.initials}</span>
                            <span className="text-amber-900/70"> — {s.role}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <TestimonialsCarousel
          items={appreciations.items}
          totalRecognitions={totalRecognitions}
          onViewAll={() => setIsModalOpen(true)}
        />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-4 sm:inset-8 md:inset-16 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden z-[9999] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-2xl font-bold text-text">All {totalRecognitions} Recognitions</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-surface transition-colors"
                >
                  <X size={24} className="text-text" />
                </motion.button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                  {appreciations.items.map((item) => (
                    <RecognitionPill key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Award Image Lightbox */}
      <AnimatePresence>
        {isAwardImageOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAwardImageOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9998] cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-12 pointer-events-none"
            >
              <div className="relative max-w-4xl w-full pointer-events-auto">
                <Image
                  src={award.image}
                  alt={`${award.title} ${award.subtitle} — Naman Sharma`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAwardImageOpen(false)}
                  className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
