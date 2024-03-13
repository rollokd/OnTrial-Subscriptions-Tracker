import mongoose from './index.models'
import { type Types } from 'mongoose'

export interface SUBSCRIPTION {
  _id?: Types.ObjectId
  name: string
  cost: number
  billingDate: Date
  status: boolean
}
const subscriptionSchema = new mongoose.Schema<SUBSCRIPTION>({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  billingDate: { type: Date, required: true },
  status: { type: Boolean, required: true }
})

const Subscription = mongoose.model<SUBSCRIPTION>('subscription', subscriptionSchema)

export default Subscription
