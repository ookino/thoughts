import { OnboardingForm } from '@/components/forms/onboarding-form'
import { getSingleUser } from '@/lib/actions/user-action'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Logo } from '@/components/icons/logo'
import { redirect } from 'next/navigation'

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions)
  const { ok, data } = await getSingleUser(session!.user.id)

  if (!ok) redirect('/sign-in')
  if (data?.onboarded) redirect('/')

  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] gap-8'>
        <div className='flex flex-col space-y-2 text-center'>
          <div className='flex justify-center w-full'>
            <Logo />
          </div>
          <h1 className='text-2xl font-semibold tracking-tight'>Onboarding</h1>
          <p className='text-sm text-muted-foreground'>Complete your profile</p>
        </div>
        <OnboardingForm user={data} />
      </div>
    </main>
  )
}
