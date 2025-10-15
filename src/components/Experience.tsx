'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Award, Users, TrendingUp } from 'lucide-react'
import { experience } from '@/lib/content'
import ScrollFloat from '@/components/animations/ScrollFloat'
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
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.badges.map((badge, badgeIndex) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + badgeIndex * 0.1 }}
                  className="px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full border border-brand/20"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Summary */}
          <p className="text-text/90 leading-relaxed mb-6 text-lg">
            {item.summary}
          </p>

          {/* Collaboration (if exists) */}
          {item.collaboration && (
            <div className="mb-6 p-4 bg-surface rounded-lg border-l-4 border-brand">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-brand" />
                <span className="text-sm font-medium text-brand">Collaboration</span>
              </div>
              <p className="text-text/90">{item.collaboration}</p>
            </div>
          )}

          {/* Key Highlights */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-brand" />
              <h5 className="font-semibold text-text">Key Highlights</h5>
            </div>
            <div className="space-y-4">
              {item.highlights.map((highlight, highlightIndex) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + highlightIndex * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-brand rounded-full mt-2" />
                  <div>
                    <h6 className="font-medium text-text mb-1">{highlight.title}</h6>
                    <p className="text-subtle text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing (if exists) */}
          {item.closing && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Award size={16} className="text-brand mt-1" />
                <p className="text-text/90 italic leading-relaxed">
                  {item.closing}
                </p>
              </div>
            </div>
          )}
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
              className="text-[clamp(3rem,9vw,7rem)] leading-[1.2] font-bold text-text"
              encryptedClassName="text-[clamp(3rem,9vw,7rem)] leading-[1.2] font-bold text-brand"
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
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-brand/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-gradient-to-tr from-brand/5 to-transparent rounded-full blur-2xl" />
    </section>
  )
}