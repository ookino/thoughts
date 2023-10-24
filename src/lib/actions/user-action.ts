'use server'

import { ActionResponse } from '@/types'
import { PrismaClient } from '@prisma/client'
import { User } from '@prisma/client'
import * as z from 'zod'

import { updateUserSchema } from '../validations/user-validation'

const prisma = new PrismaClient()

export async function updateUser(body: z.infer<typeof updateUserSchema>): Promise<ActionResponse<User>> {
  const { userId, name, bio, image, username } = body
  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if (!!checkUser) {
      return { ok: false, error: 'Username already exists' }
    }
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        username,
        name,
        bio,
        image,
        isOnboard: true
      }
    })
    return { ok: true, data: user }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getUserbyId(id: string): Promise<ActionResponse<User>> {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return { ok: false, error: 'User not found' }
    }
    return { ok: true, data: user }
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export async function getUserbyUsername(username: string): Promise<ActionResponse<User>> {
  try {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) {
      return { ok: false, error: 'User not found' }
    }
    return { ok: true, data: user }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function followUser(followerId: string, followingId: string): Promise<ActionResponse> {
  try {
    await prisma.user.update({
      where: { id: followerId },
      data: {
        following: {
          connect: { id: followingId }
        }
      }
    })

    return { ok: true }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function unfollowUser(followerId: string, followingId: string) {
  try {
    await prisma.user.update({
      where: { id: followerId },
      data: {
        following: {
          disconnect: { id: followingId }
        }
      }
    })
    return { ok: true }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function isUserFollowing(followerId: string, followingId: string): Promise<ActionResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: followerId },
      select: {
        following: {
          where: { id: followingId }
        }
      }
    })
    if (!user) {
      throw new Error()
    }
    return { ok: user.following.length > 0 }
  } catch (error: any) {
    throw new Error(error)
  }
}
