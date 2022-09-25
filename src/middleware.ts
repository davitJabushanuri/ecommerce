import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  console.log(req.url)
}
