import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { MenuIcon, LogoutIcon } from '../icons'

export default function OptionsMenu() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' sideOffset={80} className='w-40'>
        <DropdownMenuLabel>
          <span className='text-bold text-zinc-600 uppercase text-xs'>options</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>

        {session && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <div className='flex gap-1 text-rose-600 items-center'>
                <LogoutIcon className='icon-destructive' onClick={() => signOut()} />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
