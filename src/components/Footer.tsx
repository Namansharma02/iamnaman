'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock, ArrowUp, Linkedin, Github, Mail } from 'lucide-react'
import { personalInfo } from '@/lib/content'

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      setCurrentTime(now.toLocaleTimeString('en-US', options))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = mounted ? new Date().getFullYear() : 2025

  const socialLinks = [
    {
      icon: Linkedin,
      href: personalInfo.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-[#0A66C2]'
    },
    {
      icon: Github,
      href: personalInfo.github,
      label: 'GitHub',
      color: 'hover:text-text'
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
      color: 'hover:text-brand'
    }
  ]

  return (
    <footer className="snap-section bg-surface border-t border-border" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left: Brand & Copyright */}
          <div className="text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl font-bold text-text mb-2"
            >
              {personalInfo.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-subtle text-sm"
            >
              © {currentYear} All rights reserved.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-subtle text-sm mt-2 flex items-center justify-center md:justify-start gap-1"
            >
              Made with <Heart size={14} className="text-error fill-error" /> and lots of coffee
            </motion.p>
          </div>

          {/* Center: Local Time */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-background border border-border rounded-lg p-4"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={16} className="text-brand" />
                <span className="text-sm font-medium text-brand">Mumbai, India</span>
              </div>
              <div className="text-2xl font-bold text-text font-mono">
                {mounted ? currentTime : '--:--:--'}
              </div>
              <div className="text-xs text-subtle mt-1">
                IST (UTC+5:30)
              </div>
            </motion.div>
          </div>

          {/* Right: Social Links & Back to Top */}
          <div className="text-center md:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center md:justify-end gap-4 mb-4"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className={`p-2 text-subtle transition-all duration-300 hover:scale-110 ${social.color}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </motion.div>

            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 text-sm text-subtle hover:text-brand transition-colors group"
              whileHover={{ y: -2 }}
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-subtle">
            <div>
              Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
            </div>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-text transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-text transition-colors">
                Terms of Use
              </a>
              <a href="/sitemap.xml" className="hover:text-text transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}