import { prop, modelOptions } from '@typegoose/typegoose'
import * as typegoose from '@typegoose/typegoose'

import { User } from './user-model'

@modelOptions({ schemaOptions: { collection: 'userRelationships', timestamps: true } })
export class UserRelationship {
  @prop({ ref: () => User, required: true })
  follower: typegoose.Ref<User>
  @prop({ ref: () => User, required: true })
  following: typegoose.Ref<User>
}
