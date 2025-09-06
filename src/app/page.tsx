import CleanHeader from '@/components/CleanHeader'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Photography from '@/components/Photography'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <CleanHeader />
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