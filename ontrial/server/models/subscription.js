const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
 name: String,
 cost: Number,
 billingDate: Date,
 status: String,
});

const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;