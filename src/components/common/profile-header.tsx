import { getSingleUser, isUserFollowing } from '@/lib/actions/user-action'

import FollowButton from './follow-button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface ProfileHeaderProps {
  userId: string
  authUserId: string
  name: string
  image: string
  bio: string
  username: string
  thoughts: number
}

export default async function ProfileHeader({
  name,
  username,
  image,
  bio,
  thoughts,
  userId,
  authUserId
}: ProfileHeaderProps) {
  const { isSuccess } = await isUserFollowing(authUserId, userId)
  const { data } = await getSingleUser(userId)

  if (!data) {
    throw new Error()
  }
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
        <FollowButton
          authUserId={authUserId}
          userToFollowId={userId}
          isFollowing={isSuccess as boolean}
          thoughts={thoughts}
          followStatus={{ following: data.following.length, followers: data.followers.length }}
        />
      </div>
    </div>
  )
}
