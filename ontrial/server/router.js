const express = require('express');
const router = express.Router();
const { getSubs, addSub } = require('./controllers/controllers');

router.get('/subscriptions', getSubs);
router.post('/subscriptions', addSub);

module.exports = router;