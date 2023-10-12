'use server'

import { getProviders } from 'next-auth/react'
import { authOptions } from '../auth'

export async function OAuthProviders() {
  return await getProviders()
}
