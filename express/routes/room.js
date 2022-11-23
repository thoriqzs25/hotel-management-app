const express = require('express');
const multer = require('multer');
const router = express.Router();
const room = require('../services/roomInfo');
const fs = require('fs');

// const diskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "/uploads"));
//   },
//   // konfigurasi penamaan file yang unik
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

router.get('/', async function (req, res, next) {
  try {
    res.json(await room.getRoomInfo());
  } catch (e) {
    console.error(`Error while getting room information`, e.message);
    next(e);
  }
});

router.post('/', multer().single("image"), async function (req, res, next) {
  try {
    fs.writeFile("./img/room/" + req.file.originalname, req.file.buffer, (err) => {
      console.error(err)
    })
    const payload = { ...req.body, image: req.file.originalname }
    console.log(payload)
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

module.exports = router;
