'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const deskItems = [
  {
    id: 'camera',
    name: 'Photography',
    tagline: 'Featured in Lonely Planet & JPMorgan homepage',
    since: '2015',
    // Camera on desk
    x: 5, y: 8, width: 14, height: 18,
    mobileOrder: 0,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: isHovered ? -8 : 5 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Camera body */}
          <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg relative">
            {/* Lens */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-500 shadow-inner">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800">
                <div className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-white/40" />
              </div>
            </div>
            {/* Flash */}
            <div className={`absolute -top-1.5 right-2 w-3 h-2 rounded-t-sm transition-colors duration-300 ${isHovered ? 'bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,0.6)]' : 'bg-gray-500'}`} />
            {/* Viewfinder */}
            <div className="absolute -top-1 left-3 w-4 h-2 rounded-t-sm bg-gray-600" />
          </div>
          {/* Strap */}
          <div className="absolute -left-3 top-2 w-3 h-1 bg-red-700 rounded-full" />
          <div className="absolute -right-3 top-2 w-3 h-1 bg-red-700 rounded-full" />
        </motion.div>
      </div>
    ),
  },
  {
    id: 'vinyl',
    name: 'Music',
    tagline: 'From qawwali & ghazal to hip hop & Beethoven',
    since: '2006',
    // Record player area
    x: 20, y: 2, width: 22, height: 26,
    mobileOrder: 1,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-end justify-center pb-2">
        <div className="relative">
          {/* Turntable base */}
          <div className="w-28 h-20 rounded-lg bg-gradient-to-b from-amber-900 to-amber-950 shadow-lg p-2">
            {/* Platter */}
            <motion.div
              className="w-16 h-16 rounded-full bg-gray-900 mx-auto border border-gray-700 flex items-center justify-center"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
            >
              {/* Grooves */}
              <div className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border border-gray-800 flex items-center justify-center">
                    {/* Label */}
                    <div className="w-4 h-4 rounded-full bg-red-800" />
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Tonearm */}
            <motion.div
              className="absolute top-3 right-3 origin-top-right"
              animate={{ rotate: isHovered ? -20 : -35 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-0.5 h-10 bg-gray-400 rounded-full" />
              <div className="w-1.5 h-2 bg-gray-500 rounded-sm -ml-0.5" />
            </motion.div>
          </div>
          {/* Headphones next to it */}
          <div className="absolute -right-6 bottom-0">
            <div className="w-8 h-6 border-t-[3px] border-l-[3px] border-r-[3px] border-gray-600 rounded-t-full" />
            <div className="flex justify-between w-8">
              <div className="w-2.5 h-3 rounded-b-full bg-gray-700" />
              <div className="w-2.5 h-3 rounded-b-full bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'books',
    name: 'Reading',
    tagline: 'Used to read a book a week — restarting soon',
    since: '2012',
    // Stack of books
    x: 44, y: 5, width: 12, height: 20,
    mobileOrder: 2,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-end justify-center pb-2">
        <motion.div animate={{ y: isHovered ? -4 : 0 }} className="relative">
          {/* Stacked books */}
          <div className="relative">
            <div className="w-14 h-3 rounded-sm bg-teal-800 shadow-sm" style={{ transform: 'rotate(-2deg)' }} />
            <div className="w-12 h-3 rounded-sm bg-amber-800 shadow-sm -mt-0.5 ml-1" style={{ transform: 'rotate(1deg)' }} />
            <div className="w-14 h-3 rounded-sm bg-indigo-900 shadow-sm -mt-0.5" style={{ transform: 'rotate(-1deg)' }} />
            <div className="w-11 h-3 rounded-sm bg-red-900 shadow-sm -mt-0.5 ml-1.5" style={{ transform: 'rotate(2deg)' }} />
            {/* Open book on top */}
            <motion.div
              className="mt-1 relative"
              animate={{ rotateX: isHovered ? 10 : 0 }}
            >
              <div className="w-16 h-2 bg-amber-50 rounded-sm shadow-md mx-auto" style={{
                background: 'linear-gradient(90deg, #fdf6e3 49%, #ccc 49.5%, #ccc 50.5%, #fdf6e3 51%)',
              }}>
                <div className="absolute top-0.5 left-2 right-2 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-[1px] flex-1 bg-gray-300/60" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: 'rubiks',
    name: 'Puzzles',
    tagline: "If it has a solution, I'll find it",
    since: '2008',
    // Rubik's cube
    x: 82, y: 10, width: 12, height: 16,
    mobileOrder: 5,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: isHovered ? 15 : -5, scale: isHovered ? 1.1 : 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {/* 3x3 cube face */}
          <div className="grid grid-cols-3 gap-[2px] p-1 bg-gray-900 rounded-md shadow-lg" style={{ width: 42, height: 42 }}>
            {['bg-red-500', 'bg-white', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400', 'bg-red-500', 'bg-orange-500', 'bg-blue-500', 'bg-green-500'].map((color, i) => (
              <motion.div
                key={i}
                className={`${color} rounded-[2px]`}
                animate={isHovered ? { scale: [1, 0.9, 1] } : {}}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: 'gamepad',
    name: 'Gaming',
    tagline: '20 years in, 80 more to go',
    since: '2004',
    // Controller
    x: 58, y: 8, width: 16, height: 18,
    mobileOrder: 3,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: isHovered ? 0 : 8, y: isHovered ? -3 : 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {/* Controller body */}
          <div className="relative">
            <div className="w-20 h-10 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg relative">
              {/* D-pad */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-6 bg-gray-600 rounded-sm absolute left-1 top-0" />
                <div className="h-2 w-6 bg-gray-600 rounded-sm absolute top-2 left-0" />
              </div>
              {/* Buttons */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-[3px]">
                <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${isHovered ? 'bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.6)]' : 'bg-green-700'}`} />
                <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${isHovered ? 'bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.6)]' : 'bg-red-700'}`} />
                <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${isHovered ? 'bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.6)]' : 'bg-blue-700'}`} />
                <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${isHovered ? 'bg-yellow-400 shadow-[0_0_4px_rgba(250,204,21,0.6)]' : 'bg-yellow-700'}`} />
              </div>
              {/* Analog sticks */}
              <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-600 border border-gray-500" />
              <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-600 border border-gray-500" />
              {/* Handles */}
              <div className="absolute -bottom-2 left-1 w-5 h-4 bg-gray-850 rounded-b-xl bg-gradient-to-b from-gray-800 to-gray-900" />
              <div className="absolute -bottom-2 right-1 w-5 h-4 bg-gray-850 rounded-b-xl bg-gradient-to-b from-gray-800 to-gray-900" />
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: 'sneaker',
    name: 'Sneakers',
    tagline: 'Collecting as many as I can',
    since: '2018',
    // Sneaker
    x: 76, y: 28, width: 18, height: 16,
    mobileOrder: 6,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: isHovered ? -5 : 10, y: isHovered ? -4 : 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {/* Sneaker side view */}
          <div className="relative">
            <svg width="60" height="30" viewBox="0 0 60 30">
              {/* Sole */}
              <path d="M5 25 Q0 25 2 22 L8 18 Q20 16 35 16 L55 18 Q60 19 58 22 Q57 25 55 25 Z" fill="#333" />
              {/* Midsole */}
              <path d="M5 22 L8 18 Q20 16 35 16 L55 18 Q58 19 56 22 Z" fill="white" stroke="#ddd" strokeWidth="0.5" />
              {/* Upper */}
              <path d="M8 18 Q10 8 18 5 Q25 2 32 4 L35 16 Q20 16 8 18 Z" fill={isHovered ? '#e11d48' : '#9B4D4D'} className="transition-all duration-300" />
              {/* Toe box */}
              <path d="M35 16 L55 18 Q50 12 40 10 L32 4 Q34 8 35 16 Z" fill={isHovered ? '#be123c' : '#7a3d3d'} className="transition-all duration-300" />
              {/* Swoosh / stripe */}
              <path d="M12 15 Q25 10 45 14" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
              {/* Laces */}
              <line x1="20" y1="8" x2="28" y2="6" stroke="white" strokeWidth="1" opacity="0.7" />
              <line x1="22" y1="10" x2="30" y2="8" stroke="white" strokeWidth="1" opacity="0.7" />
            </svg>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: 'manga',
    name: 'Anime',
    tagline: 'Can talk hours on this — try me',
    since: '2010',
    // Manga volumes
    x: 0, y: 32, width: 14, height: 18,
    mobileOrder: 4,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-end justify-center pb-1">
        <div className="flex items-end gap-[2px]">
          {['from-blue-800 to-blue-900', 'from-orange-700 to-orange-800', 'from-purple-800 to-purple-900'].map((grad, i) => (
            <motion.div
              key={i}
              className={`rounded-t-sm bg-gradient-to-b ${grad} shadow-sm`}
              style={{ width: 12, height: 38 - i * 4 }}
              animate={isHovered && i === 1 ? { y: -6 } : { y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Spine text area */}
              <div className="h-full flex items-center justify-center">
                <div className="w-[1px] h-4 bg-white/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'chart',
    name: 'Politics & Markets',
    tagline: 'How global dynamics shape the world',
    since: '2019',
    // Monitor with chart
    x: 30, y: 28, width: 20, height: 22,
    mobileOrder: 7,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
          {/* Monitor */}
          <div className="w-24 h-16 rounded-md bg-gradient-to-br from-gray-800 to-gray-900 p-1.5 shadow-lg border border-gray-700">
            {/* Screen */}
            <div className="w-full h-full rounded-sm bg-gray-950 p-1.5 overflow-hidden">
              {/* Chart */}
              <svg width="100%" height="100%" viewBox="0 0 60 30">
                {/* Grid lines */}
                {[10, 20].map(y => (
                  <line key={y} x1="0" y1={y} x2="60" y2={y} stroke="#1a3a2a" strokeWidth="0.5" />
                ))}
                {/* Chart line */}
                <motion.path
                  d="M0 25 L10 20 L18 22 L25 15 L32 18 L40 8 L48 12 L55 5 L60 8"
                  fill="none"
                  stroke={isHovered ? '#4ade80' : '#22c55e'}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
                {/* Area fill */}
                <motion.path
                  d="M0 25 L10 20 L18 22 L25 15 L32 18 L40 8 L48 12 L55 5 L60 8 L60 30 L0 30 Z"
                  fill="url(#chartGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 0.3 : 0.15 }}
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          {/* Stand */}
          <div className="w-6 h-3 bg-gray-700 mx-auto rounded-b-sm" />
          <div className="w-10 h-1 bg-gray-600 mx-auto rounded-full" />
        </div>
      </div>
    ),
  },
  {
    id: 'shoes',
    name: 'Running',
    tagline: 'Targeting 10K & 21K marathon this year',
    since: '2023',
    // Running shoes + medal
    x: 54, y: 34, width: 14, height: 14,
    mobileOrder: 8,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: isHovered ? 0 : -5 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Medal */}
          <div className="relative">
            <div className="w-2 h-4 bg-blue-600 mx-auto rounded-t-sm" />
            <motion.div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mx-auto -mt-1 transition-colors duration-300 ${isHovered ? 'border-yellow-400 bg-yellow-500' : 'border-yellow-700 bg-yellow-800'}`}
              animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[8px]">🏅</span>
            </motion.div>
          </div>
          {/* Stopwatch */}
          <div className="absolute -right-5 top-0 w-5 h-6 rounded-full bg-gray-300 border border-gray-400 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white border border-gray-300">
              <div className="w-[1px] h-1.5 bg-red-500 mx-auto mt-0.5 origin-bottom" style={{ transform: 'rotate(45deg)' }} />
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    id: 'gadgets',
    name: 'Tech & Gadgets',
    tagline: 'Hardcore geek — I try everything',
    since: '2004',
    // Phone + smartwatch + earbuds
    x: 15, y: 34, width: 14, height: 16,
    mobileOrder: 9,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ y: isHovered ? -2 : 0 }}
          className="relative"
        >
          {/* Phone */}
          <div className={`w-8 h-14 rounded-lg border-2 transition-colors duration-300 ${isHovered ? 'border-gray-500 bg-gray-800' : 'border-gray-600 bg-gray-900'}`}>
            <div className="w-2 h-0.5 bg-gray-600 mx-auto mt-1 rounded-full" />
            <div className={`mx-1 mt-1 h-8 rounded-sm transition-colors duration-300 ${isHovered ? 'bg-blue-500/30' : 'bg-gray-800'}`}>
              {isHovered && (
                <motion.div
                  className="grid grid-cols-2 gap-0.5 p-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-1.5 rounded-[1px] bg-blue-400/40" />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          {/* Earbuds case */}
          <div className="absolute -right-5 bottom-1 w-5 h-6 rounded-full bg-white shadow-md border border-gray-200" />
        </motion.div>
      </div>
    ),
  },
  {
    id: 'disco',
    name: 'Dancing & Hosting',
    tagline: 'Never afraid to take center stage',
    since: '2010',
    // Disco ball + mic
    x: 70, y: 0, width: 12, height: 14,
    mobileOrder: 10,
    render: (isHovered: boolean) => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
          {/* String */}
          <div className="w-[1px] h-3 bg-gray-500 mx-auto" />
          {/* Disco ball */}
          <motion.div
            className="w-8 h-8 rounded-full mx-auto relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e5e5e5, #999, #e5e5e5, #aaa)',
              boxShadow: isHovered ? '0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(200,200,255,0.15)' : '0 2px 4px rgba(0,0,0,0.3)',
            }}
            animate={isHovered ? { rotate: 360 } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            {/* Mirror tiles */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-[1px]">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-white/30"
                  animate={isHovered ? { opacity: [0.2, 0.8, 0.2] } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
          {/* Mic */}
          <div className="absolute -right-4 top-2">
            <div className="w-2.5 h-4 rounded-t-full bg-gray-600 border border-gray-500" />
            <div className="w-1 h-5 bg-gray-700 mx-auto" />
          </div>
        </div>
      </div>
    ),
  },
]

export default function HobbiesExperiment() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const activeHobby = deskItems.find(d => d.id === activeItem)

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8 px-4">
      <div ref={ref} className="w-full max-w-6xl mx-auto">

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Desk</h2>
          <p className="text-sm text-gray-400">Click on anything to explore</p>
        </motion.div>

        {/* ═══ DESKTOP — Isometric desk scene ═══ */}
        <div className="hidden md:block">
          <motion.div
            className="relative mx-auto rounded-2xl overflow-hidden"
            style={{
              maxWidth: 900,
              height: 520,
              background: 'linear-gradient(180deg, #e8e0d4 0%, #d9cfc0 100%)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Wall */}
            <div className="absolute top-0 left-0 right-0 h-[45%]" style={{
              background: 'linear-gradient(180deg, #f0ebe3, #e8e0d4)',
            }}>
              {/* Wall art / poster */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-20 rounded-sm border-4 border-white shadow-md overflow-hidden" style={{
                background: 'linear-gradient(135deg, #2d2d3d, #1a1a2e)',
              }}>
                <div className="w-full h-full flex items-center justify-center text-[8px] text-white/30 uppercase tracking-[0.3em]">
                  Think Plan Execute
                </div>
              </div>
            </div>

            {/* Desk surface */}
            <div className="absolute bottom-0 left-[5%] right-[5%] h-[55%] rounded-t-xl" style={{
              background: 'linear-gradient(180deg, #8B6914, #7a5c12, #6a4c10)',
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.08), 0 -4px 20px rgba(0,0,0,0.15)',
            }}>
              {/* Wood grain */}
              <div className="absolute inset-0 rounded-t-xl opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 41px)',
              }} />

              {/* Desk edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-yellow-600/20" />
            </div>

            {/* Desk items */}
            {deskItems.map((item, i) => {
              const isHovered = hoveredItem === item.id

              return (
                <motion.div
                  key={item.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y + 45}%`,
                    width: `${item.width}%`,
                    height: `${item.height}%`,
                  }}
                  initial={isInView ? { opacity: 0, y: 20 } : false}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 200, damping: 20 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setActiveItem(item.id)}
                >
                  {/* Hover glow */}
                  {isHovered && (
                    <motion.div
                      className="absolute -inset-3 rounded-2xl pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}

                  {item.render(isHovered)}

                  {/* Label on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        <span className="text-[10px] font-semibold text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                          {item.name}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}

            {/* Desk lamp */}
            <div className="absolute bottom-[55%] right-[8%] z-[5]">
              <div className="w-1 h-12 bg-gray-600 mx-auto origin-bottom" style={{ transform: 'rotate(-10deg)' }} />
              <div className="w-8 h-4 bg-gradient-to-b from-gray-500 to-gray-600 rounded-t-full -mt-1 ml-1" style={{ transform: 'rotate(-10deg)' }}>
                <div className="w-4 h-2 bg-yellow-100/30 rounded-full mx-auto mt-2" />
              </div>
              <div className="w-6 h-1.5 bg-gray-700 rounded-full mx-auto mt-8" />
            </div>

            {/* Coffee mug */}
            <div className="absolute bottom-[15%] right-[12%] z-[5]">
              <div className="w-6 h-7 bg-white rounded-b-md border border-gray-200 shadow-sm relative">
                <div className="absolute right-[-5px] top-1 w-3 h-4 border-2 border-gray-300 rounded-r-full" />
                {/* Coffee */}
                <div className="absolute top-1 left-0.5 right-0.5 h-2 bg-amber-800 rounded-t-sm" />
              </div>
            </div>

            {/* Small plant */}
            <div className="absolute bottom-[55%] left-[10%] z-[5]">
              <div className="relative">
                <div className="w-5 h-4 bg-amber-700 rounded-b-md mx-auto shadow-sm" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-4 bg-green-700 mx-auto" />
                  <div className="w-4 h-3 bg-green-600 rounded-full -mt-2 mx-auto" />
                  <div className="w-3 h-2 bg-green-500 rounded-full -mt-2 ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══ MOBILE — Grid of objects ═══ */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-3">
            {[...deskItems].sort((a, b) => a.mobileOrder - b.mobileOrder).map((item, i) => {
              const isHovered = hoveredItem === item.id
              return (
                <motion.div
                  key={item.id}
                  className="aspect-square rounded-xl cursor-pointer relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #8B6914, #7a5c12)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  initial={isInView ? { opacity: 0, scale: 0.9 } : false}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveItem(item.id)}
                  onTouchStart={() => setHoveredItem(item.id)}
                  onTouchEnd={() => setHoveredItem(null)}
                >
                  <div className="w-full h-full p-2">
                    {item.render(isHovered)}
                  </div>
                  <div className="absolute bottom-1.5 left-0 right-0 text-center">
                    <span className="text-[8px] font-bold text-white/60 uppercase tracking-wider">{item.name}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ═══ DETAIL MODAL ═══ */}
        <AnimatePresence>
          {activeItem && activeHobby && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setActiveItem(null)}
              />
              <motion.div
                className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Object display */}
                <div className="relative p-8 flex items-center justify-center" style={{
                  background: 'linear-gradient(145deg, #8B6914, #6a4c10)',
                  minHeight: 160,
                }}>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X size={14} className="text-white/70" />
                  </button>
                  <div className="transform scale-150">
                    {activeHobby.render(true)}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activeHobby.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{activeHobby.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Since {activeHobby.since}</span>
                    {/* Nav */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const idx = deskItems.findIndex(d => d.id === activeItem)
                          setActiveItem(deskItems[(idx - 1 + deskItems.length) % deskItems.length].id)
                        }}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ← Prev
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const idx = deskItems.findIndex(d => d.id === activeItem)
                          setActiveItem(deskItems[(idx + 1) % deskItems.length].id)
                        }}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
