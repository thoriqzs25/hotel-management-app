import { generateHotelInformation } from '../HotelInformation/index.js';
import { generateNavigationBar } from '../NavigationBar/index.js';

// HARUS BERURUTAN HTML NYA
function render() {
  generateNavigationBar();
  const nav = document.getElementById('nav_0');
  nav.classList.add('active');
  generateHotelInformation();
}

render();
