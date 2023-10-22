import * as z from 'zod'

export const UserValidation = z.object({
  image: z.string().url().nonempty(),
  name: z.string().min(3, { message: 'Minimum 3 characters.' }).max(30, { message: 'Maximum 30 caracters.' }),
  username: z.string().min(3, { message: 'Minimum 3 characters.' }).max(30, { message: 'Maximum 30 caracters.' }),
  bio: z.string().min(3, { message: 'Minimum 3 characters.' }).max(1000, { message: 'Maximum 1000 caracters.' })
})

export const updateUserSchema = z.object({
  userId: z.string(),
  username: z.string(),
  name: z.string(),
  image: z.string().optional(),
  bio: z.string().optional(),
  path: z.string().optional()
})
