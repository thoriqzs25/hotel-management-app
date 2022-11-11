const express = require('express');
const router = express.Router();
const hotel = require('../services/hotelGeneralInfo');

/* GET quotes listing. */
router.get('/', function (req, res, next) {
  try {
    res.json(hotel.getHotelInfo());
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
