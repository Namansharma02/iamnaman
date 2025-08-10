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
    icon: "/naman-avatar.png",
    shortcut: "/naman-avatar.png",
    apple: "/naman-avatar.png"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon uses the same avatar image */}
        <link rel="icon" type="image/png" href="/naman-avatar.png" />
        <link rel="apple-touch-icon" href="/naman-avatar.png" />
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