'use client'

import { useEffect, useRef, useState } from 'react'

export default function Story() {
  const sectionRef = useRef(null)
  const [start, setStart] = useState(false)

  const headingFull = 'My Story'
  const [headingText, setHeadingText] = useState('')
  const [headingDone, setHeadingDone] = useState(false)

  const bodyFull =
    'At JPMorgan Chase, I lead automation across trading portals and banking tools, designing solutions ' +
    'that blend Python, Java, Alteryx, UiPath, Tableau, and SQL to remove friction at scale.\n\n' +
    'I thrive on complex, high stakes problems. They force me to think sharper, act faster, ' +
    'and deliver smarter systems. Outside of work, I follow tech, politics, and global news with the same curiosity ' +
    'I bring to my projects. I’m also a "sometimes" photographer with one of my shots being published in Lonely Planet magazine, 2020.'

  const [bodyText, setBodyText] = useState('')
  const [bodyDone, setBodyDone] = useState(false)

  // Intersection observer to trigger typing
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

  // Typing animation logic
  useEffect(() => {
    if (!start) return
    let cancelled = false

    async function typeHeadingThenBody() {
      for (let i = 0; i < headingFull.length; i++) {
        if (cancelled) return
        setHeadingText(prev => prev + headingFull[i])
        await new Promise(r => setTimeout(r, 35)) // heading speed
      }
      setHeadingDone(true)
      await new Promise(r => setTimeout(r, 60)) // pause before body

      for (let i = 0; i < bodyFull.length; i++) {
        if (cancelled) return
        setBodyText(prev => prev + bodyFull[i])
        await new Promise(r => setTimeout(r, 10)) // body speed
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
      className="relative mx-auto max-w-6xl px-6 py-24 scroll-mt-24"
    >
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {headingText}
          {!headingDone && <span className="typing-caret" aria-hidden="true">|</span>}
        </h2>

        <p className="leading-relaxed whitespace-pre-line text-neutral-100 max-w-3xl">
          {bodyText}
          {!bodyDone && <span className="typing-caret" aria-hidden="true">|</span>}
        </p>
      </div>
    </section>
  )
}
