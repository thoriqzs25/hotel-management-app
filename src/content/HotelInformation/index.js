import { getHotel, postHotel, updateHotel } from '../../services/api.js';

let DATA = [
  {
    title: 'Hotel Name',
    item: 'Bandung Institute Hotel',
    // id: 'hotel_name',
  },
  {
    title: 'Hotel Address',
    item: 'Jl. Bandung',
    // id: 'hotel_address',
  },
  {
    title: 'Hotel Email',
    item: 'ITB@yahoo.com',
    // id: 'hotel_email',
  },
  {
    title: 'Hotel Telephone Number',
    item: '0812345678',
    // id: 'hotel_telephone_number',
  },
  {
    title: 'Hotel Bank Name',
    item: 'Bank Bandung',
    // id: 'hotel_bank_name',
  },
  {
    title: 'Hotel Bank Acount Name',
    item: 'ITB_Hotel',
    // id: 'hotel_bank_account_name',
  },
  {
    title: 'Hotel Bank Number',
    item: '328912388',
    // id: 'hotel_bank_number',
  },
];

export async function generateHotelInformation() {
  const contentItem = document.getElementById('content');
  const modalItem = document.getElementById('modal-field');

  const hotelData = await getHotel();

  let hotel = [];

  for (var i in hotelData) {
    // console.log('line 49', i);
    // console.log('line 50', i.replace(/_/g, ' '));
    hotel.push({ title: i.replace(/_/g, ' '), item: hotelData[i], id: i });
  }

  let content = '';
  let modal = '';

  if (hotel) DATA = hotel;

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
        <input id="${res.id}" placeholder="${res.item}" type="text" class="input_field" value="${res.item}">
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

    document.getElementById('modal-btn').addEventListener('click', function () {
      console.log('line 89 clicked!');
      instances.open;
    });

    document.getElementById('confirm-btn').addEventListener('click', function () {
      let name = document.getElementById('Hotel_Name');
      let address = document.getElementById('Hotel_Address');
      let email = document.getElementById('Hotel_Email');
      let telephone = document.getElementById('Hotel_Telephone');
      let bank_name = document.getElementById('Hotel_Bank_Name');
      let bank_account_name = document.getElementById('Hotel_Bank_Account_Name');
      let bank_number = document.getElementById('Hotel_Bank_Number');

      let currInfo = {
        Hotel_Name: name.value,
        Hotel_Address: address.value,
        Hotel_Email: email.value,
        Hotel_Telephone: telephone.value,
        Hotel_Bank_Name: bank_name.value,
        Hotel_Bank_Account_Name: bank_account_name.value,
        Hotel_Bank_Number: bank_number.value,
      };
      // postHotel(currInfo);
      console.log('line 116', currInfo);
      updateHotel(currInfo);
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
