'use client'
import { usePathname, useRouter } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import OptionsMenu from './options-menu'

export default function BottomNav() {
  const path = usePathname()
  return (
    <div className='fixed p-4 bottom-0 z-50 w-full '>
      <section className='bottombar bg-zinc-50 dark:bg-zinc-900 '>
        <div className='bottombar_container'>
          {sidebarLinks.map((link) => {
            const Icon = link.logo
            const isActive = (path.includes(link.route) && link.route.length > 1) || path === link.route
            return (
              <Link key={link.route} href={link.route} className='leftsidebar_link'>
                <Icon isActive={isActive} />
              </Link>
            )
          })}
          <OptionsMenu />
        </div>
      </section>
    </div>
  )
}
