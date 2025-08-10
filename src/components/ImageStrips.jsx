"use client"

export default function ImageStrips() {
  const images = [
    "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523395243481-163f8f6155d8?q=80&w=1200&auto=format&fit=crop",
  ]

  return (
    <section className="relative py-24">
      <div className="mask-fade pointer-events-none absolute inset-x-0 top-0 h-20" />
      <div className="overflow-hidden">
        <div className="strip left-to-right">
          {images.concat(images).map((src, i) => (
            <img key={`a-${i}`} src={src} className="tile" alt="gallery" />
          ))}
        </div>
        <div className="strip right-to-left mt-6">
          {images.concat(images).map((src, i) => (
            <img key={`b-${i}`} src={src} className="tile" alt="gallery" />
          ))}
        </div>
      </div>
      <div className="mask-fade pointer-events-none absolute inset-x-0 bottom-0 h-20 rotate-180" />
    </section>
  )
}