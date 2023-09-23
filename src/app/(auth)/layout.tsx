import '../globals.css'
import { getServerSession } from 'next-auth'
import { sataoshi } from '../font-config'
import { redirect } from 'next/navigation'
import SessionProvider from '@/components/session-provider'

export const metadata = {
  title: 'thoughts',
  description: 'An X/thread clone with communites'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  // if (session) {
  //   redirect('/')
  // }

  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={`${sataoshi.className}`}>{children}</body>
      </SessionProvider>
    </html>
  )
}
