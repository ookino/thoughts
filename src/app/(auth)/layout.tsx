import '../globals.css'
import { getServerSession } from 'next-auth'
import { sataoshi } from '../font-config'
import { redirect } from 'next/navigation'
import SessionProvider from '@/components/session-provider'
import { authOptions } from '@/lib/auth'
import { getSingleUser } from '@/lib/actions/user-action'
export const metadata = {
  title: 'thoughts',
  description: 'An X/thread clone with communites'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (session && session.user) {
    const { ok, data } = await getSingleUser(session!.user.id)
    if (ok && !data?.onboarded) {
      redirect('/onboarding')
    }
  }

  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={`${sataoshi.className}`}>{children}</body>
      </SessionProvider>
    </html>
  )
}
