'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Send, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react'
import { contact, personalInfo } from '@/lib/content'
import ScrollFloat from '@/components/animations/ScrollFloat'
import DecryptedText from '@/components/DecryptedText'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitError('Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section 
      id="contact" 
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-background relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <DecryptedText
              text={contact.headline}
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
            className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed"
          >
            {contact.subheadline}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-text mb-6">Get In Touch</h3>
              <p className="text-text/90 text-lg leading-relaxed mb-8">
                I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate. 
                Whether you're looking for automation solutions, analytics expertise, or just want to connect, 
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <motion.a
                href={`mailto:${contact.email}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="group flex items-center space-x-4 p-4 bg-background border border-border rounded-xl hover:border-brand hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-brand/10 rounded-lg group-hover:bg-brand group-hover:text-brandOn transition-all duration-300">
                  <Mail size={20} className="text-brand group-hover:text-brandOn" />
                </div>
                <div>
                  <h4 className="text-text font-semibold group-hover:text-brand transition-colors">
                    Email
                  </h4>
                  <p className="text-subtle text-sm">namans0297@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="group flex items-center space-x-4 p-4 bg-background border border-border rounded-xl hover:border-brand hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-brand/10 rounded-lg group-hover:bg-brand group-hover:text-brandOn transition-all duration-300">
                  <Linkedin size={20} className="text-brand group-hover:text-brandOn" />
                </div>
                <div>
                  <h4 className="text-text font-semibold group-hover:text-brand transition-colors">
                    LinkedIn
                  </h4>
                  <p className="text-subtle text-sm">/in/namansharma0297</p>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex items-center space-x-4 p-4 bg-background border border-border rounded-xl"
              >
                <div className="p-3 bg-brand/10 rounded-lg">
                  <MapPin size={20} className="text-brand" />
                </div>
                <div>
                  <h4 className="text-text font-semibold">Location</h4>
                  <p className="text-subtle text-sm">{personalInfo.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="p-6 bg-gradient-to-r from-brand/5 to-brand/10 rounded-xl border border-brand/20"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Clock size={20} className="text-brand" />
                <h4 className="text-text font-semibold">Response Time</h4>
              </div>
              <p className="text-text/90 text-sm leading-relaxed">
                I typically respond to emails within 24-48 hours. For urgent matters, 
                LinkedIn messages tend to get faster responses.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="bg-background border border-border rounded-2xl p-8 shadow-lg"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-text mb-2">Message Sent!</h3>
                <p className="text-subtle">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-brand hover:text-brand/80 font-medium"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-text mb-6">Send a Message</h3>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg text-text placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 ${errors.name ? 'border-error' : 'border-border hover:border-brand/50'}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg text-text placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 ${errors.email ? 'border-error' : 'border-border hover:border-brand/50'}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg text-text placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200 resize-none ${errors.message ? 'border-error' : 'border-border hover:border-brand/50'}`}
                    placeholder="Tell me about your project, idea, or just say hello..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-error/10 border border-error/20 rounded-lg"
                  >
                    <p className="text-error text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {submitError}
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand text-brandOn px-8 py-4 rounded-lg font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus-ring flex items-center justify-center space-x-2"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brandOn border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
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