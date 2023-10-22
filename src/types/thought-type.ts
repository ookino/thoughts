import { ObjectId } from 'mongoose'

export type Author = {
  _id: string
  name: string
  image: string
  username: string
}

export type Thought = {
  _id?: string
  text: string
  author: Author
  isPublic: boolean
  responseTo: string
  responses: Thought[]
  createdAt?: string
  updatedAt?: string
  __v: number
}
