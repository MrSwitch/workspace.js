// Supports...
import './utils/support/flex';
import './utils/support/legacyflex';
import './utils/support/transform';
import './utils/support/touch';
import './utils/support/browser';

// Events
import emit from './utils/events/emit';
import ready from './utils/events/ready';

// Helpers
import dataSrc from './utils/helper/dataSrc';
import sidemenu from './sidemenu';
import frameset from './frameset';

ready(() => {

	// Find elements denoted as framesets...
	// Append attributes to their chiidren;
	frameset('.frameset');

	// Containers with images can be loaded on demand
	// The container must simply have the className = "data-src"
	// A change in scroll position or visibility triggers the check
	dataSrc('.data-src');

	// Show frames
	// Add events to buttons which can expose the names of the frames.
	// This is good for mobile.
	sidemenu('.frame-nav');

	// Trigger resize
	emit(window, 'resize');
});
