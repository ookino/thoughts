'use client'

import { followUser, getSingleUser } from '@/lib/actions/user-action'
import { X, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

interface FollowButtonProps {
  isFollowing: boolean
  authUserId: string
  userToFollowId: string
  thoughts: any
  followStatus: {
    following: number
    followers: number
  }
}

export default function FollowToolbar({
  isFollowing,
  authUserId,
  userToFollowId,
  thoughts,
  followStatus
}: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing)
  const [followData, setFollowData] = useState(followStatus)
  const { toast } = useToast()

  const handleClick = async () => {
    const { isSuccess, isError, error, data } = await followUser(authUserId, userToFollowId)

    if (isSuccess && data) {
      setFollowing(!isFollowing)
      toast({
        title: 'Success',
        description: `You are now following ${data.username} `
      })
      const { data: user, error } = await getSingleUser(authUserId)
      if (user) {
        setFollowData({ following: user?.following.length, followers: user?.followers.length })
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error
        })
      }
    }
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error
      })
      return
    }
  }

  return (
    <>
      <div className='flex w-full max-md:flex-col justify-between items-end max-md:gap-4'>
        <div className=' text-zinc-500 flex gap-4 text-sm font-bold max-md:w-full max-md:justify-between'>
          <p>
            <span className='text-zinc-950 dark:text-zinc-50'>{thoughts}</span>&nbsp;Thoughts
          </p>
          <p>
            <span className='text-zinc-950 dark:text-zinc-50'>{followData.following}</span>&nbsp; Following
          </p>
          <p>
            <span className='text-zinc-950 dark:text-zinc-50'>{followData.followers}</span> &nbsp;Followers
          </p>
        </div>

        <>
          {authUserId === userToFollowId ? (
            <Button size={'sm'} variant={'default'} className='gap-2 max-md:w-full'>
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              size={'sm'}
              variant={following ? 'outline' : 'default'}
              className='gap-2 max-md:w-full'
            >
              {following ? <X className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
              {following ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </>
      </div>
    </>
  )
}
