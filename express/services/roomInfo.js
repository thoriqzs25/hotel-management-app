const db = require('./db');

async function getRoomInfo() {
  const data = db.query(`SELECT char, type, capacity, specification, availability, price, discount FROM room`, []);

  return {
    data,
  };
}

async function createRoomInfo(params) {
  const { char, type, capacity, specification, availability, price, discount } = params;

  let dbase = db.getDb();

  const create = dbase.prepare(
    `INSERT INTO room (char, type, capacity,specification, availability, price, discount) VALUES (@char, @type, @capacity, @specification, @availability, @price, @discount)`
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

module.exports = {
  getRoomInfo,
  createRoomInfo,
  deleteRoomInfo,
};
