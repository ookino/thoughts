import * as z from 'zod'

export const ThougthValidation = z.object({
  thought: z.string().nonempty().min(3, { message: ' minimmum 3 characters' }),
  public: z.boolean().default(true).optional(),
  userId: z.string()
})

export const CommentValidation = z.object({
  thought: z.string().nonempty().min(3, { message: ' minimmum 3 characters' })
})
