"use client"

import HeroDesktop from "./HeroDesktop"
import HeroMobile from "./HeroMobile"

export default function HeroSplit({
  theme = "dark",
  imgLight = "/naman-avatar-light.png",
  imgDark = "/naman-avatar-dark.png",
  imgAlt = "Profile",
}) {
  const imgSrc = theme === "dark" ? imgDark : imgLight

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        <HeroMobile imgSrc={imgSrc} imgAlt={imgAlt} />
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <HeroDesktop imgSrc={imgSrc} imgAlt={imgAlt} />
      </div>
    </>
  )
}
