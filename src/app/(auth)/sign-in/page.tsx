import { Logo } from '@/components/icons/logo'
import { OAuthProviders } from '@/lib/actions/auth-action'
import Link from 'next/link'
import { UserAuthForm } from '@/components/forms/user-auth-form'

export default async function LoginPage() {
  const providers = await OAuthProviders()
  console.log('providers-->>', providers)
  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <div className='flex justify-center w-full'>
            <Logo />
          </div>
          <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
          <p className='text-sm text-muted-foreground'>Enter your email to sign in to your account</p>
        </div>
        <UserAuthForm providers={providers} />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link href='/register' className='hover:text-brand underline underline-offset-4'>
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}
