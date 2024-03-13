import mongoose from 'mongoose'

const dbConnection: string = process.env.DB_URL ?? 'mongodb://localhost:27017/Subscriptions'

// MongoDB connection
console.log(process.env)
if (process.env.NODE_ENV === 'production') {
  mongoose
    .connect(dbConnection, {
      dbName: 'onTrial',
      writeConcern: { w: 'majority' }
    })
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.error('Could not connect to MongoDB...', err) })
}

export default mongoose
