import { generateHotelInformation } from '../HotelInformation/index.js';

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

export function generateNavigationBar() {
  const nav = document.getElementById('nav');
  // const activeNav = document.getElementsByClassName('active');
  // console.log('line 19', activeNav);
  let realId = 0;

  DATA.forEach((res, idx) => {
    let subItem = '';
    res.item.forEach((item, idx) => {
      realId++;
      subItem += `
      <div class="nav_item" id="nav_${realId}">
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

  console.log('line 49', numOfNav);
  for (let i = 1; i <= numOfNav; i++) {
    console.log();
    setToClickable(i);
  }
}

function setToClickable(id) {
  document.getElementById(`nav_${id}`).addEventListener('click', function () {
    console.log('line 47', 'nav_' + id);
    activate(id);
  });
}

function activate(id) {
  deactivateAll();
  const nav = document.getElementById(`nav_${id}`);
  const contentItem = document.getElementById('content');
  nav.classList.add('active');
  contentItem.innerHTML = '';
  if (id == 1) {
    console.log('were in line 60');
    generateHotelInformation();
  } else if (id == 4) {
    console.log('line 73');
    window.nav.app('authAppRedirect');
  }
}

function deactivateAll() {
  for (let i = 1; i <= numOfNav; i++) {
    const nav = document.getElementById(`nav_${i}`);
    nav.classList.remove('active');
  }
}
