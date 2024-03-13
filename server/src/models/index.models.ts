import mongoose from 'mongoose'

const dbConnection: string = 'mongodb://localhost:27017/Subscriptions'

// MongoDB connection
mongoose
  .connect(dbConnection)
  .then(() => { console.log('MongoDB connected') })
  .catch((err) => { console.error('Could not connect to MongoDB...', err) })

export default mongoose
