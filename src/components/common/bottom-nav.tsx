'use client'
import { usePathname, useRouter } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'

export default function BottomNav() {
  const path = usePathname()
  return (
    <div className='fixed p-4 bottom-0 z-50 w-full'>
      <section className='bottombar'>
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
        </div>
      </section>
    </div>
  )
}
