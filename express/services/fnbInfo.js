const db = require('./db');

async function getFnbInfo() {
  const data = db.query(`SELECT * FROM fnb`, []);

  return {
    data,
  };
}

async function createFnbInfo(params) {
  const { name, availability, price, discount, image } = params;

  let dbase = db.getDb();

  const create = dbase.prepare(
    `INSERT INTO fnb (name, availability, price, discount, image) VALUES (@name, @availability, @price, @discount, @image)`
  );

  const createFnb = dbase.transaction((item) => {
    create.run(item);
  });

  createFnb({
    name: name,
    availability: availability,
    price: price,
    discount: discount,
    image: image,
  });

  return {
    create,
  };
}

async function deleteFnbInfo(params) {
  const { id } = params;
  let dbase = db.getDb();

  const deleteReq = dbase.prepare(`DELETE FROM fnb WHERE id = ${id}`);

  const deleteFnb = dbase.transaction(() => {
    deleteReq.run();
  });

  deleteFnb();
  return {
    deleteReq,
  };
}

module.exports = {
  getFnbInfo,
  createFnbInfo,
  deleteFnbInfo,
};
