const Subscription = require("../models/subscription")
const Notification = require('../models/notification');

const getSubs = async (req,res)=>{
 try {
  const subscriptions = await Subscription.find();
  res.send(subscriptions);
 } catch (error) {
  res.status(500).send("An error occurred while fetching the subscriptions.");
  console.error("Error fetching subscriptions:", error);
 }

}

const addSub = async (req,res) => {
 try {
  const subscription = new Subscription(req.body);
  await subscription.save();
  res.send(subscription);
  
 } catch (error) {
  res.status(500).send("An error occurred while adding the subscription.");
  console.error("Error adding subscription:", error);
 }
}

const editSub = async (req, res) => {
  const { id } = req.params;
  console.log(`Updating subscription with ID: ${id}`); // Debugging log
  try {
    const subscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
    if (!subscription) {
      return res.status(404).send('Subscription not found');
    }
    res.send(subscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).send('Error updating subscription');
  }
};

const deleteSub = async (req, res) => {
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

const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({ read: false }).sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).send("Error fetching notifications.");
  }
};

module.exports = {
  getSubs,
  addSub,
  editSub,
  deleteSub,
  getNotification
}