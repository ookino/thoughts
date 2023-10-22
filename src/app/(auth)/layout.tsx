import '../globals.css'
import SessionProvider from '@/components/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { getSingleUser } from '@/lib/actions/user-action'
import { ToastProvider } from '@radix-ui/react-toast'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { sataoshi } from '../font-config'
export const metadata = {
  title: 'thoughts',
  description: 'An X/thread clone with communites'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (session && session.user) {
    const { isSuccess, data } = await getSingleUser(session!.user.id)
    if (isSuccess && !data?.isOnboard) {
      redirect('/onboarding')
    }
  }

  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={`${sataoshi.className}`}>{children}</body>
        <Toaster />
      </SessionProvider>
    </html>
  )
}
