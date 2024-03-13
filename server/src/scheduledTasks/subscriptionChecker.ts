import { CronJob } from 'cron'
import { differenceInCalendarDays } from 'date-fns'
import Subscription from '../models/subscription.models'
import addNotification from '../utils/notificationUtils'

const checkSubscriptionsAndNotify = async (): Promise<void> => {
  const subscriptions = await Subscription.find()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))

  await Promise.all(subscriptions.map(async (subscription) => {
    const billingDate = new Date(subscription.billingDate)

    if (differenceInCalendarDays(billingDate, tomorrow) === 0) {
      await addNotification(subscription.name)
    }
  }))
}

const hour = 14
const minute = '08'
// run every day at 7 AM
const job = new CronJob(
  `${minute} ${hour} * * *`,
  async () => {
    console.log('Checking subscriptions and notifying...')
    await checkSubscriptionsAndNotify()
  },
  null,
  true,
  'Europe/London'
)

job.start()

console.log(
  'Scheduled job started. It will check subscriptions daily at 7:55 PM LONDON time.'
)

export default checkSubscriptionsAndNotify
