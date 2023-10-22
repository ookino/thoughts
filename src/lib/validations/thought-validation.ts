import * as z from 'zod'

export const ThougthValidation = z.object({
  thought: z.string().nonempty().min(3, { message: ' minimmum 3 characters' }),
  public: z.boolean().default(true).optional(),
  userId: z.string()
})

export const CommentValidation = z.object({
  thought: z.string().nonempty().min(3, { message: ' minimmum 3 characters' })
})

export const createThoughtSchema = z.object({
  text: z.string(),
  author: z.string(),
  isPublic: z.boolean(),
  path: z.string()
})

export const addResponseToThoughtSchema = z.object({
  thoughtId: z.string(),
  text: z.string(),
  author: z.string(),
  path: z.string()
})
