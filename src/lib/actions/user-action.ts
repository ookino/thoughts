'use server'

import { SendServerActionResponseProps, sendServerActionResponse } from './../utils'
import UserModel from '../models/user-model'
import type { User } from '../models/user-model'
import { connectToDB } from '../database/mongoose'
import { revalidatePath } from 'next/cache'

interface UpdateUserParams {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}
export async function updateUser({
  username,
  name,
  bio,
  image,
  userId,
  path
}: UpdateUserParams): Promise<SendServerActionResponseProps<any>> {
  connectToDB()
  console.log(username, name, bio, image, userId, path)
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true
      },
      { upsert: true }
    )

    if (user) {
      if (path === '/profile/update') {
        revalidatePath(path)
      }
      return sendServerActionResponse({ ok: true })
    } else {
      throw new Error('Something went wrong, Try again later')
    }
  } catch (error: any) {
    console.log(error)
    return sendServerActionResponse({ ok: false, error: error?.message as string })
  }
}

export async function getSingleUser(id: string): Promise<SendServerActionResponseProps<User & { _id: string }>> {
  connectToDB()
  try {
    const user = await UserModel.findById(id)
    if (user) {
      return sendServerActionResponse({ ok: true, data: { ...user.toObject(), _id: user._id.toString() } })
    } else {
      throw new Error('User not found')
    }
  } catch (error: any) {
    return sendServerActionResponse({ ok: false, error: error?.message as string })
  }
}
