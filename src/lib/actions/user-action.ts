'use server'

import { DocumentType } from '@typegoose/typegoose'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'

import { connectToDB } from '../database/mongoose'
import { ThoughtModel, UserModel, UserRelationshipModel } from '../models'
import { Thought } from '../models/thought-model'
import { User } from '../models/user-model'
import { updateUserSchema } from '../validations/user-validation'

export async function updateUser(body: z.infer<typeof updateUserSchema>): Promise<ReturnActionResult> {
  connectToDB()

  const { userId, name, bio, image, username, path } = body
  try {
    const usernameExists = await UserModel.findOne({ username }).exec()
    if (!!usernameExists) {
      return { isError: true, error: 'Username already exists' }
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        username,
        name,
        bio,
        image,
        isOnboard: true
      },
      { upsert: true }
    )
    if (user) {
      if (path === '/profile/update') {
        revalidatePath(path)
      }
    }

    return { isSuccess: true }
  } catch (error: any) {
    return { isError: true, error: 'Something went wrong' }
  }
}

export async function getSingleUser(id: string): Promise<ReturnActionResult<User & { _id: string }>> {
  console.log('recived id', id)

  try {
    connectToDB()
    const user = await UserModel.findById(id)
    if (!user) {
      return { isError: true, error: 'User not found' }
    }
    console.log(user)
    return { isSuccess: true, data: { ...user.toObject(), _id: user._id.toString() } as User & { _id: string } }
  } catch (error: any) {
    console.log(error)
    return { isError: true, error: 'Something went wrong' }
  }
}

export async function getUserByUsername(username: string): Promise<ReturnActionResult<User & { _id: string }>> {
  console.log('recived id', username)

  try {
    connectToDB()
    const user = await UserModel.findOne({ username }).exec()
    if (!user) {
      return { isError: true, error: 'User not found' }
    }
    console.log(user)
    return { isSuccess: true, data: { ...user.toObject(), _id: user._id.toString() } as User & { _id: string } }
  } catch (error: any) {
    console.log(error)
    return { isError: true, error: 'Something went wrong' }
  }
}

export async function followUser(
  followerId: string,
  followingId: string
): Promise<ReturnActionResult<User & { _id: string }>> {
  connectToDB()
  try {
    const relationship = new UserRelationshipModel({
      follower: followerId,
      following: followingId
    })
    await relationship.save()
    await UserModel.findByIdAndUpdate(followerId, { $push: { following: relationship } }).exec()
    const userFollowed = await UserModel.findByIdAndUpdate(followingId, { $push: { followers: relationship } }).exec()
    if (!userFollowed) {
      return { isError: true, error: 'Something went wrong' }
    }
    return {
      isSuccess: true,
      data: { ...userFollowed.toObject(), _id: userFollowed._id.toString() } as User & { _id: string }
    }
  } catch (error: any) {
    return { isError: true }
  }
}

export async function unfollowUser(followerId: string, followingId: string) {
  connectToDB()
  try {
    await UserRelationshipModel.findOneAndDelete({ follower: followerId, following: followingId })
    await UserModel.findByIdAndUpdate(followerId, { $pull: { following: { following: followingId } } })
    await UserModel.findByIdAndUpdate(followingId, { $pull: { followers: { follower: followerId } } })
  } catch (error: any) {
    return { isError: true, error: 'Something went wrong' }
  }
}

export async function isUserFollowing(followerId: string, followingId: string): Promise<ReturnActionResult> {
  connectToDB()
  try {
    const existingRelationship = await UserRelationshipModel.findOne({ follower: followerId, following: followingId })
    return { isSuccess: !!existingRelationship }
  } catch (error: any) {
    console.log(error)
    return { isError: true }
  }
}

export async function getThoughtsFromFollowedUsers(userId: string): Promise<ReturnActionResult<Thought[]>> {
  connectToDB()

  try {
    const currentUser = await UserModel.findById(userId)
    const followingUserIds = currentUser?.following.map((relationship: any) => relationship.following)
    const thoughtsFromFollowedUsers = await ThoughtModel.find({ user: { $in: followingUserIds } })
    return { isSuccess: true, data: thoughtsFromFollowedUsers }
  } catch (error) {
    return { isError: true }
  }
}
