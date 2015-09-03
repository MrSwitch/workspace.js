// on.js
// Listen to events, this is a wrapper for addEventListener

import each from '../dom/each';

export default function on(elements, eventnames, callback, useCapture = false) {
	eventnames = eventnames.split(/\s+/);
	return each(elements, (el) => {
		eventnames.forEach((eventname) => el.addEventListener(eventname, callback, useCapture) )
	});
};
