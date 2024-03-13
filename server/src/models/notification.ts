import { Schema, model, type Types } from 'mongoose'

export interface NOTIFICATION {
  _id?: Types.ObjectId
  message: string
  date: Date
  read: boolean
}
const notificationSchema = new Schema<NOTIFICATION>({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
})

const Notification = model<NOTIFICATION>('Notification', notificationSchema)

export default Notification
