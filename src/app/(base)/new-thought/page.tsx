import { NewThoughtForm } from '@/components/forms/new-thought-form'
import { getSingleUser } from '@/lib/actions/user-action'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function NewThought() {
  const session = await getServerSession(authOptions)
  const { data } = await getSingleUser(session!.user.id)

  if (!data?.isOnboard) redirect('/onboarding')

  return (
    <div className='flex flex-col gap-8 w-full'>
      <NewThoughtForm userId={data._id} />
    </div>
  )
}
