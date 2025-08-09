import NavBar from "../components/NavBar"
import GreetingHero from "../components/GreetingHero"
import WhatIDo from "../components/WhatIDo"
import Story from "../components/Story"
import ExperienceTimeline from "../components/ExperienceTimeline"

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-white">

      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-40 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)] animate-pulse-slow" />
        <div className="noise-mask absolute inset-0 opacity-20" />
        <div className="grid-mask absolute inset-0 opacity-15" />
      </div>

      <NavBar />
      <div className="pt-12">
        <GreetingHero />
      </div>

      <WhatIDo />
      <Story />
      <ExperienceTimeline />
    </main>
  )
}
