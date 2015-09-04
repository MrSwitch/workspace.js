// Frameset
// Make child elements flexible frame like

// Supports...
import flex from './utils/support/flex';
import './utils/support/legacyflex';
import './utils/support/transform';
import supportsTouch from './utils/support/touch';

// Events
import emit from './utils/events/emit';
import on from './utils/events/on';
import delegate from './utils/events/delegate';
import ready from './utils/events/ready';
import swipe from './utils/events/swipe';
import touch from './utils/events/touch';

// DOM
import transform from './utils/dom/transform';
import documentElement from './utils/dom/documentElement';
import createElement from './utils/dom/createElement';
import parents from './utils/dom/parents';
import attr from './utils/dom/attr';
import index from './utils/dom/index';
import each from './utils/dom/each';
import query from './utils/dom/query';
import filter from './utils/dom/filter';
import find from './utils/dom/find';
import css from './utils/dom/css';
import cssCalc from './utils/dom/cssCalc';

import addClass from './utils/dom/addClass';
import toggleClass from './utils/dom/toggleClass';
import removeClass from './utils/dom/removeClass';
import hasClass from './utils/dom/hasClass';


var MOBILE_WIDTH = 650;

//
// Check if the view is in mobile mode.
// mobile() looks at window width to determine the mobile mode, essentially its just small screen
function mobile() {
	return (documentElement.offsetWidth < MOBILE_WIDTH);
}


// Add internal controls
delegate('.frames .workspace-back', 'click', (e) => {
	var frame = parents(e.target, '.frame');
	if (frame) {
		prev = frame.previousElementSibling;
		if (prev) {
			emit(prev, 'active');
		}
	}
});


// Add Gestures
// To swipe between frames
on(window, 'resize', () => {

	// Get the number of frames in the frameset
	each(".frameset", (frameset) => {

		let frames = frameset.querySelectorAll(".frame");

		let frameWidth = '';
		let setWidth = '';

		if (!mobile()) {
			// reset frame
			transform(frameset, 'translateX', '');
		}
		else {
			frameWidth = frameset.parentNode.offsetWidth;
			setWidth = frames.length * frameWidth;

			setWidth += 'px';
			frameWidth += 'px';
		}

		css(frameset, {
			width: setWidth
		});

		css(frames, {
			width: frameWidth
		});

		// Re-assert the active frame
		let selected = query(".frame.active", frameset);

		// Activate frame to clean it up.
		emit(selected, 'active');
	});
});


ready(() => {
	on(document.body, 'keydown', (e) => {
		var el;
		switch (e.which) {
			case 37:
				el = query(".frameset .frame.active").previousElementSibling;
			break;
			case 39:
				el = query(".frameset .frame.active").nextElementSibling;
			break;
		}
		if (el) {
			emit(el, 'active');
		}
	});
});


export default function (match) {
	// Find and initiate all framesets
	each(match, initFrameset);
}


function initFrameset(frameset) {

	// Add class
	addClass(frameset, 'frameset');

	// Get the children as frames
	let frames = frameset.children;

	// Define children as ".frame"
	addClass(frames, 'frame');

	// Add "active" status to the first one, or who bares the className 'frame-main'
	var active_frame = find(frames, '.active');

	if (!active_frame) {

		// Find the main frame to mark
		// Default to the initial frame
		active_frame = find(frames, ".frame-main") || frames[0];

		addClass(active_frame, 'active');
	}


	each(frames, (frame) => {
		on(frame, 'active', () => showFrame(frame));
	});


	// Only for non-touch devices do we need the drag controls
	// Add control to a subset of the frames
	let frames_controls = flex ? filter(frames, ":not(.flex)") : frames;

	each(frames_controls, createFrameControls);


	//
	// FillFrame
	//
	on(frameset, 'fillframe', () => {

		// Is the frame
		if (mobile()) {
//				$('.frame',this).width('100%');
			return;
		}

		// for all the nested frames within this
		// we are going to reorganise the widths
		var diff = cssCalc(frameset).width;

		let fill_frames = filter(frames, ':not(.pinned)');

		each(fill_frames, (frame) => {

			// How wide is this element?
			var w = cssCalc(frame).width;
			diff -= w;

			// fix bug in IE, FF when resize, lets fix the widths, to prevent it overriding its container
			setFrameWidth(frame, w);

		});

		each(fill_frames, (frame) => {

			if (diff === 0) {
				return;
			}

			var style = cssCalc(frame);

			var min = parseInt(style.minWidth,10) || 0,
				max = parseInt(style.maxWidth,10) || 0,
				wid = frame.offsetWidth;

			//console.log(diff,wid,min,max);

			if ((wid + diff) < min) {
				//console.log(diff,wid,'min');
				diff += (wid - min);
				wid = min;
			}
			else if ((wid + diff) > max && max > 0) {
				//console.log(diff,wid,'max');
				diff -= (wid - max);
				wid = max;
			}
			else {
				wid += diff;
				diff = 0;
			}

			setFrameWidth(frame, wid);
		});
	});


	// Add Swipe'y touch events
	swipe(frameset.parentNode, (e) => {

		if (!mobile()) {
			return;
		}

		var a = find(frames, '.active');
		var W = frameset.parentNode.offsetWidth;
		var n = frames.length;

		var i = index(a);
		var b = a;

		switch(e.gesture.type) {
			case "dragleft":
			case "dragright":

				// Cancel defaults
				e.preventDefault();
				e.stopPropagation();

				// What is the current frame offset (fo)
				var fo = -((100 / n) * i);
				// What is the delta change in X as a percentage of the whole length,
				var dx = ((100 / W) * e.gesture.deltaX) / n;

				// slow down at the first and last pane
				if((i === 0 && e.gesture.direction === 'right') || (i === (n-1) && e.gesture.direction === 'left')) {
					dx *= 0.3;
				}

				transform(frameset, 'translateX', (fo + dx) + "%");

				css(frameset, {
					"WebkitTransition":"-webkit-transform 0s",
					"mozTransition":"-moz-transform 0s",
					"transition":"transform 0s"
				});

				return;
			case "swipeleft":
				b = a.nextElementSibling;
			break;

			case "swiperight":
				b = a.previousElementSibling;
			break;

			case "release":

				if (Math.abs(e.gesture.deltaX) > (W / 2)) {
					if(e.gesture.direction === 'right'){
						b = a.previousElementSibling;
					}
					else{
						b = a.nextElementSibling;
					}
				}

			break;
		}

		css(frameset, {
			"WebkitTransition": "",
			"mozTransition": "",
			"transition": ""
		});

		if (!b) {
			b = a;
		}

		emit(b, 'active');

		return true;
	});

	// resize
	if (!supportsTouch) {
		on(window, 'resize', () => {
			emit(frameset, 'fillframe');
		});
		emit(frameset, 'fillframe');
	}
	return frameset;
}

//
// showFrame
// If a frame comes into focus, either by being:
// unppined or selected (frame-nav), or screen swipe bring its into focus
function showFrame(frame, toggle = false) {

	// lets create the offset
	var frameset = frame.parentNode;
	var frames = frameset.children;
	var i = index(frame);
	var links = each('.frame-nav a');
	var link = links[i];

	if (link) {
		// Select class removes this class from all other siblings and marks this item as selected
		toggleClass(links, 'active', (el) => el === link);
	}

	toggleClass(frames, 'active', (el) => el === frame);


	if (mobile()) {
		var x = "-" + ((i / frames.length) * 100) + "%";
		transform(frameset, "translateX", x);
	}
	else if (toggle) {
		toggleClass([frame, link], 'pinned');
	}
	else {
		removeClass([frame, link], 'pinned');
	}
	emit(frameset, 'fillframe');
}


function createFrameControls(frame) {

	// Create resize buttons
	var btn = createElement('button', {className: 'resize'});
	frame.appendChild(btn);

	// Add touch event
	touch(btn, (e, o) => {

		if(!o){
			return false;
		}
		var diff = (e.screenX - o.screenX);

		// If item is at its minimum?
		if(diff === 0){
			// nothing to do
			return;
		}

		var frm = frame,
			prev = frame,
			style,
			width;

		// if the resize is on the left side
		// swap the $prev with the actual prev element
		if (cssCalc(btn).left === "0px") {
			prev = frm = prev.previousElementSibling;
		}

		do {
			width = prev.offsetWidth + diff;

			style = cssCalc(prev);

			if( width > parseInt(style.maxWidth, 10)) {
				//console.log('Too big');
				continue;
			}
			else if( width < parseInt(style.minWidth, 10)) {
				//console.log('Too small');
				continue;
			}
			else{
				passed = true;
				break;
			}
		}
		while ((prev = prev.previousElementSibling) && prev);

		if (!prev) {
			//console.log('Cannot shift left item any further');
			return;
		}

		var next = frm,
			nwidth,
			passed = false;

		while (next.nextElementSibling) {

			next = next.nextElementSibling;
			nwidth = next.offsetWidth - diff;

			style = cssCalc(next);

			if (nwidth > parseInt(style.maxWidth, 10)) {
				//console.log('Too big for next');
				continue;
			}
			else if (nwidth < parseInt(style.minWidth,10)) {
				//console.log('Too small for next');
				continue;
			}
			else {
				passed = true;
				break;
			}
		}

		if (!passed) {
			//console.log('Cannot move right items any further');
			return;
		}

		// Change size
		setFrameWidth(prev, width);

		// This neighbour
		setFrameWidth(next, nwidth);
	});
}

function setFrameWidth(frame, width) {
	frame = flex ? filter(frame, ":not(.flex)") : frame;
	css(frame, {width: width +"px"});
}
