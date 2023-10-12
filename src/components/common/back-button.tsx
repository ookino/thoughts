'use client'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back() // Go back to the previous page
  }

  return (
    <div className=' cursor-pointer' onClick={handleGoBack}>
      <MoveLeft className='w-6 h-6' />
    </div>
  )
}

export default BackButton
