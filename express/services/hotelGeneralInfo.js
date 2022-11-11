const db = require('./db');
// const config = require('../config');

function getHotelInfo() {
  // const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM general_info LIMIT 2`, []);
  // const meta = {page};

  return {
    data,
    // meta
  };
}

module.exports = {
  // getMultiple
  getHotelInfo,
};
