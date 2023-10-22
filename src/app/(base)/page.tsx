import ThoughtCard from '@/components/cards/thought-card'
import NoThoughts from '@/components/common/no-thoughts'
import { getThoughts } from '@/lib/actions/thought-action'
import { authOptions } from '@/lib/auth'
import { Thought } from '@/types/thought-type'
import { ObjectId } from 'mongoose'
import { getServerSession } from 'next-auth'
export default async function Home() {
  const { isError, data } = (await getThoughts(1, 30)) as {
    isError: boolean
    data: { thoughts: Thought[]; isNext: boolean }
  }
  const session = await getServerSession(authOptions)

  if (isError) {
  }

  if (data) {
    return (
      <div className='relative flex flex-col'>
        <section className='flex flex-col gap-8'>
          {data.thoughts.length === 0 ? (
            <NoThoughts />
          ) : (
            <>
              {data.thoughts.map((item) => (
                <ThoughtCard
                  key={item._id}
                  id={item._id}
                  currentUserId={session?.user.id as string}
                  parentId={item?.responseTo}
                  content={item.text}
                  user={{
                    name: item.author.name,
                    image: item.author.image,
                    id: item.author._id.toString(),
                    username: item.author.username
                  }}
                  createdAt={item.createdAt}
                  comments={item.responses}
                />
              ))}
            </>
          )}
        </section>
      </div>
    )
  }
}
