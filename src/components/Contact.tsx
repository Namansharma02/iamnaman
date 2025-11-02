'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Download } from 'lucide-react'
import { contact } from '@/lib/content'
import DecryptedText from '@/components/DecryptedText'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleDownload = async () => {
    try {
      // Download PDF
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

      // Download Word doc with a slight delay
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

  return (
    <section
      id="contact"
      ref={ref}
      className="snap-section py-16 sm:py-20 lg:py-24 bg-background relative z-[100] min-h-screen flex items-center"
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
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Email Pill */}
          <a
            href="mailto:namans0297@gmail.com"
            className="block bg-background border-3 border-red-500 rounded-xl p-4 sm:p-5 md:p-6 hover:bg-red-50 hover:border-red-600 dark:hover:bg-red-500/10 dark:hover:border-red-400 transition-all duration-300 relative z-10 group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 p-3 bg-red-500 rounded-lg group-hover:bg-red-600 dark:group-hover:bg-red-400 transition-colors duration-300">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-text group-hover:text-red-600 dark:group-hover:text-red-400 mb-1 transition-colors duration-300">
                  Email Me
                </h3>
                <p className="text-sm sm:text-base text-subtle group-hover:text-red-500 dark:group-hover:text-red-300 truncate transition-colors duration-300">namans0297@gmail.com</p>
              </div>
            </div>
          </a>

          {/* LinkedIn Pill */}
          <a
            href="https://www.linkedin.com/in/namansharma0297"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background border-3 border-blue-500 rounded-xl p-4 sm:p-5 md:p-6 hover:bg-blue-50 hover:border-blue-600 dark:hover:bg-blue-500/10 dark:hover:border-blue-400 transition-all duration-300 relative z-10 group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors duration-300">
                <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-text group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1 transition-colors duration-300">
                  Connect on LinkedIn
                </h3>
                <p className="text-sm sm:text-base text-subtle group-hover:text-blue-500 dark:group-hover:text-blue-300 truncate transition-colors duration-300">/in/namansharma0297</p>
              </div>
            </div>
          </a>

          {/* Download CV Pill */}
          <button
            onClick={handleDownload}
            className="w-full bg-background border-3 border-green-500 rounded-xl p-4 sm:p-5 md:p-6 hover:bg-green-50 hover:border-green-600 dark:hover:bg-green-500/10 dark:hover:border-green-400 transition-all duration-300 relative z-10 group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 p-3 bg-green-500 rounded-lg group-hover:bg-green-600 dark:group-hover:bg-green-400 transition-colors duration-300">
                <Download className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-text group-hover:text-green-600 dark:group-hover:text-green-400 mb-1 transition-colors duration-300">
                  Download CV
                </h3>
                <p className="text-sm sm:text-base text-subtle group-hover:text-green-500 dark:group-hover:text-green-300 truncate transition-colors duration-300">PDF & Word formats</p>
              </div>
            </div>
          </button>

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
