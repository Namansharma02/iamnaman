"use client"

import HeroDesktop from './HeroDesktop'
import HeroMobile from './HeroMobile'

export default function HeroSplit({ imgSrc = "/naman-avatar.png", imgAlt = "Profile" }) {
  return (
    <>
      {/* Mobile layout */}
      <div className="block md:hidden">
        <HeroMobile imgSrc={imgSrc} imgAlt={imgAlt} />
      </div>
      {/* Desktop layout */}
      <div className="hidden md:block">
        <HeroDesktop imgSrc={imgSrc} imgAlt={imgAlt} />
      </div>
    </>
  )
}