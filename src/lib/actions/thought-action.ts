'use server'

import { ActionResponse } from '@/types'
import { PrismaClient, Thought } from '@prisma/client'
import * as z from 'zod'

import { addResponseToThoughtSchema, createThoughtSchema } from './../validations/thought-validation'

const prisma = new PrismaClient()

export async function createThought(body: z.infer<typeof createThoughtSchema>): Promise<ActionResponse> {
  const { text, author, isPublic } = body

  try {
    await prisma.user.update({
      where: { id: author },
      data: {
        thoughts: {
          create: [{ text, isPublic }]
        }
      }
    })
    return { ok: true }
  } catch (error) {
    throw new Error()
  }
}

export async function getThoughts(): Promise<ActionResponse<Thought[]>> {
  try {
    const thoughts = await prisma.thought.findMany({
      include: {
        author: true,
        responses: {
          include: {
            author: true
          }
        }
      }
    })
    return { ok: true, data: thoughts }
  } catch (error) {
    throw new Error()
  }
}

export async function getThought(id: string): Promise<ActionResponse<Thought>> {
  try {
    const thought = await prisma.thought.findUnique({
      where: {
        id
      }
    })
    return { ok: true, data: thought as Thought }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function addResponseToThought(body: z.infer<typeof addResponseToThoughtSchema>): Promise<ActionResponse> {
  const { thoughtId, text, author } = body
  try {
    await prisma.thought.update({
      where: {
        id: thoughtId
      },
      data: {
        responses: {
          create: [{ text, authorId: author, isPublic: true }]
        }
      }
    })
    return { ok: true }
  } catch (error) {
    throw new Error()
  }
}

export async function getUserThoughts(id: string): Promise<ActionResponse> {
  try {
    const thoughts = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        thoughts: {
          include: {
            responses: {
              include: {
                author: {
                  select: { username: true, name: true, image: true, id: true }
                }
              }
            }
          }
        }
      }
    })

    return { ok: true, data: thoughts }
  } catch (error: any) {
    throw new Error(error)
  }
}
