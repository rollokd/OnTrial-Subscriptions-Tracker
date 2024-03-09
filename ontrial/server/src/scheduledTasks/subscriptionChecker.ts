import { CronJob } from "cron";
import { add, differenceInCalendarDays } from "date-fns";
import Subscription from "../models/subscription";
import addNotification from "../utils/notificationUtils";

const checkSubscriptionsAndNotify = async () => {
  const subscriptions = await Subscription.find();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  subscriptions.forEach(async (subscription) => {
    const billingDate = new Date(subscription.billingDate);

    if (differenceInCalendarDays(billingDate, tomorrow) === 0) {
      // const message: string = `Your subscription for ${subscription.name} is due tomorrow.`;
      // await addNotification(message);
      await addNotification(subscription.name);
    }
  });
};

const hour = 19;
const minute = 55;
// run every day at 7 AM
const job = new CronJob(
  "34 11 * * *",
  () => {
    console.log("Checking subscriptions and notifying...");
    checkSubscriptionsAndNotify();
  },
  null,
  true,
  "Europe/London"
);

job.start();

console.log(
  "Scheduled job started. It will check subscriptions daily at 7:55 PM LONDON time."
);

export default checkSubscriptionsAndNotify;
