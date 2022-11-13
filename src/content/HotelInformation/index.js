import { checkEmpty, getHotel, postHotel, updateHotel } from '../../services/api.js';

let DATA = [
  {
    title: 'Hotel Name',
    item: '-',
    id: 'Hotel_Name',
  },
  {
    title: 'Hotel Address',
    item: '-',
    id: 'Hotel_Address',
  },
  {
    title: 'Hotel Email',
    item: '-',
    id: 'Hotel_Email',
  },
  {
    title: 'Hotel Telephone',
    item: '-',
    id: 'Hotel_Telephone',
  },
  {
    title: 'Hotel Bank Name',
    item: '-',
    id: 'Hotel_Bank_Name',
  },
  {
    title: 'Hotel Bank Acount Name',
    item: '-',
    id: 'Hotel_Bank_Account_Name',
  },
  {
    title: 'Hotel Bank Number',
    item: '-',
    id: 'Hotel_Bank_Number',
  },
];

export async function generateHotelInformation() {
  const contentItem = document.getElementById('content');
  const modalItem = document.getElementById('modal-field');

  const hotelData = await getHotel();

  let hotel = [];

  if (hotelData) {
    for (var i in hotelData) {
      // console.log('line 49', i);
      // console.log('line 50', i.replace(/_/g, ' '));
      hotel.push({ title: i.replace(/_/g, ' '), item: hotelData[i], id: i });
    }
  }

  if (hotel.length > 0) DATA = hotel;

  let content = '';
  let modal = '';

  DATA.forEach((res, idx) => {
    const field = `
      <div id="hotel_information">
        <p id="title">${res.title}</p>
        <div class="text_field z-depth-1">
          <p>${res.item}</p>
        </div>
      </div>
    `;
    content += field;
  });

  DATA.forEach((res, idx) => {
    const input_field = `
    <div class="field">
      <p>${res.title}</p>
      <div class="text_field z-depth-1">
        <input id="${res.id}" placeholder="${
      res.item != '-' ? res.item : res.title
    }" type="text" class="input_field" value="${res.item != '-' ? res.item : ''}">
      </div>
    </div>
  `;
    modal += input_field;
  });

  modalItem.innerHTML = modal;
  contentItem.innerHTML = content;

  // MODAL TRIGGER
  function initModal() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    let name = document.getElementById('Hotel_Name');
    let address = document.getElementById('Hotel_Address');
    let email = document.getElementById('Hotel_Email');
    let telephone = document.getElementById('Hotel_Telephone');
    let bank_name = document.getElementById('Hotel_Bank_Name');
    let bank_account_name = document.getElementById('Hotel_Bank_Account_Name');
    let bank_number = document.getElementById('Hotel_Bank_Number');

    document.getElementById('modal-btn').addEventListener('click', function () {
      instances.open;
    });

    document.getElementById('confirm-btn').addEventListener('click', async function () {
      let currInput = {
        Hotel_Name: name.value,
        Hotel_Address: address.value,
        Hotel_Email: email.value,
        Hotel_Telephone: telephone.value,
        Hotel_Bank_Name: bank_name.value,
        Hotel_Bank_Account_Name: bank_account_name.value,
        Hotel_Bank_Number: bank_number.value,
      };

      if (
        currInput.Hotel_Name == '' ||
        currInput.Hotel_Address == '' ||
        currInput.Hotel_Email == '' ||
        currInput.Hotel_Telephone == '' ||
        currInput.Hotel_Bank_Name == '' ||
        currInput.Hotel_Bank_Account_Name == '' ||
        currInput.Hotel_Bank_Number == ''
      )
        alert('Failed to input, form are not fully filled');
      else {
        let isEmpty = await checkEmpty().then((res) => res);
        if (isEmpty) postHotel(currInput);
        else updateHotel(currInput);
        generateHotelInformation();
      }
    });
  }

  if (document.readyState !== 'loading') {
    console.log('App Ready >> Assigning modal event listener');
    initModal();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      console.log('App not Ready >> Assigning DOM Content Loader Listener >> assigning modal event listeners');
      initModal();
    });
  }
}
