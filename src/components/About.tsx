'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { about } from '@/lib/content'
import ScrollFloat from '@/components/animations/ScrollFloat'
import DecryptedText from '@/components/DecryptedText'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section
      id="about"
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-background relative overflow-hidden z-10 rounded-t-3xl shadow-2xl"
      style={{ marginTop: '60vh' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4">
            <DecryptedText
              text={about.headline}
              animateOn="view"
              loopInterval={5000}
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
            className="lg:col-span-4 flex justify-center lg:justify-start order-1"
          >
            <div className="relative group">
              <div className="relative w-96 h-96 sm:w-[28rem] sm:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-2xl overflow-hidden">
                {/* Image placeholder until loaded */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-surface border border-border rounded-2xl flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                
                <Image
                  src="/About_Photo.png"
                  alt={about.portraitAlt}
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 920px) 520px, 520px"
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
            className="lg:col-span-8 order-2"
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
              className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8"
            >
              {[
                { label: "Photos Clicked", value: "∞" },
                { label: "Years Experience", value: "6+" },
                { label: "Hours Saved Annually", value: "1300+" },
                { label: "Global Professionals Impacted", value: "500+" },
                { label: "Professionals Mentored", value: "200+" },
                { label: "Awards & Recognitions", value: "50+" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-brand mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-subtle font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
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