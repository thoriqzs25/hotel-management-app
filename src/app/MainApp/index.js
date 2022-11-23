import { Overview } from '../../content/Overview/index.js';
import { Nav } from '../../nav/index.js';

// HARUS BERURUTAN HTML NYA
Nav.generateNavigationBar();
Nav.generateHeader();

// LANDING PAGE
Overview.generateOverview();
