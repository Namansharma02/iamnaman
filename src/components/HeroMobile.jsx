"use client"

import Image from 'next/image'
import GreetingHero from './GreetingHero'

export default function HeroMobile({ imgSrc = "/naman-avatar.png", imgAlt = "Profile" }) {
  return (
    <div className="flex flex-col items-center">
      {/* Text first, compact layout, no big min-height */}
      <div className="w-full text-center">
        <GreetingHero compact />
      </div>
      {/* Image fills width, fully visible under the text */}
      <div className="mt-4 w-full grid place-items-center">
        <div className="relative w-[86vw] h-[86vw] max-w-[720px] max-h-[520px]">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="86vw"
            priority
            style={{ objectFit: 'contain' }}
            className="drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>
    </div>
  )
}