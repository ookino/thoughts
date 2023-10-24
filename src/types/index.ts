export type ActionResponse<T = any> = {
  error?: string | [string]
  ok: boolean
  message?: string
  data?: T
}
