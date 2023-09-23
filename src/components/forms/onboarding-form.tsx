'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useUploadThing } from '@/lib/uploader'
import { cn } from '@/lib/utils'
import { User } from '@/lib/models/user-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { ChangeEvent, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { UserValidation } from '@/lib/validations/user-validation'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { isBase64Image } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { updateUser } from '@/lib/actions/user-action'

interface OnboardingFormProps {
  user: (User & { _id: string }) | undefined
}

export function OnboardingForm({ user }: OnboardingFormProps) {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { startUpload } = useUploadThing('imageUploader')
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_image: user?.image ? user.image : '',
      name: user?.name ? user.name : '',
      username: user?.username ? user.username : '',
      bio: user?.bio ? user.bio : ''
    }
  })

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_image
    const hasImageChanged = isBase64Image(blob)
    if (hasImageChanged) {
      const imgRes = await startUpload(files)
      if (imgRes && imgRes[0].fileUrl) {
        values.profile_image = imgRes[0].fileUrl
      }
    }
    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user?._id as string,
      bio: values.bio,
      image: values.profile_image
    })
    if (pathname === '/profile/update') {
      router.back()
    } else {
      router.push('/')
    }
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes('image')) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form className={cn('grid gap-6')} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='profile_image'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <div className='flex flex-col gap-2'></div>
              <FormControl className='flex gap-2'>
                <div className='flex justify-between items-center w-full px-2'>
                  <Avatar className='w-12 h-12'>
                    {field.value ? <AvatarImage src={field.value} /> : <AvatarImage src={user?.image} />}
                    <AvatarFallback>TH</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button onClick={() => fileInputRef.current?.click()} variant={'outline'} size={'sm'}>
                      Edit
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'></div>
        </div>

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel>Username</FormLabel>
              <FormControl className='flex '>
                <Input type='text' placeholder='yaseerokino' autoCapitalize='none' autoCorrect='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel>Name</FormLabel>
              <FormControl className='flex '>
                <Input type='text' autoCapitalize='none' autoCorrect='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-1'>
              <FormLabel>Bio</FormLabel>
              <FormControl className='flex'>
                <Textarea placeholder='Short description of yourself' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Continue</Button>
      </form>
    </Form>
  )
}
