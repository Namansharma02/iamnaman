'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mail,
  Linkedin,
  Download,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  ExternalLink,
} from 'lucide-react'

// ---- Constants ----

const EMAIL = 'namans0297@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/namansharma0297'
const LINKEDIN_DISPLAY = '/in/namansharma0297'
const NAME = 'Naman Sharma'
const LOCATION = 'Mumbai, India'
const TIMEZONE = 'IST (UTC+5:30)'
const PS_NOTE = "P.S. - I respond faster to emails than LinkedIn :)"

// ---- Shared Download Handler ----

function useDownload() {
  return useCallback(async () => {
    try {
      const pdfRes = await fetch('/resume.pdf')
      const pdfBlob = await pdfRes.blob()
      const pdfUrl = URL.createObjectURL(pdfBlob)
      const pdfLink = document.createElement('a')
      pdfLink.href = pdfUrl
      pdfLink.download = 'Naman_Sharma_Resume.pdf'
      document.body.appendChild(pdfLink)
      pdfLink.click()
      document.body.removeChild(pdfLink)
      URL.revokeObjectURL(pdfUrl)

      await new Promise((r) => setTimeout(r, 500))

      const docxRes = await fetch('/resume.docx')
      const docxBlob = await docxRes.blob()
      const docxUrl = URL.createObjectURL(docxBlob)
      const docxLink = document.createElement('a')
      docxLink.href = docxUrl
      docxLink.download = 'Naman_Sharma_Resume.docx'
      document.body.appendChild(docxLink)
      docxLink.click()
      document.body.removeChild(docxLink)
      URL.revokeObjectURL(docxUrl)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }, [])
}

// ---- Section Wrapper ----

function SectionWrapper({
  label,
  index,
  children,
}: {
  label: string
  index: number
  children: React.ReactNode
}) {
  return (
    <section className="relative w-full border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            {index}
          </span>
          <h2 className="text-lg font-semibold tracking-tight text-gray-900">
            {label}
          </h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {children}
        </div>
      </div>
    </section>
  )
}

// ============================================================
//  DESIGN 1: "Editorial Split"
// ============================================================

function EditorialSplit() {
  const download = useDownload()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: EMAIL,
      color: '#DC2626',
      href: `mailto:${EMAIL}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: LINKEDIN_DISPLAY,
      color: '#2563EB',
      href: LINKEDIN_URL,
    },
    {
      icon: Download,
      label: 'Resume',
      value: 'PDF & Word',
      color: '#16A34A',
      href: '#',
      onClick: download,
    },
  ]

  return (
    <div ref={ref} className="px-8 py-16 lg:px-16 lg:py-20">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Left — editorial typography */}
        <motion.div
          className="flex flex-col justify-center lg:w-[58%]"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            <span
              className="block text-6xl font-light tracking-tight text-gray-900 sm:text-7xl lg:text-8xl"
              style={{ lineHeight: 1.05 }}
            >
              Let&rsquo;s
            </span>
            <span className="relative inline-block">
              <span
                className="block text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl"
                style={{ lineHeight: 1.05 }}
              >
                Connect.
              </span>
              {/* Animated SVG wave underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                style={{ height: '12px' }}
              >
                <motion.path
                  d="M0 6 C25 2, 50 10, 75 6 C100 2, 125 10, 150 6 C175 2, 200 10, 225 6 C250 2, 275 10, 300 6"
                  stroke="#DC2626"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                />
              </svg>
            </span>
          </div>
          <p
            className="mb-6 max-w-md text-xl text-gray-500 italic"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            &ldquo;I believe the best projects start with a simple hello.&rdquo;
          </p>
          <p className="max-w-sm text-sm text-gray-400">{PS_NOTE}</p>
        </motion.div>

        {/* Right — contact methods */}
        <motion.div
          className="flex flex-col justify-center lg:w-[42%]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col">
            {contactItems.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.label}>
                  {i > 0 && <div className="mx-4 h-px bg-gray-100" />}
                  <motion.a
                    href={item.href}
                    target={item.label === 'LinkedIn' ? '_blank' : undefined}
                    rel={
                      item.label === 'LinkedIn'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    onClick={
                      item.onClick
                        ? (e) => {
                            e.preventDefault()
                            item.onClick?.()
                          }
                        : undefined
                    }
                    className="group relative flex items-center gap-4 rounded-xl px-4 py-5 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                    style={
                      {
                        '--accent': item.color,
                      } as React.CSSProperties
                    }
                  >
                    {/* Left colored border */}
                    <div
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-full transition-all duration-300 group-hover:w-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                      style={{
                        backgroundColor: `${item.color}10`,
                        color: item.color,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {item.label}
                      </div>
                      <div className="truncate text-sm font-medium text-gray-700">
                        {item.value}
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-500"
                    />
                  </motion.a>
                </div>
              )
            })}
          </div>

          {/* Availability badge */}
          <div className="mt-8 flex items-center gap-2 px-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-gray-500">
              Available for opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================================
//  DESIGN 2: "Conversation Flow"
// ============================================================

function ConversationFlow() {
  const download = useDownload()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const conversations = [
    {
      question: 'Got a project idea?',
      action: 'Email me',
      detail: EMAIL,
      color: '#DC2626',
      bgColor: '#DC2626',
      icon: Mail,
      href: `mailto:${EMAIL}`,
    },
    {
      question: 'Want to connect professionally?',
      action: 'Find me on LinkedIn',
      detail: LINKEDIN_DISPLAY,
      color: '#2563EB',
      bgColor: '#2563EB',
      icon: Linkedin,
      href: LINKEDIN_URL,
      external: true,
    },
    {
      question: 'Need my credentials?',
      action: 'Grab my resume',
      detail: 'PDF & Word formats',
      color: '#16A34A',
      bgColor: '#16A34A',
      icon: Download,
      href: '#',
      onClick: download,
    },
  ]

  return (
    <div ref={ref} className="px-8 py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          className="mb-14 text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Let&rsquo;s Connect
        </motion.h2>

        <div className="flex flex-col gap-0">
          {conversations.map((conv, i) => {
            const Icon = conv.icon
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={conv.action}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Connecting line */}
                {i > 0 && (
                  <div
                    className="mx-auto mb-1 mt-1 h-8 w-px"
                    style={{
                      background:
                        'linear-gradient(to bottom, #e5e7eb, #d1d5db, #e5e7eb)',
                    }}
                  />
                )}

                <div
                  className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 ${
                    isEven
                      ? 'sm:flex-row'
                      : 'sm:flex-row-reverse sm:text-right'
                  }`}
                >
                  {/* Question */}
                  <div className="flex-1">
                    <p
                      className="text-lg text-gray-400"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                      }}
                    >
                      {conv.question}
                    </p>
                  </div>

                  {/* Arrow indicator (desktop) */}
                  <div className="hidden text-gray-300 sm:block">
                    <ArrowRight size={20} />
                  </div>

                  {/* Action button */}
                  <div className="flex-1">
                    <motion.a
                      href={conv.href}
                      target={conv.external ? '_blank' : undefined}
                      rel={conv.external ? 'noopener noreferrer' : undefined}
                      onClick={
                        conv.onClick
                          ? (e) => {
                              e.preventDefault()
                              conv.onClick?.()
                            }
                          : undefined
                      }
                      className="group relative block overflow-hidden rounded-xl px-6 py-4 text-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                      style={{ backgroundColor: conv.bgColor }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {/* Subtle gradient overlay on hover */}
                      <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                      <div className="relative flex items-center gap-3">
                        <Icon size={18} className="shrink-0" />
                        <div>
                          <div className="font-semibold">{conv.action}</div>
                          <div className="text-xs opacity-75">{conv.detail}</div>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* PS note */}
        <motion.p
          className="mt-14 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {PS_NOTE}
        </motion.p>
      </div>
    </div>
  )
}

// ============================================================
//  DESIGN 3: "Status Dashboard"
// ============================================================

function StatusDashboard() {
  const download = useDownload()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const ist = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      )
      const hours = ist.getHours()
      const minutes = ist.getMinutes()
      const seconds = ist.getSeconds()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const h = hours % 12 || 12
      const m = minutes.toString().padStart(2, '0')
      const s = seconds.toString().padStart(2, '0')
      setTime(`${h}:${m}:${s} ${ampm} IST`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const rows = [
    {
      icon: Mail,
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: LINKEDIN_DISPLAY,
      href: LINKEDIN_URL,
      external: true,
    },
    {
      icon: Download,
      label: 'Resume',
      value: 'PDF & Word',
      href: '#',
      onClick: download,
    },
  ]

  return (
    <div ref={ref} className="flex justify-center px-8 py-16 lg:px-16 lg:py-20">
      <motion.div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{NAME}</h3>
              <div className="mt-1.5 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-gray-400" />
                  {LOCATION}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gray-400" />
                  <span
                    className="tabular-nums"
                    style={{ fontFamily: 'ui-monospace, monospace' }}
                  >
                    {time || '--:--:-- -- IST'}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-medium text-green-700">
                Open to work
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Reach Out section */}
        <div className="px-7 py-5">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Reach Out
          </div>
          <div className="flex flex-col">
            {rows.map((row, i) => {
              const Icon = row.icon
              return (
                <div key={row.label}>
                  {i > 0 && <div className="h-px bg-gray-50" />}
                  <motion.a
                    href={row.href}
                    target={row.external ? '_blank' : undefined}
                    rel={row.external ? 'noopener noreferrer' : undefined}
                    onClick={
                      row.onClick
                        ? (e) => {
                            e.preventDefault()
                            row.onClick?.()
                          }
                        : undefined
                    }
                    className="group flex items-center gap-4 rounded-lg px-2 py-3.5 transition-colors duration-200 hover:bg-gray-50"
                    whileHover="hover"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-gray-200">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-800">
                        {row.label}
                      </div>
                      <div className="truncate text-xs text-gray-400">
                        {row.value}
                      </div>
                    </div>
                    <motion.div
                      className="text-gray-300"
                      variants={{
                        hover: { x: 4, color: '#6b7280' },
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <ArrowRight size={15} />
                    </motion.div>
                  </motion.a>
                </div>
              )
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Footer meta */}
        <div className="px-7 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
                <Clock size={14} className="text-gray-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Avg. response</div>
                <div className="text-sm font-medium text-gray-700">
                  ~24 hours
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
                <Star size={14} className="text-gray-400" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Preferred</div>
                <div className="text-sm font-medium text-gray-700">Email</div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-300">{PS_NOTE}</p>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================
//  DESIGN 4: "Big Inline Typography"
// ============================================================

function BigInlineTypography() {
  const download = useDownload()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Animated underline link component
  const InlineLink = ({
    children,
    href,
    color,
    onClick,
    external,
  }: {
    children: React.ReactNode
    href: string
    color: string
    onClick?: () => void
    external?: boolean
  }) => (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault()
              onClick()
            }
          : undefined
      }
      className="group relative inline-block font-semibold no-underline transition-colors duration-200"
      style={{ color }}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: color }}
      />
    </a>
  )

  return (
    <div ref={ref} className="relative px-8 py-16 lg:px-16 lg:py-20">
      {/* Giant watermark quotation mark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-gray-50"
        style={{
          fontSize: 'min(50vw, 500px)',
          lineHeight: 0.8,
          fontFamily: 'Georgia, serif',
        }}
      >
        &ldquo;
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xl leading-relaxed text-gray-700 sm:text-2xl sm:leading-relaxed lg:text-[28px] lg:leading-[1.7]"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            I&rsquo;d love to hear from you. Whether you have a project in
            mind, want to collaborate, or just want to say hi &mdash;{' '}
            <InlineLink href={`mailto:${EMAIL}`} color="#DC2626">
              drop me an email
            </InlineLink>{' '}
            at{' '}
            <span
              className="text-[0.85em] text-gray-400"
              style={{ fontFamily: 'ui-monospace, monospace' }}
            >
              {EMAIL}
            </span>
            , connect with me on{' '}
            <InlineLink href={LINKEDIN_URL} color="#2563EB" external>
              LinkedIn
            </InlineLink>
            , or{' '}
            <InlineLink href="#" color="#16A34A" onClick={download}>
              download my resume
            </InlineLink>{' '}
            if you need the details.
          </p>
        </motion.div>

        {/* Horizontal rule */}
        <motion.div
          className="my-10 h-px bg-gray-200"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.p
          className="text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {PS_NOTE}
        </motion.p>
      </div>
    </div>
  )
}

// ============================================================
//  DESIGN 5: "Contact Marquee + Hero Action"
// ============================================================

function Marquee({
  text,
  reverse = false,
}: {
  text: string
  reverse?: boolean
}) {
  const repeated = Array(6).fill(text).join(' \u00A0\u00A0\u00A0 ')
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-block ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} 30s linear infinite`,
        }}
      >
        <span
          className="inline-block text-7xl font-black uppercase tracking-widest text-transparent sm:text-8xl lg:text-[110px]"
          style={{
            WebkitTextStroke: '1.5px #e5e7eb',
          }}
        >
          {repeated}
        </span>
        <span
          className="inline-block text-7xl font-black uppercase tracking-widest text-transparent sm:text-8xl lg:text-[110px]"
          style={{
            WebkitTextStroke: '1.5px #e5e7eb',
          }}
        >
          {' '}
          &nbsp;&nbsp;&nbsp; {repeated}
        </span>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `,
        }}
      />
    </div>
  )
}

function ContactMarquee() {
  const download = useDownload()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="py-16 lg:py-20">
      {/* Top marquee */}
      <Marquee text="LET'S CONNECT" />

      {/* Central CTA area */}
      <motion.div
        className="mx-auto max-w-md px-8 py-14"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Primary CTA */}
        <motion.a
          href={`mailto:${EMAIL}`}
          className="group relative block overflow-hidden rounded-2xl bg-gray-900 px-8 py-5 text-center text-white shadow-xl transition-shadow duration-300 hover:shadow-2xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Animated gradient border */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              padding: '2px',
              background:
                'linear-gradient(135deg, #DC2626, #F97316, #EC4899, #DC2626)',
              backgroundSize: '300% 300%',
              animation: 'gradient-shift 3s ease infinite',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <div className="relative flex items-center justify-center gap-3">
            <Mail size={20} />
            <span className="text-lg font-semibold">Send me an email</span>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes gradient-shift {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `,
            }}
          />
        </motion.a>

        {/* Secondary CTAs */}
        <div className="mt-4 flex gap-3">
          <motion.a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-blue-500 hover:text-blue-600"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>
          <motion.button
            onClick={download}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-green-500 hover:text-green-600"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Download size={16} />
            Resume
          </motion.button>
        </div>

        {/* Email + PS */}
        <div className="mt-8 text-center">
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: 'ui-monospace, monospace' }}
          >
            {EMAIL}
          </p>
          <p className="mt-2 text-xs text-gray-300">{PS_NOTE}</p>
        </div>
      </motion.div>

      {/* Bottom marquee (reverse direction) */}
      <Marquee text="GET IN TOUCH" reverse />
    </div>
  )
}

// ============================================================
//  PAGE
// ============================================================

export default function ContactExperiments() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="border-b border-gray-200 bg-white px-6 py-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Contact Section Experiments
        </h1>
        <p className="mt-2 text-base text-gray-500">
          5 design directions &mdash; scroll to compare
        </p>
      </div>

      <SectionWrapper label="Editorial Split" index={1}>
        <EditorialSplit />
      </SectionWrapper>

      <SectionWrapper label="Conversation Flow" index={2}>
        <ConversationFlow />
      </SectionWrapper>

      <SectionWrapper label="Status Dashboard" index={3}>
        <StatusDashboard />
      </SectionWrapper>

      <SectionWrapper label="Big Inline Typography" index={4}>
        <BigInlineTypography />
      </SectionWrapper>

      <SectionWrapper label="Contact Marquee + Hero Action" index={5}>
        <ContactMarquee />
      </SectionWrapper>

      {/* Footer spacer */}
      <div className="h-20" />
    </main>
  )
}
