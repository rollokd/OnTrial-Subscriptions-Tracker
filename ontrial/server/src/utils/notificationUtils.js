const Notification = require('../models/notification');

const addNotification = async (message) => {
  try {
    const notification = new Notification({ message });
    await notification.save();
  } catch (error) {
    console.error('Failed to add notification:', error);
  }
};

module.exports = { addNotification };