import { Schema, model } from 'mongoose';

export type SUBSCRIPTION = {
    name: string,
    cost: number,
    billingDate: Date,
    status: string
}
const subscriptionSchema = new Schema<SUBSCRIPTION>({
    name: String,
    cost: Number,
    billingDate: Date,
    status: String,
});

const Subscription = model('subscription', subscriptionSchema);

export default Subscription;