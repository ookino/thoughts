import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ActivityIcon } from '../icons'
import { Heart, MessageCircle, Reply } from 'lucide-react'
import dayjs from 'dayjs'
import { useStore } from '../store'
import relativeTime from 'dayjs/plugin/relativeTime'
import { usePathname, useRouter } from 'next/navigation'

dayjs.extend(relativeTime)

interface ThoughtCardProps {
  id: string
  currentUserId: string
  parentId: string | null
  content: string
  user: {
    name: string
    image: string
    id: string
  }
  createdAt: string
  comments: {
    author: {
      image: string
    }
  }[]
  isComment?: boolean
}
export default function ThoughtCard({
  id,
  currentUserId,
  parentId,
  content,
  user,
  createdAt,
  comments,
  isComment
}: ThoughtCardProps) {
  return (
    <Link href={`/thought/${id}`}>
      <article className='flex w-full flex-col rounded-lg bg-zinc-50 dark:bg-zinc-900 border max-md:p-4 p-6 text-zinc-950 dark:text-zinc-50'>
        <div className='flex items-start justify-between'>
          <div className='w-full flex flex-1 gap-4'>
            <div className='flex flex-col items-center justify-center'>
              <Link href={`/profile/${user.id}`}>
                <Avatar className='w-9 h-9 max-md:w-8 max-md:h-8'>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>u</AvatarFallback>
                </Avatar>
              </Link>
              <div className='relative max-md:w-[0.5px] w-[1px] mt-2 grow rounded-full bg-zinc-300   dark:bg-zinc-700' />
            </div>
            <div className='flex w-full flex-col'>
              <div className='flex justify-between gap-2'>
                <div className='flex-1'>
                  <div className='w-full flex items-center justify-between'>
                    <Link href={`/`}>
                      <h3 className='font-bold max-md:text-md tracking-tight'>{user.name}</h3>
                    </Link>
                    <p className='tracking-tight text-xs text-zinc-500'>{dayjs(new Date(createdAt)).fromNow(true)}</p>
                  </div>

                  <p className='text-zinc-700 dark:text-zinc-300 max-md:text-sm'>{content}</p>
                </div>
              </div>

              <div className='flex flex-col mt-6 gap-4'>
                <div className='flex gap-5'>
                  <Heart className='w-4 h-4' />
                  <Reply className='w-4 h-4' />
                  <Link href={`/thought/${id}`}>
                    <MessageCircle className='w-4 h-4' />
                  </Link>
                </div>

                {isComment && comments.length > 0 && (
                  <Link href={`/thought/${id}`}>
                    <p className='mt-1 text-xs'>
                      {comments.length} response{comments.length > 1 && 's'}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
