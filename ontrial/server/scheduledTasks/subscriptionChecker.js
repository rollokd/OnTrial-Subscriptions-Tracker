const { CronJob } = require('cron');
const { differenceInCalendarDays } = require('date-fns');
const Subscription = require('../models/subscription'); 
const { addNotification } = require('../utils/notificationUtils'); 

const checkSubscriptionsAndNotify = async () => {
  const subscriptions = await Subscription.find(); 
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  subscriptions.forEach(async (subscription) => {
        const billingDate = new Date(subscription.billingDate);

        if (differenceInCalendarDays(billingDate, tomorrow) === 0) {
            const message = `Your subscription for ${subscription.name} is due tomorrow.`;
            await addNotification(message); 
        }
    });
};

// run every day at 7 AM 
const job = new CronJob('50 2 * * *', () => {
    console.log('Checking subscriptions and notifying...');
    checkSubscriptionsAndNotify();
}, null, true, 'Europe/Berlin'); 

job.start();

console.log('Scheduled job started. It will check subscriptions daily at 7 AM Berlin time.');


module.exports = { checkSubscriptionsAndNotify };