import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ResponseProps<T> {
  ok: boolean
  data?: T | any
  error?: string
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
  return base64Regex.test(imageData)
}

// export function stringToObjectId(id: string): mongoose.Types.ObjectId | null {
//   if (mongoose.Types.ObjectId.isValid(id)) {
//     return new mongoose.Types.ObjectId(id)
//   } else {
//     return null
//   }
// }

export function getInitials(name: string) {
  const words = name.split(' ')
  let initials = ''
  for (let i = 0; i < words.length; i++) {
    initials += words[i][0].toUpperCase()
  }

  return initials
}
