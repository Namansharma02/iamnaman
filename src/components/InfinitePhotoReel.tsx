'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Photo {
  src: string
  alt: string
  title: string
}

interface InfinitePhotoReelProps {
  photos: Photo[]
  speed?: number // duration in seconds for one complete scroll
}

export default function InfinitePhotoReel({ photos, speed = 30 }: InfinitePhotoReelProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate photos array for seamless infinite loop
  const duplicatedPhotos = [...photos, ...photos]

  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{
          x: isPaused ? undefined : [0, -100 * photos.length + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedPhotos.map((photo, index) => (
          <div
            key={`${photo.src}-${index}`}
            className="flex-shrink-0 relative group cursor-pointer"
            style={{ width: 'clamp(280px, 30vw, 400px)', height: 'clamp(200px, 22vw, 280px)' }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface border border-border">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 280px, 400px"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-semibold text-lg">{photo.title}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
