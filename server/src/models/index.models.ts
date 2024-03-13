import mongoose from 'mongoose'

const dbConnection: string = process.env.PROD_DB ?? 'mongodb://localhost:27017/Subscriptions'

// MongoDB connection
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(dbConnection)
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.error('Could not connect to MongoDB...', err) })
}

export default mongoose
