import {
  // generateHotelInformation,
  Hotel,
} from '../../content/HotelInformation/index.js';
import {
  // generateNavigationBar,
  Nav,
} from '../../nav/index.js';

// HARUS BERURUTAN HTML NYA
// function render() {
Nav.generateNavigationBar();

// LANDING PAGE
Hotel.generateHotelInformation();
// }

// render();
