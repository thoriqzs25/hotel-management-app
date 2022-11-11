export async function getHotel() {
  try {
    let res;
    res = fetch('http://localhost:3000/hotel').then(async (response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }

      let res = await response.json();
      return res.data[0];
    });
    return res;
  } catch {
    alert('error fetching data hotel');
  }
}

// export async function getHotel() {
//   try {
//     let res = await fetch('http://localhost:3000/hotel');
//     // res.json
//     return res.body;
//   } catch {
//     alert('error fetching data hotel');
//   }
// }
