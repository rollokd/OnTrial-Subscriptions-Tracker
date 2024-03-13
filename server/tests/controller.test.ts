import { describe, expect } from '@jest/globals'
import express from 'express'
import router from '../src/router'
import supertest from 'supertest'
import Notification from '../src/models/notification.models'
import Subscription, { type SUBSCRIPTION } from '../src/models/subscription.models'
import mongoose from 'mongoose'
const database = 'test'

describe('Integration tests', () => {
  const app = express()
  app.use(express.json())
  app.use(router)
  const request = supertest(app)
  const db = mongoose

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${database}`
    await db.connect(url)
  })

  afterAll(async () => {
    await Subscription.deleteMany()
    await Notification.deleteMany()
    await db.disconnect()
  })

  describe('unhappy integrations', () => {
    beforeAll(async () => {
      await db.disconnect()
    })

    afterAll(async () => {
      await db.connect(`mongodb://127.0.0.1/${database}`)
    })

    it('should return an error if the database fails', async () => {
      return request
        .get('/subscriptions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(async (response) => {
          expect(response.body.errors.message).toBe('There was an error fetching the subscriptions')
        })
    })
    it('should return an error if the database fails', async () => {
      return request
        .get('/notifications')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(async (response) => {
          expect(response.body.errors.message).toBe('Error fetching notifications.')
        })
    })
    it('should receive code 500 when database disconnected', async () => {
      const subs = {
        name: 'somethingCrazy',
        cost: 2.59,
        status: true,
        billingDate: '2024-03-12T00:00:00.000Z'
      }
      return request
        .post('/subscriptions')
        .set('Content-Type', 'application/json')
        .send(subs)
        .then(async (response) => {
          expect(response.statusCode).toBe(500)
          expect(response.body.errors.message).toBe('An error occurred while adding the subscription.')
        })
    })
  })

  describe('GET request', () => {
    it('should correctly return all the subscriptions', async () => {
      await Subscription.create({ name: 'Netflix', cost: '2.99', billingDate: '2025-03-14T00:00:00.000Z', status: true })
      await Subscription.create({ name: 'Spotify', cost: '4.99', billingDate: '2024-04-16T00:00:00.000Z', status: true })
      await Subscription.create({ name: 'Disney+', cost: '5.99', billingDate: '2024-06-18T00:00:00.000Z', status: false })

      return request
        .get('/subscriptions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toBe(3)
        })
    })

    it('should correctly return all the notifications', async () => {
      await Notification.create({ message: 'Netflix', date: '2025-03-14T00:00:00.000Z', read: false })
      await Notification.create({ message: 'Spotify', date: '2024-04-16T00:00:00.000Z', read: false })
      await Notification.create({ message: 'Disney+', date: '2024-06-18T00:00:00.000Z', read: false })

      return request
        .get('/notifications')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toBe(3)
        })
    })
  })

  describe('POST request', () => {
    it('should receive correct status code on success', () => {
      const subs = {
        name: 'somethingCrazy',
        cost: 2.59,
        billingDate: '2024-03-12T00:00:00.000Z',
        status: true
      }
      return request
        .post('/subscriptions')
        .set('Content-Type', 'application/json')
        .send(subs)
        .then((response) => {
          expect(response.statusCode).toBe(200)
        })
    })
    it('should post the right value', () => {
      const subs = {
        name: 'somethingCrazy',
        cost: 2.59,
        billingDate: '2024-03-12T00:00:00.000Z',
        status: true
      }
      return request
        .post('/subscriptions')
        .set('Content-Type', 'application/json')
        .send(subs)
        .then((response) => {
          expect(response.body.data).toMatchObject({
            name: 'somethingCrazy',
            cost: 2.59,
            billingDate: '2024-03-12T00:00:00.000Z',
            status: true
          })
        })
    })
    it('should receive correct status code on failure', () => {
      const subs = {
        name: 'somethingCrazy',
        cost: 2.59,
        status: true
      }
      return request
        .post('/subscriptions')
        .set('Content-Type', 'application/json')
        .send(subs)
        .then((response) => {
          expect(response.statusCode).toBe(400)
        })
    })
  })
  describe('DELETE request', () => {
    it('should correctly delete the item', async () => {
      const sub = await Subscription.create({ name: 'Patreon', cost: '7.99', billingDate: '2024-03-14T00:00:00.000Z', status: true })
      return request.delete('/subscriptions/' + sub._id.toString()).expect(200).expect('Content-Type', /json/).then(async (response) => {
        const check = await Subscription.findById(sub._id)
        console.log(check)
        expect(check).toBeNull()
        expect(response.body.data.name).toBe('Patreon')
      })
    })
    it('should fail if given an invalid id', async () => {
      return request.delete('/subscriptions/' + 123).expect(500).expect('Content-Type', /json/).then(async (response) => {
        expect(response.body.errors.message).toBe('Deletion unsuccessful')
      })
    })
  })
  describe('PUT request', () => {
    it('should change the right value when updating', async () => {
      const sub = await Subscription.create({ name: 'Netflix', cost: '2.99', billingDate: '2025-03-14T00:00:00.000Z', status: true })
      console.log(sub.name)
      return request
        .put(`/subscriptions/${sub._id.toString()}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          _id: sub._id,
          cost: sub.cost,
          billingDate: sub.billingDate,
          status: sub.status,
          name: 'somethingCRAZIER'
        }).then((response) => {
          console.log('teststttt', response.body)
          expect(response.body.data.name).toBe('somethingCRAZIER')
          expect(response.body.data.cost).toEqual(2.99)
          expect(response.body.data.billingDate).toEqual('2025-03-14T00:00:00.000Z')
        })
    })
    it('should receive correct status code on failure', async () => {
      const sub = await Subscription.create({ name: 'Netflix', cost: '2.99', billingDate: '2025-03-14T00:00:00.000Z', status: true })

      return request
        .put(`/subscriptions/${sub._id.toString()}`)
        .send({
          _id: sub._id,
          cost: sub.cost,
          billingDate: sub.billingDate,
          status: sub.status
        })
        .expect(400)
        .then((response) => {
          expect(response.body.errors.message).toBe('missing values')
        })
    })
    it('should fail if given a wrong id', async () => {
      const sub = await Subscription.create({ name: 'Netflix', cost: '2.99', billingDate: '2025-03-14T00:00:00.000Z', status: true })

      return request
        .put('/subscriptions/124')
        .send({
          _id: sub._id,
          cost: sub.cost,
          billingDate: sub.billingDate,
          status: sub.status,
          name: sub.name
        })
        .expect(500)
        .then((response) => {
          expect(response.body.errors.message).toBe('Unable to update.')
        })
    })
  })
})
