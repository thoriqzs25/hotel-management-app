const db = require('./db');

async function getBookInfo() {
  const data = db.query(`SELECT`, []);

  return {
    data,
  };
}

module.exports = {
  getBookInfo,
};
