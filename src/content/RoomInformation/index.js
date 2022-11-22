let DATA = [
    {
        char: 'A',
        type: 'Regular',
        capacity: '2 person',
        specification: '2 Single Bed',
        availability: true,
        price: 300000,
        discount: 0.1
    },
    {
        char: 'B',
        type: 'Regular',
        capacity: '2 person',
        specification: 'Double bed',
        availability: true,
        price: 350.000,
        discount: 0.1
    },
    {
        char: 'C',
        type: 'Deluxe',
        capacity: '2 person',
        specification: 'Double bed + Balcony',
        availability: true,
        price: 500000,
        discount: 0.1
    },
    {
        char: 'D',
        type: 'Superior',
        capacity: '2 person',
        specification: 'Queen Size Bed + Balcony + Living Room',
        availability: true,
        price: 750000,
        discount: 0.1
    },
    {
        char: 'E',
        type: 'Suite',
        capacity: '4 person',
        specification: '2 Queen Size Bed + Balcony + Living Room + Kitchen',
        availability: true,
        price: 1000000,
        discount: 0.1
    },
    {
        char: 'F',
        type: 'Presidental Suite',
        capacity: '4 person',
        specification: '2 King Size bed + Balcony + Living Room + Kitchen',
        availability: true,
        price: 1500000,
        discount: 0.1
    },
]

export class RoomInfo{
    static async generateRoomData(){
        const contentItem = document.getElementById('content');
        contentItem.classList.add("grid-container")

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
            <div class="card" id="rooms-information">
                <div class="title-content">
                    <div class="char-container">
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
                <div class="card-image" id="rooms-image">
                    <img src="${res.specification}">
                </div>
                <div class="card-content">
                    <div class="price-container">
                        <p class="${lineThrough}">Rp${res.price}</p>
                        <p class="discount">${discount}</p>
                    </div>
                    <div class="rooms-specification">
                        <p>${res.specification}</p>
                    </div>
                </div>
                <div class="card-bottom">
                        <p class="${availability}">${availability}</p>
                        <a class="btn modal-trigger button purple normal-text ${btnstatus}" id="book-button" href="#">Book</a>
                </div>
            </div>
        `;
        content += field;
            
        });
        contentItem.innerHTML = content;
    }
}