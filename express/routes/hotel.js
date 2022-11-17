const express = require('express');
const router = express.Router();
const hotel = require('../services/hotelInfo');

/* GET quotes listing. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await hotel.getHotelInfo());
  } catch (err) {
    console.error(`Error while getting hotel information `, err.message);
    next(err);
  }
});

router.get('/info', async function (req, res, next) {
  try {
    res.json(await hotel.checkEmptyHotel());
  } catch (err) {
    console.error(`Error while checking empty set hotel`, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await hotel.postHotelInfo(req.body));
  } catch (err) {
    console.error(`Error while posting hotel information`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await hotel.putHotelInfo(req.body));
  } catch (err) {
    console.error(`Error while put hotel information`, err.message);
    next(err);
  }
});

module.exports = router;
