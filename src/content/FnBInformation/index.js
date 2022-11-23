import { FnbAPI } from '../../services/fnbApi.js';

let DATA;

export class FnBInfo {
  static async generateFnBInformation() {
    const contentItem = document.getElementById('content');
    const modalItem = document.getElementById('modal-field');
    const modalButtonName = document.getElementById('modal-btn');
    const modalTitle = document.getElementById('modal-title');

    contentItem.innerHTML = '';
    modalButtonName.innerHTML = 'Add FnB';
    modalTitle.innerHTML = 'Add FnB';

    const fnbData = await FnbAPI.getFnb();

    if (fnbData) {
      DATA = fnbData;
    }

    let content = '';

    DATA.forEach((res, idx) => {
      let availability = 'Available';
      if (res.availability == false) {
        availability = 'Not Available';
      }

      let discount = '&nbsp';
      let lineThrough = '';
      if (res.discount > 0) {
        discount = 'Rp ' + res.discount;
        lineThrough = 'line-through';
      }

      let btnstatus = '';
      if (res.availability == false) {
        btnstatus = 'disabled';
      }

      const field = `
        <div class="card" id="fnb-information">
          <div class="fnb-name">
            <p class="name">${res.name}</p>
            <div class="dot-button" dropdown="${res.id}">
                <div class="dot">

                </div>
            </div>
          </div>
          <div class="dropdown" id="dropdown-${res.id}">
            <div class="clickable" id="edit-${res.id}">Edit</div>
            <div class="clickable" id="delete-${res.id}" style="color: red;">Delete</div>
          </div>
          <div class="card-image" id="fnb-image">
            <img src="${res.image}">
          </div>
          <div class="card-content">
            <div class="price-container">
              <p class="${lineThrough}">Rp ${res.price}</p>
              <p>${discount}</p>
            </div>
          </div>
          <div class="card-bottom">
            <p class="${availability}">${availability}</p>
            <a class="btn modal-trigger button purple normal-text ${btnstatus}" id="add-button" href="#">Add</a>
          </div>
        </div>
        `;
      content += field;
    });

    let container = `<div class="grid-container">${content}</div>`;

    let modal = '';

    modal = `
      <div class="field">
        <p>Nama</p>
        <div class="text_field z-depth-1">
          <input id="name" placeholder="Ayam Betutulan" type="text" class="input_field" value="">
        </div>
      </div>
      <div class="field">
        <p>Harga</p>
        <div class="text_field z-depth-1">
          <input id="price" placeholder="240000" type="text" class="input_field" value="">
        </div>
      </div>
      <div class="field">
        <p>Diskon</p>
        <div class="text_field z-depth-1">
          <input id="discount" placeholder="0.44" type="text" class="input_field" value="">
        </div>
      </div>
    `;

    modalItem.innerHTML = modal;

    contentItem.innerHTML = container;

    this.initModal();

    let id;
    document.addEventListener('click', (e) => {
      console.log('click anything line 220', e.target);
      if (e.target.classList.value == 'dot-button') {
        console.log('line 109 udah masuk dan muncul edit delete');
        id = e.target.getAttribute('dropdown');
        const dropdown = document.getElementById('dropdown-' + id);
        dropdown.style.display = 'block';
      }
      if (e.target.classList.value != 'dropdown' && e.target.classList.value != 'dot-button') {
        const dropdown = document.getElementById('dropdown-' + id);
        dropdown.style.display = 'none';
      }
      if (e.target.id.includes('delete-')) {
        console.log('deletin line 231', id);
        FnbAPI.deleteFnb({ id: id });
        this.generateFnBInformation();
      }
    });
  }

  static async createFnbData() {
    const name = document.getElementById('name');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');

    let payload = {
      name: name.value,
      availability: 1,
      price: price.value,
      discount: discount.value,
    };

    console.log('paylaod fnb line 132', payload);
    await FnbAPI.postFnb(payload);
    this.generateFnBInformation();
  }

  static initModal() {
    if (document.readyState !== 'loading') {
      console.log('App Ready >> Assigning modal event listener');
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        console.log('App not Ready >> Assigning DOM Content Loader Listener >> assigning modal event listeners');
      });
    }

    document.getElementById('confirm-btn').replaceWith(document.getElementById('confirm-btn').cloneNode(true));

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    document.getElementById('modal-btn').addEventListener('click', function () {
      console.log('tes line 150');
      instances.open;
    });

    document.getElementById('confirm-btn').addEventListener('click', async function () {
      console.log('line 159 confirm');
      FnBInfo.createFnbData();
    });
  }
}
