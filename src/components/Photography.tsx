'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import { photography } from '@/lib/content'
import DecryptedText from '@/components/DecryptedText'
import InfinitePhotoReel from '@/components/InfinitePhotoReel'

interface PhotographyProps {
  photos: Array<{
    src: string
    alt: string
    title: string
  }>
}

export default function Photography({ photos }: PhotographyProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section
      id="photography"
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-background relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
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
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed"
          >
            Beyond technology, I find inspiration in creative pursuits that fuel my curiosity and keep me connected to the world.
          </motion.p>
        </div>

        {/* Infinite Photo Reel */}
        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mb-20"
          >
            <InfinitePhotoReel photos={photos} speed={300} />
          </motion.div>
        )}

        {/* Quote Section with Featured Photo */}
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
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-text leading-relaxed mb-6">
                  "Creativity has always been my compass. Whether through code, camera, or strategy,
                  I believe the best solutions emerge when technical precision meets creative vision."
                </blockquote>
                {/* <div className="flex items-center space-x-3">
                  <Camera size={20} className="text-brand" />
                  <span className="text-sm font-medium text-brand">Creative Philosophy</span>
                </div> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 75% 25%, rgb(var(--color-brand)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
    </section>
  )
}