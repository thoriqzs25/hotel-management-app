import { getHotel } from '../../services/api.js';

const DATA = [
  {
    title: 'Hotel Name',
    item: 'Test',
    id: 'hotel_name',
  },
  {
    title: 'Hotel Address',
    item: 'Test',
    id: 'hotel_address',
  },
  {
    title: 'Hotel Email',
    item: 'Test',
    id: 'hotel_email',
  },
  {
    title: 'Hotel Telephone Number',
    item: 'Test',
    id: 'hotel_telephone_number',
  },
  {
    title: 'Hotel Bank Name',
    item: 'Test',
    id: 'hotel_bank_name',
  },
  {
    title: 'Hotel Bank Acount Name',
    item: 'Test',
    id: 'hotel_bank_account_name',
  },
  {
    title: 'Hotel Bank Number',
    item: 'Test',
    id: 'hotel_bank_number',
  },
];

export async function generateHotelInformation() {
  const contentItem = document.getElementById('content');
  const modalItem = document.getElementById('modal-field');

  const hotelData = await getHotel();
  console.log('line 46', hotelData);

  let hotel = [];

  for (var i in hotelData) hotel.push({ title: i, item: hotelData[i], id: i });

  console.log('line 53', hotel);

  let content = '';
  let modal = '';

  hotel.forEach((res, idx) => {
    console.log('line 58', res);
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
        <input id="${res.id}" placeholder="${res.item}" type="text" class="input_field">
      </div>
    </div>
  `;
    modal += input_field;
  });

  modalItem.innerHTML = modal;
  contentItem.innerHTML = content;

  // MODAL TRIGGER
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    document.getElementById('button').addEventListener('click', function () {
      instances.open;
    });
  });

  // Or with jQuery

  $(document).ready(function () {
    $('.modal').modal();
  });
}