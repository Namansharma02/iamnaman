import CleanHeader from '@/components/CleanHeader'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Recognition from '@/components/Recognition'
import Photography from '@/components/Photography'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollImageMerge from '@/components/ScrollImageMerge'
import {FixedFullScreenNav }  from '@/components/mobile-nav'
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

        {/* Divider 1: About → Experience */}
        <ScrollImageMerge
          mobilePairs={[
            { front: '/scroll-images/experience/mobile/front1.png', back: '/scroll-images/experience/mobile/back1.png' },
            { front: '/scroll-images/experience/mobile/front2.png', back: '/scroll-images/experience/mobile/back2.png' }
          ]}
          desktopPairs={[
            { front: '/scroll-images/experience/desktop/front1.png', back: '/scroll-images/experience/desktop/back1.png' },
            { front: '/scroll-images/experience/desktop/front2.png', back: '/scroll-images/experience/desktop/back2.png' },
            { front: '/scroll-images/experience/desktop/front3.png', back: '/scroll-images/experience/desktop/back3.png' }
          ]}
        />

        <Experience />

        {/* Divider 2: Experience → Skills */}
        <ScrollImageMerge
          mobilePairs={[
            { front: '/scroll-images/skills/mobile/front1.png', back: '/scroll-images/skills/mobile/back1.png' },
            { front: '/scroll-images/skills/mobile/front2.png', back: '/scroll-images/skills/mobile/back2.png' }
          ]}
          desktopPairs={[
            { front: '/scroll-images/skills/desktop/front1.png', back: '/scroll-images/skills/desktop/back1.png' },
            { front: '/scroll-images/skills/desktop/front2.png', back: '/scroll-images/skills/desktop/back2.png' },
            { front: '/scroll-images/skills/desktop/front3.png', back: '/scroll-images/skills/desktop/back3.png' }
          ]}
        />

        <Skills />

        {/* Divider 3: Skills → Recognition */}
        <ScrollImageMerge
          mobilePairs={[
            { front: '/scroll-images/recognition/mobile/front1.png', back: '/scroll-images/recognition/mobile/back1.png' },
            { front: '/scroll-images/recognition/mobile/front2.png', back: '/scroll-images/recognition/mobile/back2.png' }
          ]}
          desktopPairs={[
            { front: '/scroll-images/recognition/desktop/front1.png', back: '/scroll-images/recognition/desktop/back1.png' },
            { front: '/scroll-images/recognition/desktop/front2.png', back: '/scroll-images/recognition/desktop/back2.png' },
            { front: '/scroll-images/recognition/desktop/front3.png', back: '/scroll-images/recognition/desktop/back3.png' }
          ]}
        />

        <Recognition />

        {/* Divider 4: Recognition → Photography */}
        <ScrollImageMerge
          mobilePairs={[
            { front: '/scroll-images/photography/mobile/front1.png', back: '/scroll-images/photography/mobile/back1.png' },
            { front: '/scroll-images/photography/mobile/front2.png', back: '/scroll-images/photography/mobile/back2.png' }
          ]}
          desktopPairs={[
            { front: '/scroll-images/photography/desktop/front1.png', back: '/scroll-images/photography/desktop/back1.png' },
            { front: '/scroll-images/photography/desktop/front2.png', back: '/scroll-images/photography/desktop/back2.png' },
            { front: '/scroll-images/photography/desktop/front3.png', back: '/scroll-images/photography/desktop/back3.png' }
          ]}
        />

        <Photography photos={photos} />

        {/* Divider 5: Photography → Contact */}
        <ScrollImageMerge
          mobilePairs={[
            { front: '/scroll-images/contact/mobile/front1.png', back: '/scroll-images/contact/mobile/back1.png' },
            { front: '/scroll-images/contact/mobile/front2.png', back: '/scroll-images/contact/mobile/back2.png' }
          ]}
          desktopPairs={[
            { front: '/scroll-images/contact/desktop/front1.png', back: '/scroll-images/contact/desktop/back1.png' },
            { front: '/scroll-images/contact/desktop/front2.png', back: '/scroll-images/contact/desktop/back2.png' },
            { front: '/scroll-images/contact/desktop/front3.png', back: '/scroll-images/contact/desktop/back3.png' }
          ]}
        />

        <Contact />
      </main>
      <Footer />
    </>
  )
}
