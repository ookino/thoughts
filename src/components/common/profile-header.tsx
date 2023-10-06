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
    <div className='flex flex-col rounded-lg p-8 bg-zinc-50 border gap-4'>
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
      <div className='flex justify-between items-end'>
        <div className=' text-zinc-500 flex gap-4 text-sm font-bold'>
          <p>
            <span className='text-zinc-950'>{thoughts}</span> Thoughts
          </p>
          <p>
            <span className='text-zinc-950'>10k</span> Following
          </p>
          <p>
            <span className='text-zinc-950'>11k</span> Followers
          </p>
        </div>

        <Button size={'sm'} className='gap-2'>
          <UserPlus2 className='w-4 h-4' />
          Follow
        </Button>
      </div>
    </div>
  )
}
