import { prop, modelOptions, index, Ref } from '@typegoose/typegoose'

import { User } from './user-model'

@modelOptions({ schemaOptions: { collection: 'thoughts', timestamps: true } })
@index({ text: 1, user: 1 })
export class Thought {
  @prop({ type: String, required: true })
  text: string

  @prop({ ref: () => User, required: true })
  author: Ref<User>

  @prop({ type: Boolean, default: true })
  isPublic: boolean

  @prop({ ref: () => Thought })
  quoteBy?: Ref<Thought>

  @prop({ ref: () => Thought })
  responseTo?: Ref<Thought>

  @prop({ ref: () => Thought })
  responses: Array<Ref<Thought>>
}
