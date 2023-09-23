'use server'

import { getProviders } from 'next-auth/react'

export async function OAuthProviders() {
  return await getProviders()
}
