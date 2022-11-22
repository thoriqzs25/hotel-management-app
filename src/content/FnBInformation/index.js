const DATA = [
    {
      title: 'Ayam Goreng',
      availability: true,
      price: 12000,
      discount: 0,
      image: "../../public/images/1.jpg",
    },
    {
      title: 'Rendang Sapi',
      availability: true,
      price: 12000,
      discount: 10000,
      image: "../../public/images/2.jpg",
    },
    {
      title: 'Nasi Goreng',
      availability: true,
      price: 20000,
      discount: 10000,
      image: "../../public/images/3.jpg",
    },
    {
      title: 'Magelangan Rendang',
      availability: false,
      price: 12000,
      discount: 0,
      image: "../../public/images/4.jpg",
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

        let discount = "&nbsp"
        let lineThrough = ""
        if (res.discount > 0) {
            discount = "Rp " + res.discount
            lineThrough = "line-through"
        }

        let btnstatus = ""
        if (res.availability == false) {
            btnstatus = "disabled"
        } 

        const field = `
            <div class="card" id="fnb-information">
                <div class="fnb-name">
                    <p>${res.title}</p>
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

    let container = `<div class="grid-container">${content}</div>`

    contentItem.innerHTML = container;
}


{/* <div class="card-reveal">
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div> */}