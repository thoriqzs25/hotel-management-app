export class Overview {
  static generateOverview() {
    const DATA = {
      char: 'TH',
      name: 'Thariq Zhafran Satyagraha',
      date: '22 Mei 2022, 03:33:27',
      status: true,
      order: [
        {
          desc: 'Kamar Hotel - Double | 2 Days',
          qty: 2,
          price: 600000,
          discount: 0,
        },
        {
          desc: 'Kamar Hotel - single | 2 Days',
          qty: 2,
          price: 400000,
          discount: 0,
        },
        {
          desc: 'Teh Botol',
          qty: 2,
          price: 10000,
          discount: 0,
        },
        {
          desc: 'Nasi Goreng',
          qty: 2,
          price: 15000,
          discount: 0,
        },
      ],
      total_amount: 2050000,
    };

    const LIST_DATA = [DATA, DATA];

    const TABLE_HEADER = ['No', 'Description', 'Quantity', 'Price', 'Discount', 'Amount'];

    const contentItem = document.getElementById('content');
    const modalButton = document.getElementById('modal-btn');
    modalButton.classList.add('hidden');

    let content = '';

    LIST_DATA.forEach((res, idx) => {
      let tableHeader = '';
      let tableBody = '';
      let tableContent = '';

      TABLE_HEADER.forEach((resC, idx) => {
        const header = `<th style="${idx > 1 ? 'text-align: right' : ''}">${resC}</th>`;
        tableHeader += header;
      });

      res.order.forEach((resC, idx) => {
        const body = `
        <tr>
          <td>${idx + 1}</td>
          <td>${resC.desc}</td>
          <td style="text-align: right">${resC.qty}</td>
          <td style="text-align: right">Rp ${resC.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
          <td style="text-align: right">${resC.discount}%</td>
          <td style="text-align: right">Rp ${resC.price * resC.qty}</td>
        </tr>
        `;

        tableBody += body;
      });

      tableContent = `
      <div id="overview">            
        <div class="header-container">
          <div class="left-header">
            <div class="char-container">
              <p>${res.char}</p>
            </div>
            <div class="title-container">
              <p>${res.name}</p>
              <p>${res.date}</p>
            </div>
          </div>
          ${
            res.status
              ? `
          <div class="right-header">
          <p class="purple-text">FINISHED</p>
          <p>PAYMENT COMPLETED</p>
          </div>
          `
              : `
          <div class="right-header">
          <p class="purple-text">UNFINISHED</p>
          <p>PAYMENT NOT COMPLETED</p>
          </div> 
          `
          }
        </div>
        <div class="body-container">
          <div class="table-container">
            <table>
              <tr>
                ${tableHeader}
              </tr>
              ${tableBody}
            </table>
            </div>
          </div>
          <div class="total-amount">
            <p>TOTAL AMOUNT</p> 
            <p>Rp ${res.total_amount}</p> 
          </div>
        <div class="footer-container">
          <div id="update-payment">
            <p class="waves-effect waves-light btn green button normal-text">Paid</p>
          </div>
          <div id="print-invoice">
            <p class="waves-effect waves-light btn dark button normal-text">Print Invoices</p>
          </div>
        </div>
      </div>
      `;

      content += tableContent;
    });

    contentItem.innerHTML = content;
  }
}
