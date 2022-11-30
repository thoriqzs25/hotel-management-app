const db = require('./db');

async function getFnbInfo() {
  const data = db.query(`SELECT * FROM fnb`, []);

  return {
    data,
  };
}

async function getFnbById(id) {
  const data = db.query(`SELECT * FROM fnb WHERE id = ${id}`, []);

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

async function putFnbInfo(params) {
  console.log('line 62 params', params);
  let dbase = db.getDb();

  const update = dbase.prepare(
    `UPDATE fnb SET name = '${params.name}', price = ${params.price}, discount = ${params.discount}${
      params.image !== 'no-changes' ? `, image = @image` : ''
    } WHERE fnb.id = ${params.id}`
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
  getFnbInfo,
  getFnbById,
  createFnbInfo,
  deleteFnbInfo,
  putFnbInfo,
};
