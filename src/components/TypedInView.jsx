'use client'

import { useEffect, useRef, useState } from 'react'

export default function TypedInView({
  text,
  speed = 10,          // ms per char
  startDelay = 0,      // ms before typing starts
  caret = true,        // show blinking caret while typing
  className = '',
  as: Tag = 'span',
}) {
  const ref = useRef(null)
  const [start, setStart] = useState(false)
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)

  const startedRef = useRef(false)   // prevents double start in React Strict Mode
  const timerRef = useRef(null)
  const delayRef = useRef(null)

  // Observe visibility
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStart(true)
        io.disconnect()
      }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Type when visible
  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    let i = 0
    delayRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => {
        // write using slice to avoid 'undefined' and race conditions
        setOut(text.slice(0, i + 1))
        i += 1
        if (i >= text.length) {
          clearInterval(timerRef.current)
          timerRef.current = null
          setDone(true)
        }
      }, Math.max(1, speed))
    }, Math.max(0, startDelay))

    return () => {
      clearInterval(timerRef.current)
      clearTimeout(delayRef.current)
    }
  }, [start, text, speed, startDelay])

  return (
    <Tag ref={ref} className={className}>
      {out}
      {caret && !done ? <span className="typing-caret" aria-hidden="true">|</span> : null}
    </Tag>
  )
}
