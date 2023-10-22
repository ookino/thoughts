import { OnboardingForm } from '@/components/forms/onboarding-form'
import { Logo } from '@/components/icons/logo'
import { getSingleUser } from '@/lib/actions/user-action'
import { authOptions } from '@/lib/auth'
import { setEngine } from 'crypto'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions)
  console.log('he ha', session)
  const { isError, data, error } = await getSingleUser(session!.user.id)
  console.log(data)

  // if (isError) {
  //   throw new Error()
  // }
  if (data?.isOnboard) redirect('/')
  if (data) {
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
}
