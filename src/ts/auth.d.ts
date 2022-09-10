import { Role } from '@prisma/client'
import { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      role?: Role
    } & DefaultSession['user']
  }
  interface User {
    role?: Role
  }
}
