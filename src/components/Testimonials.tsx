'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { testimonials } from '@/lib/content'
import ScrollFloat from '@/components/animations/ScrollFloat'

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <ScrollFloat containerClassName="mb-6">
            What People Say
          </ScrollFloat>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed"
          >
            Feedback from colleagues, leaders, and collaborators who have experienced my work firsthand.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-background border border-border rounded-2xl p-8 hover:border-brand hover:shadow-xl transition-all duration-300"
            >
              <blockquote className="text-text text-lg leading-relaxed mb-6">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="text-brand font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-text font-semibold">{testimonial.name}</h4>
                  <p className="text-subtle text-sm">{testimonial.role}</p>
                  <p className="text-brand text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-brand/10 to-brand/5 rounded-2xl p-8 border border-brand/20">
            <h3 className="text-2xl font-bold text-text mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-subtle mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaboration ideas, or just connecting.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="bg-brand text-brandOn px-8 py-3 rounded-full font-medium hover:bg-brand/90 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}