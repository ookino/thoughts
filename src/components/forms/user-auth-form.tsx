'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { GithubIcon, GoogleIcon } from '../icons'
import { LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { ClientSafeProvider } from 'next-auth/react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}

export function UserAuthForm({ providers }: UserAuthFormProps) {
  if (!providers) {
    return <div>Loading providers...</div>
  }
  return (
    <div className={cn('grid gap-6')}>
      <div className='flex flex-col gap-2'>
        {Object.values(providers)
          .filter((provider) => provider.name !== 'Email')
          .map((provider) => (
            <div key={provider?.name}>
              <Button
                className='w-full justify-start gap-8'
                variant={'outline'}
                onClick={() => signIn(provider?.id, { callbackUrl: '/onboarding' })}
              >
                {provider.name === 'GitHub' && <GithubIcon />}
                {provider.name === 'Google' && <GoogleIcon />}
                Continue with {provider?.name}
              </Button>
            </div>
          ))}
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>
      <form>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
            />
          </div>
          <Button>Sign In with Email</Button>
        </div>
      </form>
    </div>
  )
}
