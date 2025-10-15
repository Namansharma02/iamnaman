'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Calendar, Tag, Wrench } from 'lucide-react'
import { projects } from '@/lib/content'
import ScrollFloat from '@/components/animations/ScrollFloat'
import DecryptedText from '@/components/DecryptedText'

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  isActive: boolean
  onInView: (index: number) => void
}

function ProjectCard({ project, index, isActive, onInView }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-40%" })
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (isInView) {
      onInView(index)
    }
  }, [isInView, index, onInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`project-card ${isInView ? 'visible' : ''} mb-32 last:mb-0`}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Project Image */}
        <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative group rounded-2xl overflow-hidden bg-surface border border-border"
          >
            <div className="aspect-[4/3] relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* View Project Button */}
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-text p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand hover:text-brandOn focus-ring"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} project`}
              >
                <ExternalLink size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'} space-y-6`}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 mb-3"
            >
              <Calendar size={16} className="text-brand" />
              <span className="text-sm font-medium text-brand">{project.timeframe}</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-bold text-text mb-2"
            >
              {project.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg font-medium text-brand mb-4"
            >
              {project.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-text/90 leading-relaxed text-lg"
            >
              {project.summary}
            </motion.p>
          </div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Wrench size={16} className="text-brand" />
              <span className="text-sm font-medium text-brand">Tools</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, toolIndex) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.7 + toolIndex * 0.1 }}
                  className="px-3 py-1 bg-surface text-text text-sm font-medium rounded-full border border-border"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Industry Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-brand" />
              <span className="text-sm font-medium text-brand">Industry</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.industryTags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.9 + tagIndex * 0.1 }}
                  className="px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full border border-brand/20"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand text-brandOn px-6 py-3 rounded-full font-medium hover:bg-brand/90 transition-all duration-300 button-hover focus-ring"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Project</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function StickyRail({ activeProject }: { activeProject: number }) {
  const project = projects[activeProject]

  return (
    <div className="sticky-rail hidden xl:block">
      <motion.div
        key={activeProject}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-surface border border-border rounded-2xl p-8 shadow-lg"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-2xl font-bold text-text mb-2">{project.title}</h4>
            <p className="text-brand font-medium">{project.role}</p>
          </div>

          <div>
            <h5 className="font-semibold text-text mb-2">Discipline</h5>
            <p className="text-subtle">{project.discipline}</p>
          </div>

          <div>
            <h5 className="font-semibold text-text mb-2">Timeline</h5>
            <p className="text-subtle">{project.timeframe}</p>
          </div>

          <div>
            <h5 className="font-semibold text-text mb-3">Tech Stack</h5>
            <div className="flex flex-wrap gap-2">
              {project.tools.slice(0, 3).map((tool) => (
                <span 
                  key={tool}
                  className="px-2 py-1 bg-brand/10 text-brand text-xs font-medium rounded"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="px-2 py-1 bg-surface text-subtle text-xs font-medium rounded border border-border">
                  +{project.tools.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState(0)

  return (
    <section 
      id="projects" 
      ref={ref}
      className="snap-section py-24 sm:py-32 lg:py-40 bg-background relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <DecryptedText
              text="Featured Projects"
              animateOn="view"
              loopInterval={10000}
              sequential={true}
              revealDirection="center"
              speed={60}
              className="text-[clamp(3rem,9vw,7rem)] leading-[1.2] font-bold text-text"
              encryptedClassName="text-[clamp(3rem,9vw,7rem)] leading-[1.2] font-bold text-brand"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-xl text-subtle max-w-3xl mx-auto leading-relaxed"
          >
            A selection of impactful projects that showcase innovation, technical excellence, and real-world problem solving.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid xl:grid-cols-12 gap-16">
          {/* Sticky Info Rail - Desktop Only */}
          <div className="xl:col-span-4">
            <StickyRail activeProject={activeProject} />
          </div>

          {/* Projects List */}
          <div className="xl:col-span-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                isActive={index === activeProject}
                onInView={setActiveProject}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}