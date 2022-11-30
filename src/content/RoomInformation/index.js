import { RoomAPI } from '../../services/roomApi.js';

const ROOM_IMAGE_FOLDER = '../../../express/img/room/';
let DATA = [
  {
    char: 'A',
    type: 'Regular',
    capacity: '2 person',
    specification: '2 Single Bed',
    availability: true,
    price: 300000,
    discount: 0.1,
  },
  {
    char: 'B',
    type: 'Regular',
    capacity: '2 person',
    specification: 'Double bed',
    availability: true,
    price: 350000,
    discount: 0.1,
  },
  {
    char: 'C',
    type: 'Deluxe',
    capacity: '2 person',
    specification: 'Double bed + Balcony',
    availability: true,
    price: 500000,
    discount: 0.1,
  },
  {
    char: 'D',
    type: 'Superior',
    capacity: '2 person',
    specification: 'Queen Size Bed + Balcony + Living Room',
    availability: true,
    price: 750000,
    discount: 0.1,
  },
  {
    char: 'E',
    type: 'Suite',
    capacity: '4 person',
    specification: '2 Queen Size Bed + Balcony + Living Room + Kitchen',
    availability: true,
    price: 1000000,
    discount: 0.1,
  },
  {
    char: 'F',
    type: 'Presidental Suite',
    capacity: '4 person',
    specification: '2 King Size bed + Balcony + Living Room + Kitchen',
    availability: true,
    price: 1500000,
    discount: 0.1,
  },
];

export class RoomInfo {
  static async generateRoomData() {
    const contentItem = document.getElementById('content');
    const modalItem = document.getElementById('modal-field');
    const modalButtonName = document.getElementById('modal-btn');
    const modalTitle = document.getElementById('modal-title');

    contentItem.innerHTML = '';
    modalButtonName.innerHTML = 'Add Room';
    modalTitle.innerHTML = 'Add Room';

    const roomdata = await RoomAPI.getRoom();

    if (roomdata) {
      DATA = roomdata;
    }

    let content = '';

    DATA.forEach((res, idx) => {
      let availability = 'Available';
      if (res.availability == false) {
        availability = 'Not Available';
      }
      let lineThrough = '';
      if (res.discount > 0) {
        lineThrough = 'line-through';
      }

      let btnstatus = '';
      if (res.availability == false) {
        btnstatus = 'disabled';
      }
      const field = `
        <div class="card" id="rooms-information">
          <div class="title-content">
            <div style="display: flex;">
              <div class="char-container" id="test-delete-button">
                <p  class="charname">${res.char}</p>
              </div>
              <div class="title-container">
                <div class="rooms-name">
                  <p>${res.type}</p>
                </div>
                <div class="rooms-capacity">
                  <p>${res.capacity}</p>
                </div>
              </div>
            </div>
            <div class="dot-button" dropdown="${res.id}">
              <div class="dot">

              </div>
            </div>
          </div>
          <div class="dropdown" id="dropdown-${res.id}">
            <a class="clickable modal-trigger" id="edit-modal" style="padding-left: 12px" href="#modal1">Edit</a>
            <div class="clickable" id="delete-${res.id}" style="color: red; padding-left: 12px">Delete</div>
          </div>
          <div class="card-image" id="rooms-image">
            <img src="${ROOM_IMAGE_FOLDER + res.image}">
          </div>
          <div class="card-content">
            <div class="price-container">
              <p class="${lineThrough}">Rp ${res.price}</p>
              <p class="discount">Rp ${(res.price * (1 - res.discount)).toFixed(2)}</p>
            </div>
            <div class="rooms-specification">
              <p>${res.specification}</p>
            </div>
          </div>
          <div class="card-bottom">
            <p class="${availability}">${availability}</p>
            <a class="btn modal-trigger button purple normal-text ${btnstatus}" id="modal-btn" href="#modal1">Book</a>
          </div>
        </div>
        `;
      content += field;
    });

    const cards = `
            <div class="grid-container" id="rooms-content">
                ${content}
            </div>
        `;

    let modal = '';

    modal = `
            <div class="field">
              <p>ID Kamar</p>
              <div class="text_field z-depth-1">
                <input id="char" placeholder="A/B/C/D/AA/AZ" type="text" class="input_field" value="">
              </div>
            </div>
            <div class="field">
              <p>Tipe</p>
              <div class="text_field z-depth-1">
                <input id="type" placeholder="Single/Duluxe" type="text" class="input_field" value="">
              </div>
            </div>
            <div class="field">
              <p>Kapasitas</p>
              <div class="text_field z-depth-1">
                <input id="capacity" placeholder="4 Orang" type="text" class="input_field" value="">
              </div>
            </div>
            <div class="field">
              <p>Spesifikasi</p>
              <div class="text_field z-depth-1">
                <input id="specification" placeholder="Twin Bed" type="text" class="input_field" value="">
              </div>
            </div>
            <div class="field">
              <p>Harga</p>
              <div class="text_field z-depth-1">
                <input id="price" placeholder="405000" type="text" class="input_field" value="">
              </div>
            </div>
            <div class="field">
              <p>Diskon</p>
              <div class="text_field z-depth-1">
                <input id="discount" placeholder="0.5" type="text" class="input_field" value="">
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
    let roomsContent = document.getElementById('rooms-content');

    roomsContent.addEventListener('click', async (e) => {
      if (e.target.classList.value == 'dot-button') {
        id = e.target.getAttribute('dropdown');
        console.log('line 207 ID', id);
        const dropdown = document.getElementById('dropdown-' + id);
        dropdown.style.display = 'block';
      }
      if (e.target.classList.value != 'dropdown' && e.target.classList.value != 'dot-button') {
        const dropdown = document.getElementById('dropdown-' + id);
        dropdown.style.display = 'none';
      }
      if (e.target.id.includes('delete')) {
        RoomAPI.deleteRoom({ id: id });
        this.generateRoomData();
      }
      if (e.target.id.includes('edit-modal')) {
        const roomD = await RoomAPI.getById(id);
        this.updateRoomData(roomD);
      }
    });
  }

  static async createRoomData(id) {
    const char = document.getElementById('char');
    const type = document.getElementById('type');
    const capacity = document.getElementById('capacity');
    const specification = document.getElementById('specification');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const image = document.getElementById('image');

    let payload = {
      id: id ?? '',
      char: char.value ?? '',
      type: type.value ?? '',
      capacity: capacity.value ?? '',
      specification: specification.value ?? '',
      availability: 1,
      price: price.value ?? 0,
      discount: discount.value ?? 0,
      image: image.files[0] ? image.files[0] : 'no-changes',
    };

    console.log('PAYLOAD BEFORE BE line 245', payload);

    let formData = new FormData();

    for (var key in payload) {
      console.log(key, '==>>', payload[key]);
      formData.append(key, payload[key]);
    }

    if (payload.id) await RoomAPI.updateRoom(formData);
    else RoomAPI.postRoom(formData);
    this.generateRoomData();
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
      const item = document.getElementById('char');
      console.log('line 280 ITEM', item);
      if (item) {
        const idx = item.getAttribute('dataindex');
        RoomInfo.createRoomData(idx);
      } else RoomInfo.createRoomData();
    });
  }

  static updateRoomData(data) {
    console.log('line 228 DATA', data);
    let item = data[0];
    const modalItem = document.getElementById('modal-field');
    const modalButtonName = document.getElementById('modal-btn');
    const modalTitle = document.getElementById('modal-title');

    modalButtonName.innerHTML = 'Edit Room';
    modalTitle.innerHTML = 'Edit Room';

    let modal = `
            <div class="field">
              <p>ID Kamar</p>
              <div class="text_field z-depth-1">
                <input dataindex=${
                  item.id
                } id="char" placeholder="A/B/C/D/AA/AZ" type="text" class="input_field" value="${
      item.char ? item.char : ''
    }">
              </div>
            </div>
            <div class="field">
              <p>Tipe</p>
              <div class="text_field z-depth-1">
                <input id="type" placeholder="Single/Duluxe" type="text" class="input_field" value="${
                  item.type ? item.type : ''
                }">
              </div>
            </div>
            <div class="field">
              <p>Kapasitas</p>
              <div class="text_field z-depth-1">
                <input id="capacity" placeholder="4 Orang" type="text" class="input_field" value="${
                  item.capacity ? item.capacity : ''
                }">
              </div>
            </div>
            <div class="field">
              <p>Spesifikasi</p>
              <div class="text_field z-depth-1">
                <input id="specification" placeholder="Twin Bed" type="text" class="input_field" value="${
                  item.specification ? item.specification : ''
                }">
              </div>
            </div>
            <div class="field">
              <p>Harga</p>
              <div class="text_field z-depth-1">
                <input id="price" placeholder="405000" type="text" class="input_field" value="${
                  item.price ? item.price : ''
                }">
              </div>
            </div>
            <div class="field">
              <p>Diskon</p>
              <div class="text_field z-depth-1">
                <input id="discount" placeholder="0.5" type="text" class="input_field" value="${
                  item.discount ? item.discount : ''
                }">
              </div>
            </div>
            <div class="field">
              <p>Gambar</p>
              <div class="text_field z-depth-1">
                  <input id="image" type="file" class="input_field" >
              </div>
            </div>
          `;

    modalItem.innerHTML = modal;
  }
}
