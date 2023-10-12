import { getServerSession } from 'next-auth'
import { getSingleUser } from '@/lib/actions/user-action'
import { authOptions } from '@/lib/auth'
import { getThought } from '@/lib/actions/thought-action'
import PageThoughtCard from '@/components/cards/page-thought-card'
import RespondForm from '@/components/forms/respond-form'
import ThoughtCard from '@/components/cards/thought-card'
import { AnyError } from 'mongodb'

export default async function Thought({ params }: { params: { id: string } }) {
  if (!params.id) return null

  const session = await getServerSession(authOptions)
  const { data } = await getSingleUser(session!.user.id)

  const { ok, data: thought } = await getThought(params.id)

  console.log('thought->>>', thought)

  if (thought) {
    return (
      <section className='flex flex-col gap-4'>
        <PageThoughtCard
          key={thought?._id.toString()}
          id={thought?._id}
          currentUserId={session?.user.id as string}
          parentId={thought?.parentId}
          content={thought?.text}
          user={thought?.user}
          createdAt={thought?.createdAt}
          comments={thought?.children}
        />

        <div className='mt-3 border-y bg-zinc-50 dark:bg-zinc-900'>
          <RespondForm
            thoughtId={thought._id.toString()}
            currentUserImage={data?.image}
            currentUserId={session!.user.id}
          />
        </div>

        <div className='mt-3 flex flex-col gap-3'>
          {thought.children.map((item: any) => (
            <ThoughtCard
              key={item._id.toString()}
              id={item._id}
              currentUserId={session?.user.id as string}
              parentId={item.parentId}
              content={item.text}
              user={item?.user}
              createdAt={item?.createdAt}
              comments={item?.children}
              isComment
            />
          ))}
        </div>
      </section>
    )
  }
}
