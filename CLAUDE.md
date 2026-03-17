# CLAUDE.md — iamnaman Portfolio

## Critical Rules

**NEVER modify original source files directly.** Always create experiments in `/src/app/experiments/` first. Only apply changes to the main site when the user explicitly says "apply it", "merge it", or "update the real site".

**Files you must NOT touch without explicit permission:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/styles/globals.css`
- `tailwind.config.js`
- `next.config.mjs`
- Any file inside `src/components/` or `src/lib/`

**Dev server is already running on localhost:3000.** Do not start another one.

## Project Identity — Do Not Remove

These elements are core to the portfolio identity. Never replace or remove them:
- **3D Avatar** with theme variants (light/dark/green) and circular border animations
- **ScrollImageMerge dividers** — avatar illustrations sliding between sections
- **TerminalContainer** — "COOKING INNOVATION" terminal with typing animations
- **3-theme system** (light/dark/green) with CSS custom properties
- **Typing animation sequence** — Hello typing → backspace → DecryptedText reveal
- **Photography section** with real photos from `/public/photography/`
- **44 testimonials** from JPMorgan colleagues
- **Watermark lines** — "THINK PLAN EXECUTE" scrolling background

## Architecture

- Next.js 15 App Router, React 18, Tailwind CSS, Framer Motion
- Centralized content in `/src/lib/content.ts`
- Responsive dispatcher pattern: `Hero.tsx` → `HeroDesktop.tsx` / `HeroMobile.tsx`
- Theme stored in localStorage, applied via `data-theme` attribute on `<html>`
- Components watch theme via MutationObserver

## Experiments

Use `/src/app/experiments/<name>/page.tsx` for all design experiments. These are self-contained single-file pages that don't import from the main project components.
