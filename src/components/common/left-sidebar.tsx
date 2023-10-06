'use client'

import { sidebarLinks } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '../icons/logo'
import { MenuIcon } from '../icons'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import OptionsMenu from './options-menu'

export default function LeftSidebar() {
  const { data: session } = useSession()
  const path = usePathname()

  return (
    <section className='leftsidebar custom-scrollbar z-50'>
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
      </div>
      <div className='flex flex-col gap-4 items-center'>
        <OptionsMenu />
      </div>
    </section>
  )
}
