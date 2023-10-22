'use client'

import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { LogoutIcon, UserIcon } from '../icons'
import { Logo } from '../icons/logo'

interface Props {
  userId: string
  username: string
  sessionId: string
}

export default function LeftSidebar({ userId, username, sessionId }: Props) {
  const path = usePathname()

  return (
    <section className='leftsidebar custom-scrollbar z-40'>
      <div className=''>
        <Logo />
      </div>
      <div className='flex w-full flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const Icon = link.logo
          const isActive = (path.includes(link.route) && link.route.length > 1) || path === link.route
          return (
            <Link key={link.route} href={link.route} className='leftsidebar_link'>
              <Icon isActive={isActive} />
            </Link>
          )
        })}
        <Link href={`/profile/${username}`} className='leftsidebar_link'>
          <UserIcon isActive={path === '/profile/[username]' && sessionId === userId} />
        </Link>
      </div>
      <div className='flex flex-col gap-4 items-center'>
        <div className='flex gap-1 text-rose-600 items-center'>
          <LogoutIcon className='icon-destructive' onClick={() => signOut()} />
        </div>
      </div>
    </section>
  )
}
