import { Plus } from 'lucide-react'
import Link from 'next/link'

import AlertIcon from '../icons/alert-icon'
import { Button } from '../ui/button'
export default function NoThoughts() {
  return (
    <div className='flex flex-col px-8 py-12 w-full bg-zinc-50 dark:bg-zinc-900 border rounded-lg gap-2'>
      <div className='flex items-center gap-2 stroke-2'>
        <AlertIcon className='stroke-zinc-950 dark:stroke-zinc-50 w-4 h-4' />
        <p>No Thouhts found</p>
      </div>

      <Link href={'/new-thought'}>
        <Button size={'sm'} className='w-max gap-2'>
          <Plus className='w-4 h-4' />
          New Thought
        </Button>
      </Link>
    </div>
  )
}
