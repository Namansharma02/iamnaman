import CleanHeader from '@/components/CleanHeader'
import SimpleMobileNav from '@/components/SimpleMobileNav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Photography from '@/components/Photography'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { BottomTabNav, SlideDrawerNav, FloatingActionNav, FullScreenNav, FixedFullScreenNav, DotsNav }  from '@/components/mobile-nav'

export default function Home() {
  return (
    <>
      <CleanHeader />
      <FixedFullScreenNav />
      <main id="main-content" suppressHydrationWarning>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Photography />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}