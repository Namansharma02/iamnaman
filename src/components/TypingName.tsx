'use client'

import TypingNameMobile from './TypingNameMobile'
import TypingNameDesktop from './TypingNameDesktop'

interface TypingNameProps {
  className?: string
}

export default function TypingName({ className = '' }: TypingNameProps) {
  return (
    <>
      {/* Mobile version */}
      <div className="lg:hidden">
        <TypingNameMobile className={className} />
      </div>
      
      {/* Desktop/Laptop version */}
      <div className="hidden lg:block">
        <TypingNameDesktop className={className} />
      </div>
    </>
  )
}