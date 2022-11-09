// import { generateHotelInformation } from '../HotelInformation/index.js';

const DATA = [
  {
    title: 'Order',
    item: ['Overview', 'Test'],
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

export function generateNavigationBar() {
  const nav = document.getElementById('nav');

  DATA.forEach((res, idx) => {
    let subItem = '';
    res.item.forEach((item, idx) => {
      subItem += `
      <div class="nav_item">
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
}
