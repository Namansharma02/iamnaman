// middleware.js
import { NextResponse } from 'next/server'

// Redirect every non-asset route to the home page
export function middleware(req) {
  const url = req.nextUrl

  // Allow Next internals and static assets to pass
  const isAsset =
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/code') ||         // your code overlay files
    url.pathname === '/favicon.ico' ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|css|js|map)$/.test(url.pathname)

  if (isAsset || url.pathname === '/') {
    return NextResponse.next()
  }

  // Force to home with no query or hash
  const to = url.clone()
  to.pathname = '/'
  to.search = ''
  to.hash = ''
  return NextResponse.redirect(to)
}

// Apply to all paths except assets above
export const config = {
  matcher: [
    // negative lookahead to skip common asset folders if you prefer that style
    '/((?!_next|api|code|favicon.ico|images|fonts|public).*)',
  ],
}
