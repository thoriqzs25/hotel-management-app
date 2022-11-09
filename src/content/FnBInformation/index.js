const DATA = [
    {
      title: 'Ayam Goreng',
      availability: true,
      price: 12000,
      discount: 10000,
    },
    {
      title: 'Rendang Sapi',
      availability: true,
      price: 12000,
      discount: 10000,
    },
    {
      title: 'Nasi Goreng',
      availability: true,
      price: 12000,
      discount: 10000,
    },
    {
      title: 'Magelangan Rendang',
      availability: false,
      price: 12000,
      discount: 0,
    },
    
  ];

export function generateFnBInformation() {
    const contentItem = document.getElementById('content');
  
    let content = '';
    
    DATA.forEach((res,idx) => {
        let availability = "Available"
        if (res.availability == false) {
            availability = "Not Available"
        }

        let discount = ""
        let lineThrough = ""
        if (res.discount > 0) {
            discount = res.discount
            lineThrough = "line-through"
        }

        const field = `
            <div class="card" id="fnb-information">
                <div class="fnb-name">
                    <p>${res.title}</p>
                </div>
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="images/office.jpg">
                </div>
                <div class="card-content">
                    <div class="price-container">
                        <p class="${lineThrough}">${res.price}</p>
                        <p>${discount}</p>
                    </div>
                    <p class="${availability}">${availability}</p>
                </div>
            </div>
        `;
        content += field;
    });

    let container = `<div class="grid-container">${content}</div>`

    contentItem.innerHTML = container;
}


{/* <div class="card-reveal">
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div> */}