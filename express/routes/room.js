const express = require('express');
const multer = require('multer');
const router = express.Router();
const room = require('../services/roomInfo');
const fs = require('fs');

router.get('/', async function (req, res, next) {
  try {
    res.json(await room.getRoomInfo());
  } catch (e) {
    console.error(`Error while getting room information`, e.message);
    next(e);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    res.json(await room.getFnbById(id));
  } catch (e) {
    console.log(`Error while getting fnb by Id`, e.message);
    next(e);
  }
});

router.post('/', multer().single('image'), async function (req, res, next) {
  try {
    fs.writeFile('./img/room/' + req.file.originalname, req.file.buffer, (err) => {
      console.error(err);
    });
    const payload = { ...req.body, image: req.file.originalname };
    res.json(await room.createRoomInfo(payload));
  } catch (err) {
    console.error(`Error while create room information`, err.message);
    next(err);
  }
});

router.delete('/', async function (req, res, next) {
  try {
    res.json(await room.deleteRoomInfo(req.body));
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.put('/', multer().single('image'), async function (req, res, next) {
  try {
    if (req.body.image !== 'no-changes')
      fs.writeFile('./img/room/' + req.file.originalname, req.file.buffer, (err) => {
        console.error(err);
      });
    const payload = { ...req.body, image: req.file.originalname };
    res.json(await room.putFnbInfo(payload));
  } catch (err) {
    console.error(`Error while editing room data`, err.message);
    next(err);
  }
});

module.exports = router;
