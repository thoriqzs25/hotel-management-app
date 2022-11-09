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
  let realId = -1;

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

  for (let i = 0; i < 5; i++) {
    navigate(i);
  }
}

function navigate(id) {
  document.getElementById(`nav_${id}`).addEventListener('click', function () {
    activate(id);
    console.log('line 47', 'nav_' + id);
  });
}

function activate(id) {
  deactivateAll();
  const nav = document.getElementById(`nav_${id}`);
  nav.classList.add('active');
}

function deactivateAll() {
  for (let i = 0; i < 5; i++) {
    const nav = document.getElementById(`nav_${i}`);
    nav.classList.remove('active');
  }
}
