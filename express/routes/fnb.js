const express = require('express');
const router = express.Router();
const fnb = require('../services/fnbInfo.js');
const multer = require('multer');
const fs = require('fs');

router.get('/', async function (req, res, next) {
  try {
    res.json(await fnb.getFnbInfo());
  } catch (e) {
    console.error(`Error while getting fnb information`, e.message);
    next(e);
  }
});

router.post('/', multer().single('image'), async function (req, res, next) {
  try {
    fs.writeFile('./img/fnb/' + req.file.originalname, req.file.buffer, (err) => {
      console.error(err);
    });
    const payload = { ...req.body, image: req.file.originalname };
    res.json(await fnb.createFnbInfo(payload));
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
