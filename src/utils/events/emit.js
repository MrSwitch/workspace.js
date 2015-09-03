// on.js
// Listen to events, this is a wrapper for addEventListener

import each from '../dom/each';

export default function emit(elements, eventname) {
	return each(elements, (el) => {
		el.dispatchEvent(new Event(eventname));
	});
};
