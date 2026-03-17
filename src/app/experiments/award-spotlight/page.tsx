'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, ChevronRight, Medal } from 'lucide-react'
import Image from 'next/image'

// ============================================
// DATA
// ============================================
const sampleTestimonials = [
  {
    id: 1,
    text: "Naman has done a fabulous job of bringing efficiency to the frontline. Not only he is contributing to his core project but also never shies away from taking additional responsibilities. I have reached out to him on multiple occasions & every time he has delivered.",
    from: "S.D., Vice President",
    company: "JPMorgan Chase"
  },
  {
    id: 2,
    text: "Your exceptional work in developing automation solutions for over 500 users and the broader department has been phenomenal. The help with the Tableau dashboard setup, as well as your efforts in automating the trade booking, is truly appreciated.",
    from: "K.T., Executive Director",
    company: "JPMorgan Chase"
  },
  {
    id: 3,
    text: "Your expertise in Python, UiPath, and Alteryx is nothing short of exceptional. Your ability to dissect intricate problems and offer practical solutions is truly commendable. Naman, you are truly a gem of a person.",
    from: "A.B., Vice President",
    company: "JPMorgan Chase"
  },
  {
    id: 4,
    text: "Your maturity and understanding in your role, especially at such a young age, are truly impressive. Your logical mind combined with your superb communication skills make you a strong player in our team.",
    from: "P.J., Vice President",
    company: "JPMorgan Chase"
  },
]

const AWARD = {
  title: "AWM Operations India",
  subtitle: "Recognition & Engagement 2025",
  reason: "For outstanding contributions to Asset & Wealth Management",
  signatories: [
    { initials: "J.H.", name: "Julie Harris", role: "Chief Administrative Officer & Global Head of Operations, Asset Wealth Management" },
    { initials: "K.M.", name: "Kaushal Mody", role: "Head, Wealth Management Operations India & Philippines" },
    { initials: "A.G.", name: "Amit Ghatnekar", role: "Head, Asset Management Operations India" },
  ],
  image: "/award_2025.png"
}

// ============================================
// MAIN PAGE — WARM EDITORIAL FEATURED CARD (FINAL)
// ============================================
export default function AwardSpotlightExperiment() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="bg-white min-h-screen" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Testimonials & Recognitions</h2>
          <p className="text-gray-500 text-lg">44+ recognitions from colleagues, managers, and leaders</p>
        </div>

        {/* Award Card + Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Award Featured Card — Warm Editorial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:row-span-2 relative overflow-hidden rounded-2xl border border-amber-300/50 shadow-lg group"
            style={{ background: 'linear-gradient(170deg, #fefcf3 0%, #fdf6e3 40%, #faf0d1 100%)' }}
          >
            {/* Top ornamental line */}
            <div className="h-1.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />

            <div className="p-8 flex flex-col h-full">
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-amber-700" />
                  <span className="text-amber-800 text-xs font-semibold tracking-widest uppercase">Recognition 2025–2026</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-700/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-700" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-amber-950 mb-1 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Employee of the Year
              </h3>
              <div className="w-16 h-0.5 bg-amber-600/40 mb-4" />

              <p className="text-amber-900/70 text-sm mb-6 leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
                &ldquo;{AWARD.reason}&rdquo;
              </p>

              {/* Award Image */}
              <div className="relative rounded-xl overflow-hidden border-2 border-amber-400/30 mb-6 shadow-md">
                <Image src={AWARD.image} alt="AWM Operations India Recognition and Engagement 2025 — Naman Sharma" width={600} height={400} className="w-full h-auto object-cover" />
              </div>

              {/* Org */}
              <div className="mt-auto">
                <div className="mb-4">
                  <p className="text-amber-950 text-sm font-bold">JP Morgan Chase</p>
                  <p className="text-amber-900/50 text-xs">{AWARD.title} — {AWARD.subtitle}</p>
                </div>

                {/* Signatories */}
                <div className="border-t border-amber-400/30 pt-4">
                  <p className="text-amber-900/50 text-[10px] uppercase tracking-widest mb-3">Recognized by</p>
                  <div className="space-y-2">
                    {AWARD.signatories.map((s, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600/40 mt-1.5 shrink-0" />
                        <p className="text-xs leading-relaxed">
                          <span className="font-semibold text-amber-950">{s.initials}</span>
                          <span className="text-amber-900/50"> — {s.role}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Cards */}
          {sampleTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              className="bg-amber-50/30 border border-amber-200/50 rounded-2xl p-7 hover:border-amber-400 hover:shadow-xl transition-all duration-300"
            >
              <blockquote className="text-gray-800 text-sm leading-relaxed mb-5 italic">
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 border-t border-amber-200/50 pt-4">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-sm">{item.from.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold text-sm">{item.from}</h4>
                  <p className="text-amber-700 text-xs font-medium">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300">
            View All 44+ Recognitions
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
