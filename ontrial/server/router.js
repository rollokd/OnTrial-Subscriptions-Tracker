const express = require('express');
const router = express.Router();
const { getSubs, addSub, editSub, deleteSub, getNotification } = require('./controllers/controllers');

router.get('/subscriptions', getSubs);
router.post('/subscriptions', addSub);
router.put('/subscriptions/:id', editSub)
router.delete('/subscriptions/:id', deleteSub)
router.get('/notifications', getNotification)

module.exports = router;