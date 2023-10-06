'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { User } from '@/lib/models/user-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Globe2, Lock, PenLine } from 'lucide-react'
import { ChangeEvent, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ThougthValidation } from '@/lib/validations/thought-validation'
import * as z from 'zod'
import { usePathname, useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { createThought } from '@/lib/actions/thought-action'

export function NewThoughtForm({ userId }: { userId: string }) {
  const [isPublic, setIsPublic] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof ThougthValidation>>({
    resolver: zodResolver(ThougthValidation),
    defaultValues: {
      thought: '',
      userId
    }
  })

  const onSubmit = async (values: z.infer<typeof ThougthValidation>) => {
    await createThought({ text: values.thought, userId, path: pathname, isPublic: isPublic })

    router.push('/')
  }
  return (
    <Form {...form}>
      <form className={cn('grid gap-6')} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thought'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel></FormLabel>
              <FormControl className='flex '>
                <Textarea placeholder='What are you thinking' {...field} rows={15} className='bg-zinc-50 p-6' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-between items-start'>
          <Button
            type='button'
            variant={'secondary'}
            size={'sm'}
            className='gap-4 font-bold'
            onClick={() => setIsPublic(!isPublic)}
          >
            {isPublic ? (
              <>
                <Globe2 className='w-4 h-4' />
                Public
              </>
            ) : (
              <>
                <Lock className='w-4 h-4' />
                Private
              </>
            )}
          </Button>
          <Button type='submit' className='gap-2 font-bold' size={'sm'}>
            <PenLine className='w-4 h-4' />
            Post
          </Button>
        </div>
      </form>
    </Form>
  )
}
