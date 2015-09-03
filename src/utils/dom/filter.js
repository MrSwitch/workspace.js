import each from './each';
import matches from './matches';

export default function(elements, match) {
	let a = [];

	each(elements, (el) => {
		if (matches(el, match)) {
			a.push(el);
		}
	});

	return a;
}
