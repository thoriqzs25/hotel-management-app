import { getHotel } from '../../services/api.js';

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

  for (var i in hotelData) hotel.push({ title: i.replace('_', ' '), item: hotelData[i], id: i });

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

    document.getElementById('button').addEventListener('click', function () {
      instances.open;
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
