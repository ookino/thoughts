import mongoose from 'mongoose'

const thoughtSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    public: { type: Boolean, default: true },
    parentId: { type: String },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ]
  },
  { timestamps: true }
)

type RawThought = mongoose.InferSchemaType<typeof thoughtSchema>
export type Thought = RawThought & { _id: mongoose.Types.ObjectId }
export type PopulatedUser = { _id: mongoose.Types.ObjectId; name: string; username: string; image: string }
export type PopulatedThought = Thought & {
  user: PopulatedUser
  children: PopulatedThought[]
}
const ThoughtModel = mongoose.models.Thought || mongoose.model<RawThought>('Thought', thoughtSchema)
export default ThoughtModel
