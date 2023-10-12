import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../ui/button'
import { LogOut, Quote } from 'lucide-react'
import React from 'react'
import { ModeToggle } from './mode-toggle'

export default function Footer() {
  return (
    <div className=' fixed w-full bottom-0 py-4 px-44 backdrop-blur-lg dark:bg-zinc-950/30 bg-white/30 z-30 border-t max-md:hidden'>
      <div className='flex font-mono w-full items-center justify-center'>
        <p className='  text-xs  '>
          <Link className=' text-zinc-500 font-bold' href={'https://okino.works'}>
            OKINO
          </Link>
        </p>
      </div>
    </div>
  )
}
