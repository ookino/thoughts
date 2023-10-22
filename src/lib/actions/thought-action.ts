'use server'

import { Thought } from '@/types/thought-type'
import { DocumentType } from '@typegoose/typegoose'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'

import { addResponseToThoughtSchema, createThoughtSchema } from './../validations/thought-validation'
import { connectToDB } from '../database/mongoose'
import { ThoughtModel, UserModel } from '../models'

export async function createThought(body: z.infer<typeof createThoughtSchema>): Promise<ReturnActionResult> {
  connectToDB()
  const { text, author, isPublic, path } = body
  try {
    const thought = new ThoughtModel({
      text,
      author,
      isPublic
    })

    const savedThought = await thought.save()

    await UserModel.findByIdAndUpdate(author, {
      $push: { thoughts: savedThought._id }
    })
    revalidatePath(path)
    return { isSuccess: true }
  } catch (error) {
    return { isError: true, message: 'Something went wrong' }
  }
}

export async function getThoughts(
  pageNumber = 1,
  pageSize = 20
): Promise<ReturnActionResult<{ thoughts: Array<{}>; isNext: boolean }>> {
  connectToDB()
  try {
    const toSkip = (pageNumber - 1) * pageSize
    const thoughts = await ThoughtModel.find({ responseTo: { $in: [null, undefined] } })
      .sort({ createdAt: 'desc' })
      .skip(toSkip)
      .limit(pageSize)
      .populate({ path: 'author', model: UserModel, select: '_id name username image' })
      .populate({
        path: 'responses',
        populate: { path: 'author', model: UserModel, select: '_id name username image' }
      })
      .exec()
    const totalThoughts = await ThoughtModel.countDocuments({ parentId: { $in: [null, undefined] } })

    console.log('th-->', thoughts)
    const isNext = totalThoughts > toSkip + thoughts.length
    const mappedThoughts = thoughts.map((item) => ({
      ...item.toObject(),
      _id: item._id.toString()
    }))
    console.log('th-->', thoughts)
    return {
      isSuccess: true,
      data: { thoughts: mappedThoughts, isNext }
    }
  } catch (error) {
    console.log(error)
    return { isError: true, message: 'something went wrong' }
  }
}

export async function getThought(id: string): Promise<ReturnActionResult<DocumentType<Thought>>> {
  connectToDB()
  try {
    const thought = await ThoughtModel.findById(id)
      .populate({
        path: 'author',
        model: UserModel
      })
      .populate({
        path: 'responses',
        populate: [
          {
            path: 'author',
            model: UserModel
          },
          {
            path: 'responses',
            model: ThoughtModel
          }
        ]
      })
      .exec()
    if (thought) {
      return { isSuccess: true, data: thought }
    } else {
      return { isSuccess: false, error: 'Thought not found' }
    }
  } catch (error) {
    return { isError: false }
  }
}

export async function addResponseToThought(
  body: z.infer<typeof addResponseToThoughtSchema>
): Promise<ReturnActionResult> {
  connectToDB()
  const { thoughtId, text, author, path } = body
  try {
    const thought = await ThoughtModel.findById(thoughtId)
    if (!thought) {
      return { isError: true, error: 'Thought not found' }
    }
    const response = new ThoughtModel({
      text,
      author,
      responseTo: thoughtId
    })
    const savedResponse = await response.save()
    thought.responses.push(savedResponse._id)
    await thought.save()
    revalidatePath(path)
    return { isSuccess: true }
  } catch (error) {
    return { isError: true, error: 'Something went wrong ' }
  }
}

export async function getUserThoughts(id: string): Promise<ReturnActionResult<Thought[]>> {
  connectToDB()
  try {
    const thoughts = await ThoughtModel.find({ author: id })
      .populate({
        path: 'responses',
        populate: { path: 'author', model: UserModel, select: '_id name username image' }
      })
      .exec()
    console.log('action thoughts', thoughts)
    if (thoughts) {
      return { isSuccess: true, data: thoughts }
    } else {
      return { isSuccess: false, error: 'User not found' }
    }
  } catch (error: any) {
    return { isSuccess: false, error: 'Something went wrong' }
  }
}

// .populate({
//   path: 'thoughts',
//   model: ThoughtModel,
//   populate: [
//     {
//       path: 'responses',
//       model: ThoughtModel,
//       populate: {
//         path: 'author',
//         model: UserModel
//       }
//     },
//     {
//       path: 'author',
//       model: UserModel
//     }
//   ]
// })
// .exec()
