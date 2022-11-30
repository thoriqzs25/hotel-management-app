import { FnbAPI } from '../../services/fnbApi.js';

const ROOM_IMAGE_FOLDER = '../../../express/img/fnb/';
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
            <a class="clickable modal-trigger" id="edit-modal" style="padding-left: 12px" href="#modal1">Edit</a>
            <div class="clickable" id="delete-${res.id}" style="color: red; padding-left: 12px">Delete</div>
          </div>
          <div class="card-image" id="fnb-image">
            <img src="${ROOM_IMAGE_FOLDER + res.image}">
          </div>
          <div class="card-content">
            <div class="price-container">
              <p class="${res.discount > 0 ? 'line-through' : ''} line-through">Rp ${res.price}</p>
              <p>Rp ${(res.price * (1 - res.discount)).toFixed(2)}</p>
            </div>
          </div>
          <div class="card-bottom">
            <p class="${availability}">${availability}</p>
            <a class="btn modal-trigger button purple normal-text ${btnstatus}" id="add-button" href="#modal1">Add</a>
          </div>
        </div>
        `;
      content += field;
    });

    let cards = `<div class="grid-container" id="fnb-content">${content}</div>`;

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
      <div class="field">
        <p>Gambar</p>
        <div class="text_field z-depth-1">
            <input id="image" placeholder="0.5" type="file" class="input_field" >
        </div>
      </div>
    `;
    modalItem.innerHTML = modal;
    contentItem.innerHTML = cards;

    this.initModal();

    let id;
    let fnbContent = document.getElementById('fnb-content');

    fnbContent.addEventListener('click', async (e) => {
      if (e.target.classList.value == 'dot-button') {
        id = e.target.getAttribute('dropdown');
        const dropdown = document.getElementById('dropdown-' + id);
        dropdown.style.display = 'block';
      }
      if (e.target.classList.value != 'dropdown' && e.target.classList.value != 'dot-button') {
        const dropdown = document.getElementById('dropdown-' + id);
        dropdown.style.display = 'none';
      }
      if (e.target.id.includes('delete')) {
        FnbAPI.deleteFnb({ id: id });
        this.generateFnBInformation();
      }
      if (e.target.id.includes('edit-modal')) {
        const fnbD = await FnbAPI.getById(id);
        this.updateFnbData(fnbD);
      }
    });
  }

  static async createFnbData(id) {
    const name = document.getElementById('name');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const image = document.getElementById('image');

    let payload = {
      id: id ?? '',
      name: name.value ?? '',
      availability: 1,
      price: price.value ?? 0,
      discount: discount.value ?? 0,
      image: image.files[0] ? image.files[0] : 'no-changes',
    };

    console.log('payload line 146', payload);

    let formData = new FormData();

    for (var key in payload) {
      formData.append(key, payload[key]);
    }

    console.log('will try line 154 id', payload.id);
    if (payload.id) await FnbAPI.updateFnb(formData);
    else FnbAPI.postFnb(formData);

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

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    document.getElementById('confirm-btn').replaceWith(document.getElementById('confirm-btn').cloneNode(true));

    document.getElementById('modal-btn').addEventListener('click', function () {
      instances.open;
    });

    document.getElementById('edit-modal').addEventListener('click', function () {
      instances.open;
    });

    document.getElementById('confirm-btn').addEventListener('click', async function () {
      const item = document.getElementById('name');
      if (item) {
        console.log('line 186 item', item);
        const idx = item.getAttribute('dataindex');
        FnBInfo.createFnbData(idx);
      } else FnBInfo.createFnbData();
    });
  }

  static updateFnbData(data) {
    let item = data[0];
    const modalItem = document.getElementById('modal-field');
    const modalButtonName = document.getElementById('modal-btn');
    const modalTitle = document.getElementById('modal-title');

    modalButtonName.innerHTML = 'Edit FnB';
    modalTitle.innerHTML = 'Edit FnB';
    // modalItem.innerHTML = '';

    let modal = `
      <div class="field">
        <p>Nama</p>
        <div class="text_field z-depth-1">
          <input dataindex=${item.id} id="name" placeholder="Ayam Betutulan" type="text" class="input_field" value="${
      item.name ? item.name : ''
    }">
        </div>
      </div>
      <div class="field">
        <p>Harga</p>
        <div class="text_field z-depth-1">
          <input id="price" placeholder="240000" type="text" class="input_field" value="${
            item.price ? item.price : ''
          }">
        </div>
      </div>
      <div class="field">
        <p>Diskon</p>
        <div class="text_field z-depth-1">
          <input id="discount" placeholder="0.44" type="text" class="input_field" value="${
            item.discount ? item.discount : ''
          }">
        </div>
      </div>
      <div class="field">
        <p>Gambar</p>
        <div class="text_field z-depth-1">
            <input id="image" type="file" class="input_field">
        </div>
      </div>
    `;
    modalItem.innerHTML = modal;
  }
}
