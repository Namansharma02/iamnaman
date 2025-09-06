import "./globals.css"

export const metadata = {
  title: "Naman Sharma - Portfolio",
  description: "Automation & Analytics Professional",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}