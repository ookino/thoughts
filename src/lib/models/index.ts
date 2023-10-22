import { getModelForClass, ReturnModelType, DocumentType } from '@typegoose/typegoose'

import { Thought } from './thought-model'
import { User } from './user-model'
import { UserRelationship } from './user-relationship-model'

export const ThoughtModel: ReturnModelType<typeof Thought> = getModelForClass(Thought)
export const UserModel = getModelForClass(User)
export const UserRelationshipModel: ReturnModelType<typeof UserRelationship> = getModelForClass(UserRelationship)
