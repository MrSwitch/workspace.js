// Standardizes touch events
// Calculate the difference from the starting position and the end position.
// Returns a gesture object given

import on from './on';
import each from '../dom/each';

//
// Touch
// @param callback function - Every touch event fired
// @param complete function- Once all touch event ends
//
export default function touch(elements, callback, start, complete) {

	// loop through and add events
	each(elements, (element) => {

		// Store callbacks, and previous pointer position
		var cb = {}, mv = {}, fin = {};

		on(document, 'mousemove MSPointerMove touchmove', (e) => {

			// Fix Android not firing multiple moves
			if (e.type.match(/touch/i)) {
//				e.preventDefault();
			}

			// Mousebutton down?
			if (e.type.match(/mouse/i) && e.which !== 1) {
				// The mouse buttons isn't pressed, kill this
				return;
			}

			// trigger the call
			var i = e.pointerId || 0,
				func = cb[i],
				o = mv[i];

			// Extend the Event Object with 'gestures'
			gesture(e, o);

			// Trigger callback
			if (func && typeof(func) === 'function') {
				func.call(this, e, o);
			}

			mv[i] = e;
		});

		on(document, 'mouseup MSPointerUp touchend touchcancel', (e) => {

//			e.preventDefault();

			var i = e.pointerId || 0;
			cb[i] = null;

			if (e.type === "touchend" || e.type === "touchcancel") {
				e = mv[i];
			}

			let func = fin[i];
			if (func) {
				func.call(this,e);
			}

			fin[i] = null;
		});

		// bind events
		on(element, 'touchend', (e) => {
			console.log("el:touchend");
			console.log(e);
		});

		on(element, "selectstart", (e) => {return false;} );

		on(element, 'mousedown MSPointerDown touchstart', (e) => {

			// prevent default
			//e.preventDefault();

			// Cancel the mousemove if the msMousePointer is enabled
			if(e.type === 'mousemove' && "msPointerEnabled" in window.navigator) {
				return;
			}

			// default pointer ID
			var i = e.pointerId = (e.pointerId || 0);

			// If touch, choose the first element.
			// For multiple we may need to pass in a flag to this function
			if (e.touches && e.touches.length) {
				var ts = e.timeStamp;
				e = e.touches[0];
				e.timeStamp = ts;
			}

			// Add Gestures to event Object
			gesture(e);

			mv[i] = e;
			cb[i] = function(_e, o) {
				// Add Gestures to event Object
				gesture(_e, e);

				// fire callback
				callback.call(element, _e, o, e);
			};
			fin[i] = function(_e) {

				if (complete) {
					// Add Gestures to event Object
					gesture(_e, e);

					// fire complete callback
					complete.call(element, _e, e);
				}
			};

			// trigger start
			if (start) {
				start.call(element, e);
			}
		});
	});
};


function gesture(e, o) {

	// Response Object
	e.gesture = {};

	if (e && e.touches && e.touches.length > 0) {
		e.gesture.touches = e.touches;
	}
	else {
		e.gesture.touches = [e];
	}

	e.gesture.screenX = e.gesture.touches[0].screenX;
	e.gesture.screenY = e.gesture.touches[0].screenY;


	// If the second parameter isn't defined then we're unable to define getures
	// But if it is then whoop, lets go.
	if (o) {
		e.gesture.deltaTime = (e.timeStamp - o.timeStamp);

		var dx = e.gesture.deltaX = e.gesture.screenX - o.gesture.screenX;
		var dy = e.gesture.deltaY = e.gesture.screenY - o.gesture.screenY;

		// Which is the best direction for the gesture?
		if (Math.abs(dy) > Math.abs(dx)) {
			e.gesture.direction = (dy > 0 ? 'up' : 'down');
		}
		else {
			e.gesture.direction = (dx > 0 ? 'right' : 'left');
		}

		// Distance
		e.gesture.distance = Math.sqrt((dx * dx) + (dy * dy));

		// Velocity
		e.gesture.velocity = e.gesture.distance / e.gesture.deltaTime;
	}
}
