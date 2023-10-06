import { getThoughts } from '@/lib/actions/thought-action'
import { UserButton } from '@clerk/nextjs'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import ThoughtCard from '@/components/cards/thought-card'
import { TopNav } from '@/components/common'
import { HomeIcon } from '@/components/icons'
export default async function Home() {
  const { ok, data } = await getThoughts(1, 30)
  console.log('-------->', data.thoughts)
  const session = await getServerSession(authOptions)
  return (
    <div className='relative flex flex-col gap-8'>
      <div className='flex py-9 items-center gap-4 sticky z-50 top-0'>
        <h1 className='text-2xl font-bold  tracking-tight  '>Home</h1>
      </div>

      <section className='flex flex-col gap-8'>
        {data.thoughts.length === 0 ? (
          <p>No threads found</p>
        ) : (
          <>
            {data.thoughts.map((item) => (
              <ThoughtCard
                key={item._id}
                id={item._id}
                currentUserId={session?.user.id as string}
                parentId={item.parentId}
                content={item.text}
                user={item.user}
                createdAt={item.createdAt}
                comments={item.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  )
}
