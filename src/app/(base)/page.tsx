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

  if (data.thoughts) {
    return (
      <div className='relative flex flex-col'>
        <section className='flex flex-col gap-8'>
          {data.thoughts.length === 0 ? (
            <p>No threads found</p>
          ) : (
            <>
              {data.thoughts.map((item: any) => (
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

  return <h1>No thoughts</h1>
}
