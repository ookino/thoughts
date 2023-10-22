'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getSingleUser } from '@/lib/actions/user-action'
import { getInitials } from '@/lib/utils'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { LogoutIcon } from '../icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function OptionsMenu() {
  // const { data: session } = useSession()

  // const [user, setUser] = useState<any>()
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   const getUser = async () => {
  //     const { data } = await getSingleUser(session?.user.id as string)
  //     setUser(data)
  //     setLoading(false)
  //   }
  //   getUser()
  // }, [session])

  // if (!loading) {
  //   return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger>
  //         {/* <div className=' rounded-full p-1'>
  //           <Avatar className='w-9 h-9 max-md:w-6 max-md:h-6 '>
  //             <AvatarImage src={user.image as string} />
  //             <AvatarFallback>{getInitials(user.name as string)}</AvatarFallback>
  //           </Avatar>
  //         </div> */}
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent className='w-40 mx-4 max-md:my-10 my-4'>
  //         <div className='flex gap-4 items-center px-2 py-2'>
  //           <div className='flex flex-col'>
  //             <h1 className='text-sm font-bold'>{user.name as string}</h1>
  //             <div>
  //               <p className='text-xs font-bold text-zinc-500 '>
  //                 <span className=' font-mono'>@</span>
  //                 {user.username}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //         <DropdownMenuSeparator />

  //         <Link href={`/profile/${user.username}`}>
  //           <DropdownMenuItem>Profile</DropdownMenuItem>
  //         </Link>
  //         <DropdownMenuItem>Settings</DropdownMenuItem>

  //         {session && (
  //           <>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem onClick={() => signOut()}>
  //
  //             </DropdownMenuItem>
  //           </>
  //         )}
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   )
  // }

  return <h1>1</h1>
}
