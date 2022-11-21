export class HotelAPI {
  static async getHotel() {
    try {
      return fetch('http://localhost:3000/hotel').then(async (response) => {
        let res = await response.json();
        return res.data[0];
      });
    } catch {
      // console.log('Looks like there was a problem');
      return({ message: "Looks like there was a problem." });
    }
  }

  static async checkEmpty() {
    try {
      return fetch('http://localhost:3000/hotel/info').then(async (response) => {
        let res = await response.json();
        console.log('line 17 fetch data', res.data[0].IsEmpty);
        return res.data[0].IsEmpty;
      });
    } catch {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      alert('Looks like there was a problem. Status Code: ' + response.status);
    }
  }

  static async postHotel(data) {
    try {
      const formData = {
        Hotel_Name: data.Hotel_Name,
        Hotel_Address: data.Hotel_Address,
        Hotel_Email: data.Hotel_Email,
        Hotel_Telephone: data.Hotel_Telephone,
        Hotel_Bank_Name: data.Hotel_Bank_Name,
        Hotel_Bank_Account_Name: data.Hotel_Bank_Account_Name,
        Hotel_Bank_Number: data.Hotel_Bank_Number,
      };

      return fetch('http://localhost:3000/hotel', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json());
    } catch {
      alert('Error POST HOTEL');
    }
  }

  static async updateHotel(data) {
    try {
      const formData = {
        Hotel_Name: data.Hotel_Name,
        Hotel_Address: data.Hotel_Address,
        Hotel_Email: data.Hotel_Email,
        Hotel_Telephone: data.Hotel_Telephone,
        Hotel_Bank_Name: data.Hotel_Bank_Name,
        Hotel_Bank_Account_Name: data.Hotel_Bank_Account_Name,
        Hotel_Bank_Number: data.Hotel_Bank_Number,
      };

      // console.log('line 37', formData);

      return fetch('http://localhost:3000/hotel', {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json());
    } catch {
      alert('Error PUT HOTEL');
    }
  }
}
