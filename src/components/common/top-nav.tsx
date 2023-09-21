import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../ui/button'
import { LogOut, Quote } from 'lucide-react'

export default function TopNav() {
  return (
    <header>
      <nav className='topnav'>
        <div className='flex items-center gap-1'>
          <div className='block md:hidden'>
            <SignedIn>
              <SignOutButton>
                <Button>
                  <LogOut className='icon' />
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  )
}
