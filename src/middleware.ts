import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  // Redirect from login page if already logged in
  const verify = req.cookies.get('next-auth.session-token')

  if (verify && req.url.includes('/signin')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}
