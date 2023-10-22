'use client'
import AlertIcon from '@/components/icons/alert-icon'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='flex h-full w-full z-50 justify-center items-center flex-col'>
      <div className='flex-col flex gap-8 items-center'>
        <AlertIcon className='w-16 h-16 stroke-zinc-700 ' />

        <div className=' text-center flex flex-col gap-2'>
          <h2 className='font-bold text-6xl'>Oops!</h2>
          <p className='text-xl'>Something went wrong</p>
        </div>
        <div className='flex gap-3'>
          <Button className='gap-4'> &nbsp;Back home</Button>
          <Button variant={'outline'} className='gap-4' onClick={() => reset()}>
            <RefreshCcw className='w-4 h-4' />
            &nbsp;Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
