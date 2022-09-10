import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],

  pages: {
    signIn: '/auth/login',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async session({ session, token, user }) {
      session.user.role = 'admin'
      return session
    },
  },

  // debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
})
