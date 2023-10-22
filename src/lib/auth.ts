import { MongoDBAdapter } from '@auth/mongodb-adapter'
import type { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { sendVerificationRequest } from './../emails/send-verification-request'
import clientPromise from './database/mongodb'

if (!clientPromise) {
  throw new Error('NextAuth x MongoDB connection promise is undefined')
}

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: '',
      sendVerificationRequest
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    }
  }
}
