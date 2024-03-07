import { Schema, model } from 'mongoose'

interface NOTIFICATION {
  message: string
  date: Date
  read: boolean
}
const notificationSchema = new Schema<NOTIFICATION>({
  message: String,
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
})

const Notification = model('Notification', notificationSchema)

export default Notification
