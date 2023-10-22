import { PopulatedThought, PopulatedUser } from '@/lib/models/thought-model'
import dayjs from 'dayjs'
import { Heart, MessageCircle, Reply } from 'lucide-react'
import mongoose, { ObjectId } from 'mongoose'
import Link from 'next/link'

import { ActivityIcon } from '../icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface PageThoughtCardProps {
  id: mongoose.Types.ObjectId
  currentUserId: string
  parentId: string | undefined | null
  content: string
  user: PopulatedUser
  createdAt: NativeDate
  comments: {}
  isComment?: boolean
}

export default function PageThoughtCard({
  id,
  currentUserId,
  parentId,
  content,
  user,
  createdAt,
  comments,
  isComment
}: PageThoughtCardProps) {
  return (
    <article className='flex w-full flex-col rounded-lg bg-zinc-50 dark:bg-zinc-900 border text-zinc-950 dark:text-zinc-50'>
      <div className='flex flex-col gap-4 items-start justify-between p-8'>
        <div className='w-full flex flex-1 gap-4'>
          <div className='flex flex-col items-center justify-center'>
            <Link href={``}>
              <Avatar className='w-12 h-12'>
                <AvatarImage src={user.image} />
                <AvatarFallback>u</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className='flex w-full flex-col gap-4'>
            <div>
              <Link href={``}>
                <h3 className='font-bold tracking-tight'>{user.name}</h3>
              </Link>

              <Link href={``}>
                <h3 className='text-sm text-zinc-500'>@{user.username}</h3>
              </Link>
            </div>
          </div>
        </div>
        <div className='px-2 flex flex-col gap-2'>
          <p className='text-sm'>{content}</p>
          <p className='font-bold text-xs text-zinc-500 tracking-tight'>
            {dayjs(new Date(createdAt)).format('h:mm A · MMM D, YYYY')}
          </p>
        </div>
      </div>

      <div className='flex flex-col  gap-4 px-8 py-4 border-t'>
        <div className='flex justify-between text-sm text-zinc-500'>
          <div className='flex items-center gap-2'>
            <Heart className='w-4 h-4' />
            <p>10k</p>
          </div>

          <Link href={``}>
            <div className='flex items-center gap-2'>
              <MessageCircle className='w-4 h-4' />
              <p>3k</p>
            </div>
          </Link>
          <Reply className='w-4 h-4' />
        </div>
      </div>
    </article>
  )
}
