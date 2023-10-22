import { getUserThoughts } from '@/lib/actions/thought-action'

import ThoughtCard from '../cards/thought-card'

interface ThoughtsTabProps {
  authUserId: string
  userId: string
}

export default async function ThoughtsTab({ authUserId, userId }: ThoughtsTabProps) {
  console.log(authUserId, userId)
  let { isSuccess, data } = await getUserThoughts(authUserId)
  console.log('data user', data)
  return (
    <section className='flex flex-col gap-4'>
      {data?.thoughts.map((item: any) => (
        <ThoughtCard
          key={item._id.toString()}
          id={item._id.toString()}
          currentUserId={authUserId}
          parentId={item.parentId || ''}
          content={item.text}
          user={{ name: data?.name, image: data?.image, id: data?._id }}
          createdAt={item.createdAt}
          comments={item.children}
        />
      ))}
    </section>
  )
}
