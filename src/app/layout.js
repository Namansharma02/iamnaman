import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Naman's Portfolio",
  description: "Automation & Analytics Portfolio of Naman",
  icons: {
    icon: "/naman-avatar-light.png",
    shortcut: "/naman-avatar-light.png",
    apple: "/naman-avatar-light.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon uses the same avatar image */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/naman-avatar-light.png" />
        <link rel="apple-touch-icon" href="/naman-avatar-light.png" />

        {/* Force any hard refresh to land on home, strip hash, and disable auto scroll restore */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try { history.scrollRestoration = 'manual' } catch (e) {}
              if (location.hash) {
                try { history.replaceState(null, '', location.pathname + location.search) } catch (e) {}
              }
              if (location.pathname !== '/') {
                try { location.replace('/') } catch (e) {}
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
