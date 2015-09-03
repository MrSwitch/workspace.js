// addClass
import each from './each';
import hasClass from './hasClass';

export default function(elements, className) {
	return each(elements, (el) => {
		if (!hasClass(el, className)) {
			el.className += " " + className;
		}
	});
}
