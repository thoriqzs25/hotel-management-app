const db = require('./db');

async function getRoomInfo() {
  const data = db.query(`SELECT * FROM room`, []);

  return {
    data,
  };
}

async function getRoomById(id) {
  const data = db.query(`SELECT * FROM room WHERE id = '${id}'`, []);

  return {
    data,
  };
}

async function createRoomInfo(params) {
  const { char, type, capacity, specification, availability, price, discount, image } = params;

  let dbase = db.getDb();

  const create = dbase.prepare(
    `INSERT INTO room (char, type, capacity,specification, availability, price, discount, image) VALUES (@char, @type, @capacity, @specification, @availability, @price, @discount, @image)`
  );

  const createRoom = dbase.transaction((item) => {
    create.run(item);
  });

  createRoom({
    char: char,
    type: type,
    capacity: capacity,
    specification: specification,
    availability: availability,
    price: price,
    discount: discount,
    image: image,
  });

  return {
    create,
  };
}

async function deleteRoomInfo(params) {
  const { id } = params;
  let dbase = db.getDb();

  const deleteReq = dbase.prepare(`DELETE FROM room WHERE char = '${id}'`);

  const deleteRoom = dbase.transaction(() => {
    deleteReq.run();
  });

  deleteRoom();
  return {
    deleteReq,
  };
}

async function putRoomInfo(params) {
  let dbase = db.getDb();

  const update = dbase.prepare(
    `UPDATE room SET char = '${params.char}', type = '${params.type}', capacity = '${
      params.capacity
    }', specification = '${params.specification}', availability = ${params.availability}, price = ${
      params.price
    }, discount = ${params.discount}${params.image !== 'no-changes' ? `, image = @image` : ''} WHERE room.id = ${
      params.id
    }`
  );

  const updateFnb = dbase.transaction((data) => {
    update.run(data);
  });

  updateFnb({ image: params.image });

  return {
    update,
  };
}

module.exports = {
  getRoomInfo,
  getRoomById,
  createRoomInfo,
  deleteRoomInfo,
  putRoomInfo,
};
