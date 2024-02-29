const Subscription = require("../models/subscription")

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

module.exports = {getSubs,addSub}