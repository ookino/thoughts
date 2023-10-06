import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getSingleUser } from '@/lib/actions/user-action'
import ProfileHeader from '@/components/common/profile-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Quote } from 'lucide-react'
import ThoughtsTab from '@/components/common/thoughts-tab'

export default async function Profile({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const { data } = await getSingleUser(params.id)
  return (
    <section className='flex flex-col gap-4 w-full'>
      <ProfileHeader
        profileId={data?._id}
        authUserId={session?.user.id}
        name={data?.name}
        username={data?.username}
        image={data?.image}
        bio={data?.bio}
        thoughts={data?.thoughts.length}
      />

      <Tabs defaultValue='thoughts' className='w-full'>
        <TabsList className='w-full'>
          <TabsTrigger value='thoughts' className='w-full'>
            Thoughts
          </TabsTrigger>
          <TabsTrigger value='quotes' className='w-full'>
            Quotes
          </TabsTrigger>
          <TabsTrigger value='quotes' className='w-full'>
            Responses
          </TabsTrigger>
        </TabsList>
        <TabsContent className='py-2' value='thoughts'>
          <ThoughtsTab currentUserId={session?.user.id as string} profileId={data?._id as string} accountType='' />
        </TabsContent>
        <TabsContent value='quotes'>Change your password here.</TabsContent>
      </Tabs>
    </section>
  )
}
