const DATA = [
  {
    title: 'Hotel Name',
    item: 'Test',
  },
  {
    title: 'Hotel Address',
    item: 'Test',
  },
  {
    title: 'Hotel Email',
    item: 'Test',
  },
  {
    title: 'Hotel Telephone Number',
    item: 'Test',
  },
  {
    title: 'Hotel Bank Name',
    item: 'Test',
  },
  {
    title: 'Hotel Bank Acount Name',
    item: 'Test',
  },
  {
    title: 'Hotel Bank Number',
    item: 'Test',
  },
];

export function generateHotelInformation() {
  const contentItem = document.getElementById('content');
  const modalItem = document.getElementById('modal-field');

  DATA.forEach((res, idx) => {
    const content = `
      <div id="hotel_information">
        <p id="title">${res.title}</p>
        <div class="text_field z-depth-1">
          <p>${res.item}</p>
        </div>
      </div>
    `;

    contentItem.innerHTML += content;
    modalItem.innerHTML += content;
  });

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
