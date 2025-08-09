"use client"

import { useState } from "react"
import NavBar from "../components/NavBar"
import GreetingHero from "../components/GreetingHero"
import WhatIDo from "../components/WhatIDo"
import Story from "../components/Story"
import ExperienceTimeline from "../components/ExperienceTimeline"
import MatrixBackground from "../components/bg/MatrixBackground"
// import CursorTrail from "../components/bg/CursorTrail"

export default function Home() {
  const [bg, setBg] = useState('matrix')

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-white"
    >
      {bg === 'matrix' ? <MatrixBackground /> : null}
      {/* <CursorTrail
        color="255,255,255"
        headWidth={18}
        tailMin={36}
        blur={34}
        maxStep={1.2}
        decayPerSec={1200}
        zIndex={9}
      /> */}

      <div className="relative z-10">
        <NavBar onChangeBg={setBg} currentBg={bg} />
        <div className="pt-12">
          <GreetingHero />
        </div>
        <WhatIDo />
        <Story />
        <ExperienceTimeline />
      </div>
    </main>
  )
}
