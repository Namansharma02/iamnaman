'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Linkedin, Github } from 'lucide-react'
import { personalInfo } from '@/lib/content'

const socialLinks = [
  {
    icon: Linkedin,
    href: personalInfo.linkedin,
    label: 'LinkedIn'
  },
  {
    icon: Github,
    href: personalInfo.github,
    label: 'GitHub'
  }
]

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'auto' })
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'auto' })
  }

  return (
    <section id="hero" className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Watermark */}
      <div className="watermark-text" suppressHydrationWarning>
        INNOVATION
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-display leading-none mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block text-text"
            >
              {personalInfo.name.split(' ')[0]}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-brand"
            >
              {personalInfo.name.split(' ')[1]}
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-subtle max-w-4xl mx-auto leading-relaxed"
          >
            {personalInfo.tagline}
          </motion.p>
        </motion.div>

        {/* Social Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center space-x-6 mb-12"
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-subtle hover:text-brand transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <Icon size={20} className="icon-hover" />
                <span className="text-sm font-medium group-hover:underline">
                  {social.label}
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
        >
          <motion.button
            onClick={scrollToProjects}
            className="group bg-brand text-brandOn px-8 py-4 rounded-full font-medium text-lg hover:bg-brand/90 transition-all duration-300 button-hover focus-ring flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View My Work</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            onClick={scrollToAbout}
            className="group border-2 border-border text-text px-8 py-4 rounded-full font-medium text-lg hover:border-brand hover:text-brand transition-all duration-300 button-hover focus-ring"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        </motion.div>

      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </section>
  )
}