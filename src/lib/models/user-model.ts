import mongoose from 'mongoose'

interface IUser {
  username?: String
  name?: String
  email?: String
  emailVerified?: Date
  image?: String
  bio?: String
  onboarded?: Boolean
  spaces?: mongoose.Schema.Types.ObjectId[]
  thoughts?: mongoose.Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  emailVerified: mongoose.Schema.Types.Date,
  image: String,
  bio: String,
  onboarded: {
    type: Boolean,
    default: false
  },
  spaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space'
    }
  ],
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ]
})

export type User = mongoose.InferSchemaType<typeof userSchema>

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema)
export default UserModel
