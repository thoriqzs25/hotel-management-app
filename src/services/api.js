export async function getHotel() {
  try {
    return fetch('http://localhost:3000/hotel').then(async (response) => {
      let res = await response.json();
      return res.data[0];
    });
  } catch {
    console.log('Looks like there was a problem. Status Code: ' + response.status);
    alert('Looks like there was a problem. Status Code: ' + response.status);
  }
}

export async function postHotel(data) {
  try {
    const formData = {
      Hotel_Name: data[0].item,
      Hotel_Address: data[1].item,
      Hotel_Email: data[2].item,
      Hotel_Telephone: data[3].item,
      Hotel_Bank_Name: data[4].item,
      Hotel_Bank_Account_Name: data[5].item,
      Hotel_Bank_Number: data[6].item,
    };

    // console.log('line 37', formData);

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
