import Notification from '../models/notification.models'

const addNotification = async (message: string): Promise<void> => {
  try {
    const notification = new Notification({ message })
    await notification.save()
  } catch (error) {
    console.error('Failed to add notification:', error)
  }
}

export default addNotification
