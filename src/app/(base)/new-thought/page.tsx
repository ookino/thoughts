import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getSingleUser } from '@/lib/actions/user-action'
import { redirect } from 'next/navigation'
import { NewThoughtForm } from '@/components/forms/new-thought-form'

export default async function NewThought() {
  const session = await getServerSession(authOptions)
  const { data } = await getSingleUser(session!.user.id)

  if (!data?.onboarded) redirect('/onboarding')

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-2xl font-bold tracking-tigh'>New Thought</h1>
      <NewThoughtForm userId={data._id} />
    </div>
  )
}
