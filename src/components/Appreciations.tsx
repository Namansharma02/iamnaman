'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DecryptedText from '@/components/DecryptedText'
import { appreciations } from '@/lib/content'

export default function Appreciations() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Truncate text to first few words
  const truncateText = (text: string, wordCount: number = 8) => {
    const words = text.split(' ')
    if (words.length <= wordCount) return text
    return words.slice(0, wordCount).join(' ') + '...'
  }

  return (
    <section
      id="appreciations"
      className="relative py-24 sm:py-32 lg:py-40 bg-background"
      style={{ marginTop: '60vh' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4">
            <DecryptedText
              text={appreciations.headline}
              animateOn="view"
              loopInterval={10000}
              sequential={true}
              revealDirection="center"
              speed={60}
              className="text-[clamp(3rem,9vw,7rem)] leading-[1.2] font-bold text-text"
              encryptedClassName="text-[clamp(3rem,9vw,7rem)] leading-[1.2] font-bold text-brand"
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
        </div>

        {/* Appreciations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appreciations.items.map((item, index) => {
            const isHovered = hoveredId === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative"
                style={{
                  zIndex: isHovered ? 10 : 1,
                }}
              >
                <AnimatePresence mode="wait">
                  {!isHovered ? (
                    // Collapsed pill view
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative bg-surface border border-border rounded-full px-6 py-3 shadow-sm hover:shadow-md cursor-pointer"
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
          })}
        </div>
      </div>
    </section>
  )
}
