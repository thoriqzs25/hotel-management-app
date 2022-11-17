let DATA = [
    {
        type: 'Regular',
        specification: '2 Single Bed',
        availability: true,
        price: 300000,
        discount: 0.1
    },
    {
        type: 'Regular',
        specification: 'Double bed',
        availability: true,
        price: 350000,
        discount: 0.1
    },
    {
        type: 'Deluxe',
        specification: 'Double bed + Balcony',
        availability: true,
        price: 500000,
        discount: 0.1
    },
    {
        type: 'Superior',
        specification: 'Queen Size Bed + Balcony + Living Room',
        availability: true,
        price: 750000,
        discount: 0.1
    },
    {
        type: 'Suite',
        specification: 'Queen Size Bed + Balcony + Living Room + Kitchen',
        availability: true,
        price: 1000000,
        discount: 0.1
    },
    {
        type: 'Presidental Suite',
        specification: 'King Size bed',
        availability: true,
        price: 1500000,
        discount: 0.1
    },
]

export class RoomInfo{
    static async generateRoomData(){
        const contentItem = document.getElementById('content');

        let content = '';

        DATA.forEach((res, idx) => {
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
                    <p>${res.type}</p>
                </div>
                <div class="card-image" id="fnb-image">
                    <img src="${res.specification}">
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
        contentItem.innerHTML = content;
    }
}