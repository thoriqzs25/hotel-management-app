const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('hotelApp.db'), { fileMustExist: true });

function getDb() {
  return db;
}

function query(sql, params) {
  return db.prepare(sql).all(params);
}

module.exports = {
  getDb,
  query,
};
