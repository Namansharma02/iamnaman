'use client'

import HeroDesktop from './HeroDesktop'
import HeroMobile from './HeroMobile'

export default function Hero() {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <HeroDesktop />
      </div>
      
      {/* Mobile Version */}
      <div className="lg:hidden">
        <HeroMobile />
      </div>
    </>
  )
}