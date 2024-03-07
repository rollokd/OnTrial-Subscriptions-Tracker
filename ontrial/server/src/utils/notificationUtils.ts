import Notification from '../models/notification';

const addNotification = async (message: string) => {
  try {
    const notification = new Notification({ message });
    await notification.save();
  } catch (error) {
    console.error('Failed to add notification:', error);
  }
};

export default addNotification;