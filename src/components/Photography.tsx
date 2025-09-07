'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Camera, Gamepad2, Film, Music, Award, ExternalLink } from 'lucide-react'
import { photography } from '@/lib/content'
import ScrollFloat from '@/components/animations/ScrollFloat'

const passionIcons = {
  'Photography': Camera,
  'Gaming': Gamepad2,
  'Cinema': Film,
  'Music': Music
}

const photographyGallery = [
  {
    src: '/photography/photo-1.jpg',
    alt: 'Street photography featured in Lonely Planet',
    title: 'Urban Exploration',
    publication: 'Lonely Planet Magazine'
  },
  {
    src: '/photography/photo-2.jpg',
    alt: 'Corporate photography for JPMorgan Chase',
    title: 'Corporate Portfolio',
    publication: 'JPMorgan Homepage'
  },
  {
    src: '/photography/photo-3.jpg',
    alt: 'Travel photography from India',
    title: 'Cultural Heritage',
    publication: 'Personal Collection'
  },
  {
    src: '/photography/photo-4.jpg',
    alt: 'Architectural photography',
    title: 'Modern Architecture',
    publication: 'Personal Collection'
  }
]

interface PassionCardProps {
  item: typeof photography.items[0]
  index: number
  isInView: boolean
}

function PassionCard({ item, index, isInView }: PassionCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = passionIcons[item.title as keyof typeof passionIcons]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-background border border-border rounded-xl p-6 hover:border-brand hover:shadow-lg transition-all duration-300">
        <div className="flex items-start space-x-4">
          <motion.div
            animate={{ 
              rotate: isHovered ? 5 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 p-3 bg-brand/10 rounded-lg"
          >
            <Icon size={20} className="text-brand" />
          </motion.div>
          
          <div>
            <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-brand transition-colors">
              {item.title}
            </h3>
            <p className="text-subtle text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface PhotoCardProps {
  photo: typeof photographyGallery[0]
  index: number
  isInView: boolean
}

function PhotoCard({ photo, index, isInView }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface border border-border">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
        
        {/* Content */}
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
        >
          <h4 className="font-semibold mb-1">{photo.title}</h4>
          <div className="flex items-center gap-2">
            <Award size={14} />
            <span className="text-xs opacity-90">{photo.publication}</span>
          </div>
        </motion.div>

        {/* External Link Icon */}
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white"
        >
          <ExternalLink size={14} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Photography() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      id="photography" 
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-surface/30 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollFloat containerClassName="mb-6">
            {photography.headline}
          </ScrollFloat>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed"
          >
            Beyond technology, I find inspiration in creative pursuits that fuel my curiosity and keep me connected to the world.
          </motion.p>
        </div>

        {/* Featured Photography Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-text mb-4">Featured Work</h3>
            <p className="text-subtle">Photography that has been recognized and published</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photographyGallery.map((photo, index) => (
              <PhotoCard
                key={photo.title}
                photo={photo}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Passions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-text mb-4">Creative Pursuits</h3>
            <p className="text-subtle">Interests that inspire and energize me outside of work</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photography.items.map((item, index) => (
              <PassionCard
                key={item.title}
                item={item}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand/5 to-brand/10 rounded-2xl p-8 border border-brand/20">
            <blockquote className="text-2xl sm:text-3xl font-light text-text leading-relaxed mb-6">
              "Creativity has always been my compass. Whether through code, camera, or strategy, 
              I believe the best solutions emerge when technical precision meets creative vision."
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <Camera size={20} className="text-brand" />
              <span className="text-sm font-medium text-brand">Creative Philosophy</span>
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