'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'
import { contact } from '@/lib/content'
import DecryptedText from '@/components/DecryptedText'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="contact"
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-background relative z-[100] min-h-screen flex items-center"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <DecryptedText
              text="Let's Connect"
              animateOn="view"
              loopInterval={10000}
              sequential={true}
              revealDirection="center"
              speed={60}
              className="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-text"
              encryptedClassName="text-[clamp(2rem,7vw,5rem)] leading-[1.2] font-bold text-brand"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed break-words"
          >
            I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate.
          </motion.p>
        </div>

        {/* Contact Pills */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Email Pill */}
          <a
            href="mailto:namans0297@gmail.com"
            className="block bg-background border-4 border-red-500 rounded-2xl p-6 sm:p-8 md:p-10 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 relative z-10"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 p-4 bg-red-500 rounded-xl">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                  Email Me
                </h3>
                <p className="text-base sm:text-xl text-subtle truncate">namans0297@gmail.com</p>
              </div>
            </div>
          </a>

          {/* LinkedIn Pill */}
          <a
            href="https://www.linkedin.com/in/namansharma0297"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background border-4 border-blue-500 rounded-2xl p-6 sm:p-8 md:p-10 hover:bg-blue-50 dark:hover:bg-red-950/20 transition-all duration-300 relative z-10"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 p-4 bg-blue-500 rounded-xl">
                <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                  Connect on LinkedIn
                </h3>
                <p className="text-base sm:text-xl text-subtle truncate">/in/namansharma0297</p>
              </div>
            </div>
          </a>

          {/* Response Time Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center pt-8 sm:pt-10 md:pt-12"
          >
            <p className="text-subtle text-base sm:text-lg md:text-xl">
              P.S. - I respond faster to emails than LinkedIn :)
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, rgb(var(--color-brand)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  )
}
