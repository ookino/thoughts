import { getUserThoughts } from '@/lib/actions/user-action'
import ThoughtCard from '../cards/thought-card'

interface ThoughtsTabProps {
  currentUserId: string
  profileId: string
  accountType: string
}

export default async function ThoughtsTab({ currentUserId, profileId, accountType }: ThoughtsTabProps) {
  let { ok, data } = await getUserThoughts(profileId)
  console.log('data', data)
  return (
    <section className='flex flex-col gap-4'>
      {data?.thoughts.map((item: any) => (
        <ThoughtCard
          key={item._id.toString()}
          id={item._id.toString()}
          currentUserId={currentUserId}
          parentId={item.parentId || ''}
          content={item.text}
          user={
            accountType === 'User'
              ? { name: data?.name, image: data?.image, id: data?._id }
              : { name: item.user.name, image: item.user.image, id: item.user.id }
          }
          createdAt={item.createdAt}
          comments={item.children}
        />
      ))}
    </section>
  )
}
