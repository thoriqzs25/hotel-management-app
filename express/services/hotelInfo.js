const db = require('./db');

async function getHotelInfo() {
  const data = await db.query(
    `SELECT name AS Hotel_Name, address AS Hotel_Address, email AS Hotel_Email, telephone AS Hotel_Telephone, bank_name AS Hotel_Bank_Name, bank_account_name AS Hotel_Bank_Account_Name, bank_number AS Hotel_Bank_Number FROM hotel`,
    []
  );

  return {
    data,
  };
}

async function checkEmptyHotel() {
  const data = db.query(`SELECT CASE WHEN EXISTS(SELECT 1 FROM hotel) THEN 0 ELSE 1 END AS IsEmpty`, []);
  return {
    data,
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
    `INSERT INTO hotel (name, address, email, telephone, bank_name, bank_account_name, bank_number) VALUES (@Hotel_Name, @Hotel_Address, @Hotel_Email, @Hotel_Telephone, @Hotel_Bank_Name, @Hotel_Bank_Account_Name, @Hotel_Bank_Number)`
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

async function putHotelInfo(params) {
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

  const update = dbase.prepare(
    `UPDATE hotel SET name = @Hotel_Name, address = @Hotel_Address, email = @Hotel_Email, telephone = @Hotel_Telephone, bank_name = @Hotel_Bank_Name, bank_account_name = @Hotel_Bank_Account_Name, bank_number = @Hotel_Bank_Number WHERE hotel.id = 1`
  );

  const updateHotel = dbase.transaction((item) => {
    update.run(item);
  });

  updateHotel({
    Hotel_Name: Hotel_Name,
    Hotel_Address: Hotel_Address,
    Hotel_Email: Hotel_Email,
    Hotel_Telephone: Hotel_Telephone,
    Hotel_Bank_Name: Hotel_Bank_Name,
    Hotel_Bank_Account_Name: Hotel_Bank_Account_Name,
    Hotel_Bank_Number: Hotel_Bank_Number,
  });

  return {
    update,
  };
}

module.exports = {
  getHotelInfo,
  postHotelInfo,
  putHotelInfo,
  checkEmptyHotel,
};
