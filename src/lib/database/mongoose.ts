import mongoose from 'mongoose'

let isConnected = false

/**
 * Connect to MongoDB using Mongoose.
 *
 * @returns {Promise<void>} A Promise that resolves when the connection is established or rejects on error.
 */
export const connectToDB = async () => {
  mongoose.set('strictQuery', true)
  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found')
  if (isConnected) return console.log('DB Already Connected')

  try {
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true
  } catch (error) {
    console.log(error)
  }
}
