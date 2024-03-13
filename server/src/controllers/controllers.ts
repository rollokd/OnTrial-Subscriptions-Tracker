import Subscription, { type SUBSCRIPTION } from '../models/subscription.models'
import Notification, { type NOTIFICATION } from '../models/notification.models'
import { type HydratedDocument } from 'mongoose'
import { type Response, type Request } from 'express'
import asyncHandler from 'express-async-handler'

interface ErrorType {
  errors: {
    message: string
  }
}
type Data = SUBSCRIPTION | SUBSCRIPTION[] | NOTIFICATION[] | NOTIFICATION

interface DataType {
  data: Data
}
function errorRes (message: string): ErrorType {
  return { errors: { message } }
}

function dataResponse (data: SUBSCRIPTION | SUBSCRIPTION[] | NOTIFICATION[] | NOTIFICATION): DataType {
  return { data }
}

export const getSubs = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriptions = await Subscription.find()
    res.send(dataResponse(subscriptions))
  } catch (error) {
    res.status(500).send({
      errors: { message: 'There was an error fetching the subscriptions' }
    })
    console.error('Error fetching subscriptions:', error)
  }
}

export const addSub = async (req: Request, res: Response): Promise<void> => {
  try {
    const sub: SUBSCRIPTION = {
      cost: req.body.cost,
      billingDate: req.body.billingDate,
      name: req.body.name,
      status: req.body.status
    }
    if (sub.cost === undefined || sub.billingDate === undefined || sub.name === '' || sub.name === undefined || sub.status === undefined) {
      console.log('update failed due to missing values')
      res.status(400).json({ errors: { message: 'missing values' } })
    } else {
      const subscription: HydratedDocument<SUBSCRIPTION> = new Subscription(sub)
      await subscription.save()
      res.send(dataResponse(subscription))
    }
  } catch (error) {
    res.status(500).send({
      errors: { message: 'An error occurred while adding the subscription.' }
    })
    console.error('Error adding subscription:', error)
  }
}

export const editSub = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  console.log(`Updating subscription with ID: ${id}`) // Debugging log
  try {
    const sub: SUBSCRIPTION = {
      cost: req.body.cost,
      billingDate: req.body.billingDate,
      name: req.body.name,
      status: req.body.status
    }
    if (
      sub.cost === undefined ||
      sub.billingDate === undefined ||
      sub.name === '' ||
      sub.name === undefined ||
      sub.status === undefined
    ) {
      console.log('update failed due to missing values')
      res.status(400).json(errorRes('missing values'))
    }

    const subscription = await Subscription.findByIdAndUpdate(id, sub, {
      new: true
    })
    if (subscription === null) {
      console.log('no sub found')
      res.status(404).send(errorRes('Subscription not found'))
    } else {
      res.send(dataResponse(subscription))
    }
  } catch (error) {
    res.status(500).send(errorRes('Unable to update.'))
    console.error('Error updating subscription:', error)
  }
})

export const deleteSub = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.params.id === undefined) res.status(400).json(errorRes('No id'))
    const deletedSubscription = await Subscription.findByIdAndDelete(
      req.params.id
    )
    if (deletedSubscription === undefined || deletedSubscription === null) {
      res.status(404).send('Subscription not found')
    } else {
      res.send(dataResponse(deletedSubscription))
    }
  } catch (error) {
    res.status(500).send(errorRes('Deletion unsuccessful'))
    console.error('deletion error', error)
  }
})
export const deleteNotif = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.params.id === undefined) res.status(400).json(errorRes('No id'))
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    )
    if (deletedNotification === undefined || deletedNotification === null) {
      res.status(404).send('Subscription not found')
    } else {
      res.send(dataResponse(deletedNotification))
    }
  } catch (error) {
    res.status(500).send(errorRes('Deletion unsuccessful'))
    console.error('deletion error', error)
  }
})

export const getNotification = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find({ read: false }).sort({
      date: -1
    })
    res.json(dataResponse(notifications))
  } catch (error) {
    res.status(500).send(errorRes('Error fetching notifications.'))
  }
}
)
