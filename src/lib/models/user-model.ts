import { prop, modelOptions, Ref } from '@typegoose/typegoose'

import { Thought } from './thought-model'
import { UserRelationship } from './user-relationship-model'

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  @prop({ type: () => String, required: true, unique: true, lowercase: true })
  email: string

  @prop({ type: () => String, required: true, unique: true, lowercase: true })
  username: string

  @prop({ type: () => String, required: true })
  name: string

  @prop({ type: () => Boolean, required: true })
  emailVerified: Date

  @prop({ type: () => String })
  image: string

  @prop({ type: () => String, maxlength: 150 })
  bio: string

  @prop({ type: () => Boolean, default: false })
  isOnboard: boolean

  @prop({ type: () => [Thought] })
  thoughts: Ref<Thought>[]

  @prop({ type: () => [UserRelationship] })
  followers: Ref<UserRelationship>[]

  @prop({ type: () => [UserRelationship] })
  following: Ref<UserRelationship>[]
}
