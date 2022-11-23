import { FnBInfo } from '../content/FnBInformation/index.js';
import { Hotel } from '../content/HotelInformation/index.js';
import { Overview } from '../content/Overview/index.js';
import { RoomInfo } from '../content/RoomInformation/index.js';

const DATA = [
  {
    title: 'Order',
    item: ['Overview'],
  },
  {
    title: 'Services',
    item: ['Hotel Rooms', 'Food & Beverages'],
  },
  {
    title: 'Information',
    item: ['Hotel'],
  },
];

let numOfNav;

export class Nav {
  static generateNavigationBar() {
    const nav = document.getElementById('nav');
    let realId = 0;

    DATA.forEach((res, idx) => {
      let subItem = '';
      res.item.forEach((item, idx) => {
        realId++;
        subItem += `
        <div class="nav_item ${realId == 1 ? 'active' : ''}" id="nav_${realId}">
          <i class="tiny material-icons">lens</i>
          <p>${item}</p>
        </div> 
        `;
      });

      const content = `
      <p class="nav_title">${res.title}</p>
      ${subItem}
      <div class="spacer"><div>
      `;

      nav.innerHTML += content;
    });

    numOfNav = realId;

    for (let i = 1; i <= numOfNav; i++) {
      this.setToClickable(i);
    }
  }

  static setToClickable(id) {
    document.getElementById(`nav_${id}`).addEventListener('click', function () {
      Nav.activate(id);
    });
  }

  static activate(id) {
    this.deactivateAll();
    const nav = document.getElementById(`nav_${id}`);
    const contentItem = document.getElementById('content');
    const modalButton = document.getElementById('modal-btn');

    // Reset all thing to default nav
    contentItem.classList.remove('grid-container');
    nav.classList.add('active');
    contentItem.innerHTML = '';
    modalButton.classList.remove('hidden');

    // Remove all modal click listener
    var old_element = document.getElementById('modal-btn');
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    if (id == 1) {
      Overview.generateOverview();
    } else if (id == 2) {
      RoomInfo.generateRoomData();
    } else if (id == 3) {
      FnBInfo.generateFnBInformation();
    } else if (id == 4) {
      Hotel.generateHotelInformation();
    }
  }

  static deactivateAll() {
    for (let i = 1; i <= numOfNav; i++) {
      const nav = document.getElementById(`nav_${i}`);
      nav.classList.remove('active');
    }
  }

  static generateHeader() {
    let DATA = {
      leftIcon: 'menu',
      title: 'Update Hotel Information',
      rightIcon: 'account_circle',
    };

    const contentDetail = document.getElementById('content-detail');

    const detail = `
    <i class="small material-icons clickable" id="left-icon">${DATA.leftIcon}</i>
    <p>${DATA.title}</p>
    <i class="small material-icons clickable" id="right-icon">${DATA.rightIcon}</i>
    `;

    contentDetail.innerHTML = detail;

    const leftIcon = document.getElementById('left-icon');
    const rightIcon = document.getElementById('right-icon');

    leftIcon.addEventListener('click', function () {});

    rightIcon.addEventListener('click', function () {
      window.nav.app('authAppRedirect');
    });
  }
}
