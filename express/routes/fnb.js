const express = require('express');
const router = express.Router();
const fnb = require('../services/fnbInfo.js');

router.get('/', async function (req, res, next) {
  try {
    res.json(await fnb.getFnbInfo());
  } catch (e) {
    console.error(`Error while getting fnb information`, e.message);
    next(e);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await fnb.createFnbInfo(req.body));
  } catch (err) {
    console.error(`Error while create fnb information`, err.message);
    next(err);
  }
});

router.delete('/', async function (req, res, next) {
  try {
    res.json(await fnb.deleteFnbInfo(req.body));
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
