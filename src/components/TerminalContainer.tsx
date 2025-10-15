'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Download } from 'lucide-react'

interface TerminalContainerProps {
  title?: string
  subtitle?: string
  exploreText?: string
  downloadText?: string
  className?: string
}

export default function TerminalContainer({
  title = "🍳 COOKING INNOVATION",
  subtitle = "→ through strategic thinking",
  exploreText = "$ ./explore.sh",
  downloadText = "$ wget strategy.zip",
  className = ""
}: TerminalContainerProps) {
  const [typedCommand, setTypedCommand] = useState('')
  const [typedTitle, setTypedTitle] = useState('')
  const [typedSubtitle, setTypedSubtitle] = useState('')
  const [typedStatus, setTypedStatus] = useState('')
  const [typedExplore, setTypedExplore] = useState('')
  const [typedDownload, setTypedDownload] = useState('')
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const commandText = "$ cat innovation.txt"
  const statusText = "[STATUS: Ready for exploration]"
  const rotatingWords = ["Strategy", "Technology", "Automation"]
  const subtitlePrefix = "→ through "

  const handleExplore = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownload = () => {
    window.open('/resume.pdf', '_blank')
  }

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Rotating word effect (starts after phase 5 is complete)
  useEffect(() => {
    if (currentPhase < 6) return // Only start rotating after initial animation

    console.log('Rotation active - Phase:', currentPhase, 'Word:', rotatingWords[rotatingWordIndex], 'Deleting:', isDeleting)

    let timeoutId: NodeJS.Timeout

    const currentWord = rotatingWords[rotatingWordIndex]
    const currentText = typedSubtitle.replace(subtitlePrefix, '')

    if (!isDeleting) {
      // Typing the word
      if (currentText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setTypedSubtitle(subtitlePrefix + currentWord.slice(0, currentText.length + 1))
        }, 100)
      } else {
        // Word complete, wait then start deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
      }
    } else {
      // Deleting the word
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setTypedSubtitle(subtitlePrefix + currentText.slice(0, -1))
        }, 50)
      } else {
        // Word deleted, move to next word
        setIsDeleting(false)
        setRotatingWordIndex((prev) => (prev + 1) % rotatingWords.length)
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentPhase, typedSubtitle, rotatingWordIndex, isDeleting])

  // Sequential typing animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const typeText = (text: string, setter: React.Dispatch<React.SetStateAction<string>>, speed: number = 50) => {
      let index = 0
      const type = () => {
        if (index <= text.length) {
          setter(text.slice(0, index))
          index++
          timeoutId = setTimeout(type, speed)
        } else {
          timeoutId = setTimeout(() => setCurrentPhase(prev => prev + 1), 300)
        }
      }
      type()
    }

    switch (currentPhase) {
      case 0:
        // Type command
        timeoutId = setTimeout(() => {
          typeText(commandText, setTypedCommand, 80)
        }, 500)
        break
      case 1:
        // Type title
        typeText(title, setTypedTitle, 60)
        break
      case 2:
        // Type subtitle with first rotating word
        const initialSubtitle = subtitlePrefix + rotatingWords[0]
        typeText(initialSubtitle, setTypedSubtitle, 60)
        break
      case 3:
        // Type status
        typeText(statusText, setTypedStatus, 40)
        break
      case 4:
        // Type explore button
        typeText(exploreText, setTypedExplore, 60)
        break
      case 5:
        // Type download button and then advance to rotation phase
        typeText(downloadText, setTypedDownload, 60)
        break
      case 6:
        // Wait before starting rotation
        timeoutId = setTimeout(() => {
          // Phase 6 just waits, the rotation effect handles the rest
        }, 2000)
        break
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentPhase, commandText, title, exploreText, downloadText])

  return (
    <motion.div
      className={`max-w-2xl mx-auto ${className}`}
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

        <div className="p-6 2xl:p-7 3xl:p-9 font-mono">
          <div className="mb-6">
            {/* Command line */}
            <div className="text-green-400 mb-2 min-h-[1.5rem]">
              {typedCommand}
              {currentPhase === 0 && (
                <span
                  className="ml-1 text-green-400"
                  style={{ opacity: showCursor ? 1 : 0 }}
                >
                  |
                </span>
              )}
            </div>

            {/* Title */}
            {typedTitle && (
              <div className="text-white text-xl 2xl:text-xl 3xl:text-2xl mb-2 min-h-[1.75rem]">
                {typedTitle}
                {currentPhase === 1 && (
                  <span
                    className="ml-1 text-white"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    |
                  </span>
                )}
              </div>
            )}

            {/* Subtitle */}
            {typedSubtitle && (
              <div className="text-blue-400 text-lg 2xl:text-lg 3xl:text-xl mb-4 min-h-[1.5rem]">
                {typedSubtitle}
                {(currentPhase === 2 || currentPhase >= 6) && (
                  <span
                    className="ml-1 text-blue-400"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    |
                  </span>
                )}
              </div>
            )}

            {/* Status */}
            {typedStatus && (
              <div className="text-gray-400 text-sm 2xl:text-sm 3xl:text-base min-h-[1.25rem]">
                {typedStatus}
                {currentPhase === 3 && (
                  <span
                    className="ml-1 text-gray-400"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    |
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            {/* Explore button */}
            {typedExplore && (
              <motion.button
                className="w-full px-4 py-3 2xl:px-5 2xl:py-3 3xl:px-7 3xl:py-4 bg-green-600 text-black font-bold rounded hover:bg-green-500 transition-colors duration-200 font-mono text-sm 2xl:text-sm 3xl:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExplore}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {typedExplore}
                  {currentPhase === 4 && (
                    <span
                      className="text-black"
                      style={{ opacity: showCursor ? 1 : 0 }}
                    >
                      |
                    </span>
                  )}
                  {currentPhase > 4 && <ExternalLink className="w-4 h-4 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5" />}
                </span>
              </motion.button>
            )}

            {/* Download button */}
            {typedDownload && (
              <motion.button
                className="w-full px-4 py-3 2xl:px-5 2xl:py-3 3xl:px-7 3xl:py-4 border border-gray-600 bg-gray-800 text-gray-300 font-bold rounded hover:bg-gray-700 transition-colors duration-200 font-mono text-sm 2xl:text-sm 3xl:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {typedDownload}
                  {currentPhase === 5 && (
                    <span
                      className="text-gray-300"
                      style={{ opacity: showCursor ? 1 : 0 }}
                    >
                      |
                    </span>
                  )}
                  {currentPhase > 5 && <Download className="w-4 h-4 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5" />}
                </span>
              </motion.button>
            )}
          </div>

          {/* Final cursor */}
          {currentPhase > 5 && (
            <motion.div
              className="mt-4 text-green-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="animate-pulse">█</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}