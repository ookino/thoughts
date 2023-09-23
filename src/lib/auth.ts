import type { NextAuthOptions } from 'next-auth'
import { EmailProvider } from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'

import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from './database/mongodb'

if (!clientPromise) {
  throw new Error('NextAuth x MongoDB connection promise is undefined')
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    }
  }
}
