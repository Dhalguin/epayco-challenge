import mongoose from 'mongoose'

export const connectDB = () => {
  const MONGO_URI = process.env.MONGO_URI || ''

  mongoose.connect(MONGO_URI, { retryWrites: false })

  mongoose.connection.once('open', () => console.log('DB connected succesfully'))

  mongoose.connection.on('error', () => console.log('Error to connect DB'))
}
