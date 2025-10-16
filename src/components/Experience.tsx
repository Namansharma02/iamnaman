'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { experience } from '@/lib/content'
import DecryptedText from '@/components/DecryptedText'

interface TimelineItemProps {
  item: typeof experience[0]
  index: number
  isInView: boolean
}

function TimelineItem({ item, index, isInView }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className="relative"
    >
      {/* Timeline Connector */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden lg:block" />
      
      {/* Timeline Node */}
      <div className="absolute left-6 top-8 w-4 h-4 bg-brand rounded-full border-4 border-background shadow-lg hidden lg:block" />

      {/* Content Card */}
      <div className={`lg:pl-20 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-20'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
          className="bg-background border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Calendar size={16} className="text-brand" />
              <span className="text-sm font-medium text-brand">{item.period}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-text mb-2">{item.company}</h3>
            <h4 className="text-xl text-brand font-semibold mb-4">{item.role}</h4>
          </div>

          {/* Summary */}
          <p className="text-text/90 leading-relaxed text-lg">
            {item.summary}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      id="experience" 
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-background relative z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <DecryptedText
              text="Experience"
              animateOn="view"
              loopInterval={10000}
              sequential={true}
              revealDirection="center"
              speed={60}
              className="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-text"
              encryptedClassName="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-brand"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed"
          >
            A journey through technology, leadership, and continuous learning
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experience.map((item, index) => (
            <div key={item.id} className="mb-16 last:mb-0">
              <TimelineItem
                item={item}
                index={index}
                isInView={isInView}
              />
            </div>
          ))}
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-subtle text-lg mb-6">
            For detailed information about my experience and achievements
          </p>
          <motion.a
            href="/resume.pdf"
            download="Naman_Sharma_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-brand/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-gradient-to-tr from-brand/5 to-transparent rounded-full blur-2xl" />
    </section>
  )
}