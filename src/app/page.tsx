import CleanHeader from '@/components/CleanHeader'
import SimpleMobileNav from '@/components/SimpleMobileNav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Recognition from '@/components/Recognition'
import Photography from '@/components/Photography'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { BottomTabNav, SlideDrawerNav, FloatingActionNav, FullScreenNav, FixedFullScreenNav, DotsNav }  from '@/components/mobile-nav'
import { getPhotographyImages } from '@/lib/getPhotos'

export default function Home() {
  const photos = getPhotographyImages()

  return (
    <>
      <CleanHeader />
      <FixedFullScreenNav />
      <main id="main-content" className="w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
        <Hero />
        {/* Spacer div to maintain scroll height where Hero was */}
        <div className="h-[60vh] w-full"></div>
        <About />
        <Experience />
        <Skills />
        <Recognition />
        <Photography photos={photos} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}