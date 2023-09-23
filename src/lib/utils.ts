import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SendServerActionResponseProps<T> {
  ok: boolean
  data?: T
  error?: string
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
  return base64Regex.test(imageData)
}

export function sendServerActionResponse({
  ok,
  data,
  error
}: SendServerActionResponseProps<any>): SendServerActionResponseProps<any> {
  const response: any = { ok }
  if (data !== undefined) {
    response.data = data
  }
  if (error) {
    response.error = error
  }
  return response
}
