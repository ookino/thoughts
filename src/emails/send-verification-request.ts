import { SendVerificationRequestParams } from 'next-auth/providers/email'
import { resend } from '@/lib/resend'

export const sendVerificationRequest = async (params: SendVerificationRequestParams) => {
  try {
    await resend.emails.send({
      from: 'yaseerokino@icloud.com',
      to: params.identifier,
      subject: 'Magic Link',
      html: 'YOUR EMAIL CONTENT'
    })
  } catch (error) {
    console.log({ error })
  }
}
