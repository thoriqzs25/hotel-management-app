import { generateFnBInformation } from '../../content/FnBInformation/index.js';
import { generateHotelInformation } from '../../content/HotelInformation/index.js';
import { generateNavigationBar } from '../../nav/index.js';

// HARUS BERURUTAN HTML NYA
function render() {
  generateNavigationBar();

  // LANDING PAGE
  // generateHotelInformation();
  generateFnBInformation();
}

render();
