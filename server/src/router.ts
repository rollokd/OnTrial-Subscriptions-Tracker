import express from 'express'
// const express = require('express');
import {
  getSubs,
  addSub,
  editSub,
  deleteSub,
  getNotification
} from './controllers/controllers'

const router = express.Router()

router.get('/subscriptions', getSubs)
router.post('/subscriptions', addSub)
router.put('/subscriptions/:id', editSub)
router.delete('/subscriptions/:id', deleteSub)
router.get('/notifications', getNotification)

export default router
