import Subscription, { SUBSCRIPTION } from "../models/subscription";
import Notification from '../models/notification';
import { HydratedDocument } from "mongoose";
import { Response, Request } from 'express';

export const getSubs = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find();
    res.send(subscriptions);
  } catch (error) {
    res.status(500).send("An error occurred while fetching the subscriptions.");
    console.error("Error fetching subscriptions:", error);
  }

}

export const addSub = async (req: Request, res: Response) => {
  try {
    const sub: SUBSCRIPTION = {
      cost: req.body.cost,
      billingDate: req.body.date,
      name: req.body.name,
      status: req.body.status,
    }
    const subscription: HydratedDocument<SUBSCRIPTION> = new Subscription(sub);
    await subscription.save();
    res.send(subscription);

  } catch (error) {
    res.status(500).send("An error occurred while adding the subscription.");
    console.error("Error adding subscription:", error);
  }
}

export const editSub = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`Updating subscription with ID: ${id}`); // Debugging log
  try {
    const sub: SUBSCRIPTION = {
      cost: req.body.cost,
      billingDate: req.body.date,
      name: req.body.name,
      status: req.body.status,
    }
    const subscription = await Subscription.findByIdAndUpdate(id, sub, { new: true });
    if (!subscription) {
      return res.status(404).send('Subscription not found');
    }
    res.send(subscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).send('Error updating subscription');
  }
};

export const deleteSub = async (req: Request, res: Response) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) {
      return res.status(404).send('Subscription not found');
    }
    res.send(deletedSubscription);
  } catch (error) {
    res.status(500).send('Error deleting subscription');
  }
};

export const getNotification = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({ read: false }).sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).send("Error fetching notifications.");
  }
};

