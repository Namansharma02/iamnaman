'use client'

import { useEffect, useRef, useState } from 'react'

export default function Story() {
  const sectionRef = useRef(null)
  const [start, setStart] = useState(false)

  // Heading typing state
  const headingFull = 'My Story'
  const [headingText, setHeadingText] = useState('')
  const [headingDone, setHeadingDone] = useState(false)

  // Body typing state
  const bodyFull =
    'At JPMorgan Chase, I lead automation across trading portals and banking tools, designing solutions ' +
    'that blend Python, Java, Alteryx, UiPath, Tableau, and SQL to remove friction at scale.\n\n' +
    'I thrive on complex, high stakes problems. They force me to think sharper, act faster, ' +
    'and deliver smarter systems. Outside of work, I follow tech, politics, and global news with the same curiosity ' +
    'I bring to my projects. I’m also a "sometimes" photographer with one of my shots being published in Lonely Planet magazine, 2020.'
  const [bodyText, setBodyText] = useState('')
  const [bodyDone, setBodyDone] = useState(false)

  // Start typing when section enters viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setStart(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Type heading, then body
  useEffect(() => {
    if (!start) return
    let cancelled = false

    async function typeHeadingThenBody() {
      // Heading
      for (let i = 0; i < headingFull.length; i++) {
        if (cancelled) return
        setHeadingText(prev => prev + headingFull[i])
        await new Promise(r => setTimeout(r, 70))
      }
      setHeadingDone(true)
      await new Promise(r => setTimeout(r, 120))

      // Body
      for (let i = 0; i < bodyFull.length; i++) {
        if (cancelled) return
        setBodyText(prev => prev + bodyFull[i])
        await new Promise(r => setTimeout(r, 18))
      }
      setBodyDone(true)
    }

    typeHeadingThenBody()
    return () => {
      cancelled = true
    }
  }, [start])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative mx-auto max-w-6xl px-6 py-24 text-neutral-200 scroll-mt-24"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">
        {headingText}
        {!headingDone && <span className="typing-caret" aria-hidden="true">|</span>}
      </h2>

      <p className="leading-relaxed whitespace-pre-line">
        {bodyText}
        {!bodyDone && <span className="typing-caret" aria-hidden="true">|</span>}
      </p>
    </section>
  )
}
