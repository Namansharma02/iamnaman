'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { about } from '@/lib/content'
import ScrollFloat from '@/components/animations/ScrollFloat'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section 
      id="about" 
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-surface/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <ScrollFloat containerClassName="mb-4">
            {about.headline}
          </ScrollFloat>
          
          {/* Decorative Marquee Line */}
          <div className="relative h-1 bg-border rounded-full overflow-hidden mt-8 max-w-xs mx-auto">
            <motion.div
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand to-transparent rounded-full"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait - Desktop: Left, Mobile: Top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.95, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative group">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-2xl overflow-hidden">
                {/* Image placeholder until loaded */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-surface border border-border rounded-2xl flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                
                <Image
                  src="/portrait.jpg"
                  alt={about.portraitAlt}
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 768px) 320px, 384px"
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-brand rounded-full opacity-40" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-8 order-1 lg:order-2"
          >
            <div className="prose prose-lg lg:prose-xl max-w-none">
              {about.content.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  className="text-text leading-relaxed mb-6 text-lg sm:text-xl"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats or Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              {[
                { label: "Years Experience", value: "5+" },
                { label: "Professionals Trained", value: "500+" },
                { label: "Awards Received", value: "8+" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-brand mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-subtle font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgb(var(--color-brand)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  )
}