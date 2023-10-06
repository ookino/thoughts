import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../ui/button'
import { LogOut, Quote } from 'lucide-react'
import React from 'react'
import { ModeToggle } from './mode-toggle'

export default function TopNav() {
  return (
    <div className=' fixed w-full top-0 py-8 px-16 backdrop-blur-lg dark:bg-zinc-950/30 bg-white/30 z-30 border flex justify-end'>
      <ModeToggle />
    </div>
  )
}
