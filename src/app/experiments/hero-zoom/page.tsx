'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function HeroZoomExperiment() {
  const [progress, setProgress] = useState(0);
  const spacerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;

    const scrollY = window.scrollY;

    // Zoom starts immediately on first scroll, completes within ~300px of scrolling
    const zoomDistance = window.innerHeight * 0.4; // 40vh of scroll = full zoom
    const rawProgress = Math.max(0, Math.min(1, scrollY / zoomDistance));
    setProgress(rawProgress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Calculate transforms based on progress
  // Avatar starts at ~450px circle, grows to fill viewport
  const avatarBaseSize = 450; // px
  const viewportDiagonal = typeof window !== 'undefined'
    ? Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
    : 1800;
  const maxScale = (viewportDiagonal / avatarBaseSize) * 1.2;

  const scale = 1 + progress * (maxScale - 1);
  const borderRadius = 50 * (1 - progress); // 50% → 0%
  const decorativeOpacity = Math.max(0, 1 - progress * 3); // fade out fast
  const textOpacity = Math.max(0, 1 - progress * 2.5); // fade out fast
  const overlayOpacity = progress * 0.6; // darken as it zooms

  return (
    <div style={{ background: '#faf9f7' }}>
      {/* Fixed Hero */}
      <div
        ref={heroRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#faf9f7',
        }}
      >
        {/* Watermark lines (fade out) */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: textOpacity, transition: 'opacity 0.05s linear',
        }}>
          {[10, 35, 60, 85].map((top, i) => (
            <div key={i} style={{
              position: 'absolute', top: `${top}%`, width: '200%', whiteSpace: 'nowrap',
              fontSize: '6rem', fontWeight: 900, color: 'rgba(0,0,0,0.03)',
              letterSpacing: '0.1em',
              animation: `marquee-${i % 2 === 0 ? 'right' : 'left'} 30s linear infinite`,
            }}>
              THINK &nbsp;● &nbsp;PLAN &nbsp;● &nbsp;EXECUTE &nbsp;● &nbsp;THINK &nbsp;● &nbsp;PLAN &nbsp;● &nbsp;EXECUTE &nbsp;● &nbsp;THINK &nbsp;● &nbsp;PLAN &nbsp;● &nbsp;EXECUTE &nbsp;●&nbsp;
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div style={{
          position: 'relative', zIndex: 10, width: '100%', maxWidth: 1400,
          padding: '0 3rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '4rem', alignItems: 'center', minHeight: '100vh',
        }}>
          {/* Left — text (fades out) */}
          <div style={{
            opacity: textOpacity, transition: 'opacity 0.05s linear',
            transform: `translateX(${-progress * 60}px)`,
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900,
              color: '#1a1a1a', lineHeight: 1.1, marginBottom: '1rem',
            }}>
              Naman Sharma
            </h1>
            <div style={{
              background: '#1a1a1a', borderRadius: 12, padding: '1.5rem',
              maxWidth: 480,
            }}>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <p style={{ color: '#4af626', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                $ cooking innovation through automation
              </p>
            </div>
          </div>

          {/* Right — avatar (zooms) */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            position: 'relative',
          }}>
            <div
              ref={avatarRef}
              style={{
                position: 'relative',
                width: avatarBaseSize,
                height: avatarBaseSize,
                transform: `scale(${scale})`,
                borderRadius: `${borderRadius}%`,
                overflow: 'hidden',
                transition: 'none', // no transition — direct scroll control
                willChange: 'transform, border-radius',
                transformOrigin: 'center center',
              }}
            >
              <img
                src="/naman-avatar-light.png"
                alt="Naman Sharma"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit',
                }}
              />

              {/* Dark overlay as it zooms in */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `rgba(0,0,0,${overlayOpacity})`,
                borderRadius: 'inherit',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Decorative ring (fades out) */}
            <div style={{
              position: 'absolute',
              width: avatarBaseSize + 32,
              height: avatarBaseSize + 32,
              borderRadius: '50%',
              border: '2px dashed rgba(0,0,0,0.1)',
              opacity: decorativeOpacity,
              animation: 'spin 20s linear infinite',
              pointerEvents: 'none',
            }} />

            {/* Floating dots (fade out) */}
            <div style={{
              position: 'absolute', top: -20, right: 20,
              width: 16, height: 16, borderRadius: '50%',
              background: '#1a1a1a', opacity: decorativeOpacity,
              animation: 'float1 3s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 20,
              width: 12, height: 12, borderRadius: '50%',
              background: 'rgba(26,26,26,0.5)', opacity: decorativeOpacity,
              animation: 'float2 4s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>

      {/* Spacer — just enough to drive the zoom (40vh) then About appears */}
      <div ref={spacerRef} style={{ height: '50vh' }} />

      {/* Next section (appears after zoom completes) */}
      <div style={{
        position: 'relative', zIndex: 10,
        background: '#faf9f7',
        minHeight: '100vh',
        padding: '5rem 2rem',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700,
            color: '#1a1a1a', marginBottom: '2rem',
          }}>
            About
          </h2>
          <p style={{
            fontSize: '1.15rem', color: '#4a4a4a', lineHeight: 2,
          }}>
            This is where the next section would start. The avatar has zoomed to fill the screen
            and now this content scrolls over it naturally.
          </p>

          {/* Placeholder sections to show scroll continues */}
          {['Experience', 'Skills', 'Recognition'].map(section => (
            <div key={section} style={{
              marginTop: '5rem', padding: '3rem', borderRadius: 20,
              border: '1px solid #e5e2dc', background: '#fff',
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>{section}</h3>
              <p style={{ color: '#4a4a4a', lineHeight: 1.8 }}>Placeholder for {section} section content...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 100,
        background: 'rgba(0,0,0,0.8)', color: '#fff',
        padding: '0.75rem 1.25rem', borderRadius: 12,
        fontSize: '0.8rem', fontFamily: 'monospace',
        backdropFilter: 'blur(8px)',
      }}>
        zoom: {Math.round(progress * 100)}%
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0%); } }
        @keyframes marquee-left { from { transform: translateX(0%); } to { transform: translateX(-50%); } }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: auto; }
      `}</style>
    </div>
  );
}
