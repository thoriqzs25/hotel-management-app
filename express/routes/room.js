const express = require('express');
const router = express.Router();
const room = require('../services/roomInfo');

router.get('/', async function (req, res, next) {
  try {
    res.json(await room.getRoomInfo());
  } catch (e) {
    console.error(`Error while getting room information`, e.message);
    next(e);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await room.createRoomInfo(req.body));
  } catch (err) {
    console.error(`Error while create room information`, err.message);
    next(err);
  }
});

module.exports = router;
