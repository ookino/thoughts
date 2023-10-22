'use client'

import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import { ArrowBigLeft, ArrowLeft, LogOut, MoveLeft, Quote } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import BackButton from './back-button'
import { ModeToggle } from './mode-toggle'
import { ActivityIcon } from '../icons'
import { useStore } from '../store'

export default function TopNav() {
  const path = usePathname()

  const link = useStore((state: any) => state.backTo)

  return (
    <div className=' fixed w-full top-0 py-5 max-md:px-4 px-16 backdrop-blur-lg dark:bg-zinc-950/30 bg-white/30 z-30 border-b flex justify-between'>
      <div className='max-md:px-0 px-5'></div>
      <div className='w-full max-w-2xl'>
        <h1 className='text-2xl'>
          {path.includes('/thought') && (
            <div key={'label'} className='flex gap-4 items-center'>
              <BackButton />
              <h1>Thought</h1>
            </div>
          )}
          {sidebarLinks.map((link) => {
            return <h1 key={link.label}>{path === link.route && link.label}</h1>
          })}
        </h1>
      </div>
      <div className='flex items-center gap-4 rlative'>
        <ActivityIcon isActive={false} />
        <ModeToggle />
      </div>
    </div>
  )
}
