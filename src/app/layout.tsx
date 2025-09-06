'use client'

import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Naman Sharma - Automation & Analytics Lead</title>
        <meta name="description" content="Automation & Analytics Lead at JPMorgan Chase, specializing in Python, Tableau, and strategic automation solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Naman Sharma - Automation & Analytics Lead" />
        <meta property="og:description" content="Automation & Analytics Lead specializing in Python, Tableau, and strategic automation solutions." />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Naman Sharma - Automation & Analytics Lead" />
        <meta name="twitter:description" content="Automation & Analytics Lead specializing in Python, Tableau, and strategic automation solutions." />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Naman Sharma",
              "jobTitle": "Automation & Analytics Lead",
              "worksFor": {
                "@type": "Organization",
                "name": "JPMorgan Chase & Co."
              },
              "sameAs": [
                "https://www.linkedin.com/in/namansharma0297/"
              ]
            })
          }}
        />
        
        {/* Prevent FOUC by setting theme immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div id="theme-context" data-theme="light" suppressHydrationWarning>
          {children}
        </div>
      </body>
    </html>
  )
}