'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X } from 'lucide-react'
import DecryptedText from '@/components/DecryptedText'
import { appreciations } from '@/lib/content'

export default function Recognition() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [modalClickedId, setModalClickedId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalRecognitions = appreciations.items.length

  // Truncate text to first few words
  const truncateText = (text: string, wordCount: number = 8) => {
    const words = text.split(' ')
    if (words.length <= wordCount) return text
    return words.slice(0, wordCount).join(' ') + '...'
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

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
                "{truncateText(item.text)}"
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
                <p className="text-base text-text leading-relaxed italic">
                  "{item.text}"
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
      className="relative py-24 sm:py-32 lg:py-40 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Testimonials - Show first 4 as full cards */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {appreciations.items.slice(0, 4).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-surface border border-border rounded-2xl p-8 hover:border-brand hover:shadow-xl transition-all duration-300"
              >
                <blockquote className="text-text text-lg leading-relaxed mb-6 italic">
                  "{item.text}"
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
    </section>
  )
}
