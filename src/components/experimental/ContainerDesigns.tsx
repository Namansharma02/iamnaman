'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Download, Sparkles, ChefHat } from 'lucide-react'

export default function ContainerDesigns() {
  const [activeDesign, setActiveDesign] = useState(1)

  // Design 1: Floating Neo-brutalist Card
  const NeoBrutalistContainer = () => (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative bg-surface border-4 border-text rounded-none shadow-[8px_8px_0px_0px_rgb(var(--color-text))] p-8"
        whileHover={{
          x: -4,
          y: -4,
          boxShadow: "12px 12px 0px 0px rgb(var(--color-text))"
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 bg-brand rounded-full" />
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <div className="w-4 h-4 bg-red-500 rounded-full" />
          </div>
          <h3 className="text-3xl font-black text-text mb-2 uppercase tracking-tight">
            Cooking Innovation
          </h3>
          <p className="text-xl font-bold text-brand uppercase tracking-wide">
            Through Strategy
          </p>
        </div>

        <div className="space-y-4">
          <motion.button
            className="w-full px-6 py-4 bg-brand text-white font-black uppercase tracking-wide border-2 border-brand hover:bg-white hover:text-brand transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              Let's Explore <ExternalLink className="w-5 h-5" />
            </span>
          </motion.button>

          <motion.button
            className="w-full px-6 py-4 bg-white text-text font-black uppercase tracking-wide border-2 border-text hover:bg-text hover:text-white transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              Download <Download className="w-5 h-5" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )

  // Design 2: Split Panel Layout
  const SplitPanelContainer = () => (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden shadow-xl bg-surface border border-border">
        {/* Left Panel - Content */}
        <div className="lg:col-span-3 p-8 bg-background">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-brand rounded-full" />
              <span className="text-sm font-semibold text-brand uppercase tracking-wide">Strategy</span>
            </div>
            <h3 className="text-3xl font-bold text-text mb-6 leading-tight">
              Cooking Innovation<br />
              <span className="text-2xl text-subtle">Through Strategy</span>
            </h3>
            <p className="text-subtle text-sm mb-6 leading-relaxed">
              Discover innovative approaches to culinary excellence through strategic thinking and creative solutions.
            </p>
          </motion.div>
        </div>

        {/* Right Panel - Actions */}
        <div className="lg:col-span-2 p-8 bg-gradient-to-br from-brand/5 to-purple-500/5 flex flex-col justify-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button className="w-full px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200">
              <span className="flex items-center justify-center gap-2">
                Let's Explore <ExternalLink className="w-4 h-4" />
              </span>
            </button>

            <button className="w-full px-6 py-3 border border-border bg-background text-text font-semibold rounded-xl hover:bg-surface transition-colors duration-200">
              <span className="flex items-center justify-center gap-2">
                Download <Download className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )

  // Design 3: Card Stack with Depth
  const CardStackContainer = () => (
    <motion.div
      className="relative max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background cards for depth */}
      <div className="absolute inset-0 transform rotate-1 rounded-2xl bg-brand/10 translate-y-2 translate-x-2" />
      <div className="absolute inset-0 transform -rotate-1 rounded-2xl bg-purple-500/10 translate-y-1 translate-x-1" />

      <motion.div
        className="relative bg-background rounded-2xl border border-border shadow-lg p-8"
        whileHover={{
          y: -8,
          rotate: 0,
          boxShadow: "0 25px 40px rgba(0, 0, 0, 0.15)"
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium text-brand">Innovation Lab</span>
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">
              Cooking Innovation
            </h3>
            <p className="text-lg text-subtle">
              Through Strategy
            </p>
          </div>
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-brand to-purple-500 flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.button
            className="w-full px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              Let's Explore <ExternalLink className="w-4 h-4" />
            </span>
          </motion.button>

          <motion.button
            className="w-full px-6 py-3 border border-border bg-surface text-text font-semibold rounded-xl hover:bg-border transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              Download <Download className="w-4 h-4" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )

  // Design 4: Terminal/Console Inspired
  const TerminalContainer = () => (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="relative rounded-lg bg-gray-900 border border-gray-700 overflow-hidden shadow-2xl"
        whileHover={{
          y: -4,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Terminal header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <span className="text-gray-400 text-sm font-mono">innovation-terminal</span>
        </div>

        <div className="p-6 font-mono">
          <div className="mb-6">
            <motion.div
              className="text-green-400 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              $ cat innovation.txt
            </motion.div>
            <motion.div
              className="text-white text-xl mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              🍳 COOKING INNOVATION
            </motion.div>
            <motion.div
              className="text-blue-400 text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              → through strategic thinking
            </motion.div>
            <motion.div
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              [STATUS: Ready for exploration]
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.button
              className="w-full px-4 py-3 bg-green-600 text-black font-bold rounded hover:bg-green-500 transition-colors duration-200 font-mono"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="flex items-center justify-center gap-2">
                $ ./explore.sh <ExternalLink className="w-4 h-4" />
              </span>
            </motion.button>

            <motion.button
              className="w-full px-4 py-3 border border-gray-600 bg-gray-800 text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors duration-200 font-mono"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <span className="flex items-center justify-center gap-2">
                $ wget strategy.zip <Download className="w-4 h-4" />
              </span>
            </motion.button>
          </div>

          <motion.div
            className="mt-4 text-green-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          >
            <span className="animate-pulse">█</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )

  const designs = [
    { id: 1, name: "Neo-Brutalist", component: NeoBrutalistContainer },
    { id: 2, name: "Split Panel", component: SplitPanelContainer },
    { id: 3, name: "Card Stack", component: CardStackContainer },
    { id: 4, name: "Terminal Style", component: TerminalContainer },
  ]

  const ActiveComponent = designs.find(d => d.id === activeDesign)?.component || NeoBrutalistContainer

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Design Selector */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text mb-6">Container Design Experiments</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {designs.map((design) => (
              <button
                key={design.id}
                onClick={() => setActiveDesign(design.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeDesign === design.id
                    ? 'bg-brand text-white shadow-lg'
                    : 'bg-surface text-text hover:bg-border'
                }`}
              >
                {design.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Design */}
        <motion.div
          key={activeDesign}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  )
}