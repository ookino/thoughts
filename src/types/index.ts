type ReturnActionResult<T = undefined> = {
  isError?: boolean
  error?: string | [string]
  isSuccess?: boolean
  message?: string
  data?: T
}
