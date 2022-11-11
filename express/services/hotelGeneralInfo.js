const db = require('./db');
// const config = require('../config');

async function getHotelInfo() {
  // const offset = (page - 1) * config.listPerPage;
  const data = await db.query(`SELECT * FROM general_info`, []);
  // const meta = {page};

  return {
    data,
    // meta
  };
}

async function postHotelInfo(params) {
  const {
    Hotel_Name,
    Hotel_Address,
    Hotel_Email,
    Hotel_Telephone,
    Hotel_Bank_Name,
    Hotel_Bank_Account_Name,
    Hotel_Bank_Number,
  } = params;

  let dbase = db.getDb();

  const insert = dbase.prepare(
    `INSERT INTO general_info (Hotel_Name, Hotel_Address, Hotel_Email, Hotel_Telephone, Hotel_Bank_Name, Hotel_Bank_Account_Name, Hotel_Bank_Number) VALUES (@Hotel_Name, @Hotel_Address, @Hotel_Email, @Hotel_Telephone, @Hotel_Bank_Name, @Hotel_Bank_Account_Name, @Hotel_Bank_Number)`
  );

  const insertHotel = dbase.transaction((item) => {
    insert.run(item);
  });

  insertHotel({
    Hotel_Name: Hotel_Name,
    Hotel_Address: Hotel_Address,
    Hotel_Email: Hotel_Email,
    Hotel_Telephone: Hotel_Telephone,
    Hotel_Bank_Name: Hotel_Bank_Name,
    Hotel_Bank_Account_Name: Hotel_Bank_Account_Name,
    Hotel_Bank_Number: Hotel_Bank_Number,
  });

  return {
    insert,
  };
}

module.exports = {
  getHotelInfo,
  postHotelInfo,
};
