import ProfileHeader from '@/components/common/profile-header'
import ThoughtsTab from '@/components/common/thoughts-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUserByUsername } from '@/lib/actions/user-action'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Profile({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions)
  const { data, isError, isSuccess } = await getUserByUsername(params.username)
  console.log(data)
  if (isError) {
    throw new Error()
  }

  if (isSuccess && data)
    return (
      <section className='flex flex-col gap-4 w-full'>
        <ProfileHeader
          userId={data?._id}
          authUserId={session?.user.id as string}
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
            <ThoughtsTab authUserId={session?.user.id as string} userId={data._id} />
          </TabsContent>
          <TabsContent value='quotes'>Change your password here.</TabsContent>
        </Tabs>
      </section>
    )
}
