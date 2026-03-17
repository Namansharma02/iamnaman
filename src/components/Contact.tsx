'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Download, ArrowRight, Copy, Check } from 'lucide-react'
import { contact } from '@/lib/content'
import DecryptedText from '@/components/DecryptedText'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleDownload = async () => {
    try {
      const pdfResponse = await fetch('/resume.pdf')
      const pdfBlob = await pdfResponse.blob()
      const pdfUrl = window.URL.createObjectURL(pdfBlob)
      const pdfLink = document.createElement('a')
      pdfLink.href = pdfUrl
      pdfLink.download = 'Naman_Sharma_Resume.pdf'
      document.body.appendChild(pdfLink)
      pdfLink.click()
      document.body.removeChild(pdfLink)
      window.URL.revokeObjectURL(pdfUrl)

      setTimeout(async () => {
        const docResponse = await fetch('/resume.docx')
        const docBlob = await docResponse.blob()
        const docUrl = window.URL.createObjectURL(docBlob)
        const docLink = document.createElement('a')
        docLink.href = docUrl
        docLink.download = 'Naman_Sharma_Resume.docx'
        document.body.appendChild(docLink)
        docLink.click()
        document.body.removeChild(docLink)
        window.URL.revokeObjectURL(docUrl)
      }, 500)
    } catch (error) {
      console.error('Error downloading resume:', error)
    }
  }

  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      color: '#DC2626',
      href: `mailto:${contact.email}`,
      copyText: contact.email,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/namansharma0297',
      color: '#2563EB',
      href: contact.linkedin,
      target: '_blank',
      copyText: contact.linkedin,
    },
    {
      icon: Download,
      label: 'Resume',
      value: 'PDF & Word',
      color: '#16A34A',
      href: '#',
      onClick: handleDownload,
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="snap-section py-16 sm:py-20 lg:py-24 bg-background relative z-[100] min-h-screen flex items-center"
    >
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Left — editorial typography */}
          <motion.div
            className="flex flex-col justify-center lg:w-[58%]"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8">
              <span
                className="block text-6xl font-light tracking-tight text-text sm:text-7xl lg:text-8xl 2xl:text-9xl"
                style={{ lineHeight: 1.05 }}
              >
                Let&rsquo;s
              </span>
              <span className="relative inline-block">
                <span
                  className="block text-6xl font-bold tracking-tight text-text sm:text-7xl lg:text-8xl 2xl:text-9xl"
                  style={{ lineHeight: 1.05 }}
                >
                  <DecryptedText
                    text="Connect."
                    animateOn="view"
                    loopInterval={10000}
                    sequential={true}
                    revealDirection="start"
                    speed={60}
                    className="text-text"
                    encryptedClassName="text-brand"
                  />
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
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </div>
            <p
              className="mb-6 max-w-md text-xl text-subtle italic"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              &ldquo;I believe the best projects start with a simple hello.&rdquo;
            </p>
            <p className="max-w-sm text-sm text-subtle/60">
              P.S. - I respond faster to emails than LinkedIn :)
            </p>
          </motion.div>

          {/* Right — contact methods */}
          <motion.div
            className="flex flex-col justify-center lg:w-[42%]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col">
              {contactItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.label}>
                    {i > 0 && <div className="mx-4 h-px bg-subtle/10" />}
                    <motion.a
                      href={item.href}
                      target={item.target}
                      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                      onClick={
                        item.onClick
                          ? (e: React.MouseEvent) => {
                              e.preventDefault()
                              item.onClick?.()
                            }
                          : undefined
                      }
                      className="group relative flex items-center gap-4 2xl:gap-5 rounded-xl px-4 py-5 2xl:px-6 2xl:py-7 transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      {/* Left colored border */}
                      <div
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-full transition-all duration-300 group-hover:w-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div
                        className="flex h-10 w-10 2xl:h-12 2xl:w-12 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                        style={{
                          backgroundColor: `${item.color}10`,
                          color: item.color,
                        }}
                      >
                        <Icon className="w-[18px] h-[18px] 2xl:w-[22px] 2xl:h-[22px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold uppercase tracking-wider text-subtle">
                          {item.label}
                        </div>
                        <div className="truncate text-sm font-medium text-text">
                          {item.value}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {item.copyText && (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleCopy(item.copyText!, item.label)
                            }}
                            className="p-1.5 rounded-md text-subtle/30 hover:text-subtle hover:bg-subtle/10 transition-all duration-200"
                            title={`Copy ${item.label.toLowerCase()}`}
                          >
                            {copiedField === item.label ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        )}
                        <ArrowRight
                          size={16}
                          className="text-subtle/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-subtle"
                        />
                      </div>
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
              <span className="text-sm font-medium text-subtle">
                Let&apos;s build something
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, rgb(var(--color-brand)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  )
}
