'use client'

export default function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between rounded-b-2xl bg-black/40 backdrop-blur border-b border-white/10">
        <a href="#top" className="font-semibold tracking-tight text-white">Naman</a>
        <div className="flex items-center gap-6 text-sm text-neutral-300">
          <a href="#what-i-do" className="hover:text-white">What I do</a>
          <a href="#story" className="hover:text-white">Story</a>
          <a href="#experience" className="hover:text-white">Experience</a>
          <a href="mailto:hello@iamnaman.in" className="rounded px-3 py-1.5 bg-white text-black font-medium">Contact</a>
        </div>
      </nav>
    </header>
  )
}
