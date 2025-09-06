'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, TrendingUp, Database, Cpu, BarChart3, Calculator } from 'lucide-react'
import { skills } from '@/lib/content'

const skillCategories = [
  {
    ...skills.technical,
    icon: Code2,
    color: 'blue',
    description: 'Programming languages, frameworks, and development tools I use to build scalable solutions.'
  },
  {
    ...skills.finance,
    icon: TrendingUp,
    color: 'green', 
    description: 'Financial analysis, metrics, and regulatory compliance knowledge for banking and fintech.'
  }
]

const additionalSkills = [
  {
    title: 'Data Engineering',
    icon: Database,
    items: ['ETL Pipelines', 'Data Warehousing', 'Real-time Processing', 'Data Quality'],
    color: 'purple'
  },
  {
    title: 'Automation & AI',
    icon: Cpu,
    items: ['Process Automation', 'RPA Development', 'ML Integration', 'Workflow Optimization'],
    color: 'orange'
  },
  {
    title: 'Analytics & BI',
    icon: BarChart3,
    items: ['Dashboard Design', 'Data Visualization', 'Business Intelligence', 'Reporting'],
    color: 'cyan'
  },
  {
    title: 'Leadership',
    icon: Calculator,
    items: ['Team Management', 'Strategic Planning', 'Stakeholder Relations', 'Training & Mentorship'],
    color: 'pink'
  }
]

interface SkillCardProps {
  skill: typeof skillCategories[0] | typeof additionalSkills[0]
  index: number
  isInView: boolean
}

function SkillCard({ skill, index, isInView }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-background border border-border rounded-2xl p-8 hover:border-brand hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ 
                rotate: isHovered ? 5 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-brand/10 rounded-xl"
            >
              <Icon size={24} className="text-brand" />
            </motion.div>
            <h3 className="text-xl font-bold text-text group-hover:text-brand transition-colors">
              {skill.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        {'description' in skill && (
          <p className="text-subtle text-sm mb-6 leading-relaxed">
            {skill.description}
          </p>
        )}

        {/* Skills List */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, itemIndex) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1 + itemIndex * 0.05,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-2 bg-surface text-text text-sm font-medium rounded-lg border border-border hover:border-brand hover:bg-brand/5 transition-all duration-200 cursor-default"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent rounded-2xl pointer-events-none"
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      id="skills" 
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6 tracking-display">
            Skills & Expertise
          </h2>
          <p className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building automation solutions, analyzing complex data, and leading technical teams.
          </p>
        </motion.div>

        {/* Main Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((skill, index) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-text text-center mb-12">
            Core Competencies
          </h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {additionalSkills.map((skill, index) => (
              <SkillCard
                key={skill.title}
                skill={skill}
                index={index + 2}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-r from-brand/5 to-brand/10 rounded-2xl p-8 border border-brand/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Programming Languages", value: "10+" },
              { label: "Tools & Frameworks", value: "25+" },
              { label: "Years Experience", value: "5+" },
              { label: "Certifications", value: "8+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold text-brand">
                  {stat.value}
                </div>
                <div className="text-sm text-subtle font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/4 right-10 w-40 h-40 bg-gradient-to-br from-brand/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-gradient-to-tr from-brand/10 to-transparent rounded-full blur-2xl" />
    </section>
  )
}