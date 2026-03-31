'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import DecryptedText from '@/components/DecryptedText'
import { photography } from '@/lib/content'
import DomeGallery from '@/components/reactbits/DomeGallery'

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

export default function Photography() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [imageLoaded, setImageLoaded] = useState(false)
  const getThemeColor = () => {
    if (typeof document === 'undefined') return '#ffffff'
    const theme = document.documentElement.getAttribute('data-theme')
    if (theme === 'dark') return '#09090b'
    if (theme === 'green') return '#f8fafc'
    return '#ffffff'
  }

  const [overlayColor, setOverlayColor] = useState(getThemeColor)

  // Sync overlay color with theme changes
  useEffect(() => {
    setOverlayColor(getThemeColor())
    const observer = new MutationObserver(() => setOverlayColor(getThemeColor()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

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

      {/* Dome Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ width: '100%', height: '80vh', position: 'relative' }}
      >
        <DomeGallery
          images={allPhotos}
          fit={1}
          minRadius={1000}
          maxVerticalRotationDeg={11}
          segments={30}
          dragDampening={2.5}
          grayscale={false}
          overlayBlurColor={overlayColor}
          openedImageWidth="500px"
          openedImageHeight="500px"
        />
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
