'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { PenLine } from 'lucide-react'
import { CommentValidation } from '@/lib/validations/thought-validation'
import { addResponseToThought } from '@/lib/actions/thought-action'
import { usePathname } from 'next/navigation'
interface CommentFormProps {
  thoughtId: string
  currentUserImage: string | undefined
  currentUserId: string
}

export default function RespondForm({ thoughtId, currentUserId, currentUserImage }: CommentFormProps) {
  const pathname = usePathname()
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thought: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addResponseToThought(thoughtId, values.thought, currentUserId, pathname)
    form.reset()
  }
  return (
    <div>
      <Form {...form}>
        <form
          className={cn('flex items-center justify-between  gap-6 px-8 py-4')}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='thought'
            render={({ field }) => (
              <FormItem className='flex w-full items-center gap-1'>
                <FormLabel>
                  <Avatar className='w-9 h-9'>
                    <AvatarImage src={currentUserImage} />
                    <AvatarFallback>u</AvatarFallback>
                  </Avatar>
                </FormLabel>
                <FormControl className='flex'>
                  <input
                    placeholder="What's your reply"
                    {...field}
                    className='w-full outline-none text-sm px-4 tracking-tight bg-zinc-50 border-none focus-visible:ring-0 focus-visible:ring-transparent focus:ring-transparent'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex justify-between items-start'>
            <Button type='submit' className='gap-2 font-bold' size={'sm'}>
              <PenLine className='w-4 h-4' />
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
