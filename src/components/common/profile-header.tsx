import { UserPlus2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import mongoose from 'mongoose'

interface ProfileHeaderProps {
  profileId: string | undefined
  authUserId: string | undefined
  name: string | undefined
  image: string | undefined
  bio: string | undefined
  username: string | undefined
  thoughts: number | undefined
}

export default function ProfileHeader({ name, username, image, bio, thoughts }: ProfileHeaderProps) {
  return (
    <div className='flex flex-col rounded-lg max-md:p-4 p-8 bg-zinc-50 dark:bg-zinc-900 border gap-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-xl font-bold'>{name}</h1>
          <div>
            <p className='text-sm font-bold text-zinc-500 '>
              <span className=' font-mono'>@</span>
              {username}
            </p>
          </div>
        </div>

        <Avatar className='w-16 h-16'>
          <AvatarImage src={image} />
          <AvatarFallback>u</AvatarFallback>
        </Avatar>
      </div>
      <p className='text-sm'>{bio}</p>
      <div className='flex max-md:flex-col justify-between items-end max-md:gap-4'>
        <div className=' text-zinc-500 flex gap-4 text-sm font-bold max-md:w-full max-md:justify-between'>
          <p>
            <span className='text-zinc-950 dark:text-zinc-50'>{thoughts}</span>&nbsp;Thoughts
          </p>
          <p>
            <span className='text-zinc-950 dark:text-zinc-50'>10k</span>&nbsp; Following
          </p>
          <p>
            <span className='text-zinc-950 dark:text-zinc-50'>11k</span> &nbsp;Followers
          </p>
        </div>

        <Button size={'sm'} className='gap-2 max-md:w-full'>
          <UserPlus2 className='w-4 h-4' />
          Follow
        </Button>
      </div>
    </div>
  )
}
