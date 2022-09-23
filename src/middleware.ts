import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'next-auth/jwt'
import { getSession } from 'next-auth/react'

export default async function middleware(req: NextRequest) {}
