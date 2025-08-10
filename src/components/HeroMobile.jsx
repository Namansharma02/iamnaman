"use client"

import Image from 'next/image'
import GreetingHero from './GreetingHero'

export default function HeroMobile({ imgSrc = "/naman-avatar.png", imgAlt = "Profile" }) {
  return (
    <div className="flex flex-col items-center">
      {/* Text first, compact layout */}
      <div className="w-full text-center">
        <GreetingHero compact />
      </div>

      {/* Intrinsic image sizing so it never collapses, plus extra space below */}
      <div className="mt-10 mb-16 w-full flex justify-center">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={640}
          height={640}
          priority
          className="w-[96vw] max-w-[640px] h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}