import { generateHotelInformation } from '../HotelInformation/index.js';
import { generateNavigationBar } from '../NavigationBar/index.js';

// HARUS BERURUTAN HTML NYA
function render() {
  generateNavigationBar();

  // LANDING PAGE
  generateHotelInformation();
}

render();
