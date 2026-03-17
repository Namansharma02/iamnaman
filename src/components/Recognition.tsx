'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, Trophy, Medal } from 'lucide-react'
import Image from 'next/image'
import DecryptedText from '@/components/DecryptedText'
import { appreciations, award } from '@/lib/content'

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

        {/* Top 4 Testimonial Cards — 2-column grid */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {appreciations.items.slice(0, 4).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.15 }}
                className="bg-surface border border-border rounded-2xl p-8 hover:border-brand hover:shadow-xl transition-all duration-300"
              >
                <blockquote className="text-text text-lg leading-relaxed mb-6 italic break-words">
                  &ldquo;{item.text}&rdquo;
                </blockquote>

                <div className="flex items-center space-x-4 border-t border-border pt-6">
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                    <span className="text-brand font-bold text-lg">
                      {item.from.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-text font-semibold">{item.from}</h4>
                    <p className="text-brand text-sm font-medium">{item.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All {totalRecognitions}+ Recognitions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
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
