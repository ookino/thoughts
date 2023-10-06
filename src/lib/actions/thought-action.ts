'use server'

import { revalidatePath } from 'next/cache'
import { connectToDB } from '../database/mongoose'
import ThoughtModel, { PopulatedThought, Thought } from '../models/thought-model'
import UserModel, { User } from '../models/user-model'
import { sendServerActionResponse, SendServerActionResponseProps } from '../utils'
import mongoose, { Document } from 'mongoose'

interface CreateThoughtParams {
  text: string
  userId: string
  path: string
  isPublic: boolean
}

export async function createThought({ text, userId, path, isPublic }: CreateThoughtParams) {
  connectToDB()
  try {
    const thought = new ThoughtModel({
      text,
      user: userId,
      public: isPublic
    })

    const savedThought = await thought.save()

    await UserModel.findByIdAndUpdate(userId, {
      $push: { thoughts: savedThought._id }
    })
    revalidatePath(path)
    return sendServerActionResponse({ ok: true })
  } catch (error) {}
}

export async function getThoughts(pageNumber = 1, pageSize = 20) {
  connectToDB()
  try {
    const toSkip = (pageNumber - 1) * pageSize
    const query = ThoughtModel.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: 'desc' })
      .skip(toSkip)
      .limit(pageSize)
      .populate({ path: 'user', model: UserModel })
      .populate({ path: 'children', populate: { path: 'user', model: UserModel, select: '_id name parentId image' } })
    const totalThoughts = await ThoughtModel.countDocuments({ parentId: { $in: [null, undefined] } })
    const thoughts = await query.exec()
    const isNext = totalThoughts > toSkip + thoughts.length
    return sendServerActionResponse({ ok: true, data: { thoughts, isNext } })
  } catch (error) {
    return sendServerActionResponse({ ok: false, error: 'Could not get Thoughts' })
  }
}

export async function getThought(id: string): Promise<SendServerActionResponseProps<PopulatedThought>> {
  connectToDB()

  try {
    const thought: PopulatedThought = await ThoughtModel.findById(id)
      .populate({
        path: 'user',
        model: UserModel
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'user',
            model: UserModel
          },
          {
            path: 'children',
            model: ThoughtModel
          }
        ]
      })
      .exec()
    return sendServerActionResponse({ ok: true, data: thought })
  } catch (error) {
    console.log(error)
    return sendServerActionResponse({ ok: false, error: 'Could not get Thought' })
  }
}

export async function addResponseToThought(thoughtId: string, responseText: string, userId: string, path: string) {
  connectToDB()

  try {
    const parentThought = await ThoughtModel.findById(thoughtId)
    if (!parentThought) {
      return sendServerActionResponse({ ok: false, error: 'Thought not found' })
    }
    const responseThought = new ThoughtModel({
      text: responseText,
      user: userId,
      parentId: thoughtId
    })
    const savedThought = await responseThought.save()
    parentThought.children.push(savedThought._id)
    await parentThought.save()
    revalidatePath(path)
  } catch (error) {
    console.log(error)
    return sendServerActionResponse({ ok: false, error: 'Something went wrong' })
  }
}
