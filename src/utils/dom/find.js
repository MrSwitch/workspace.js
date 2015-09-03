import until from './until';
import matches from './matches';

export default function(elements, match) {
	return until(elements, (el) => {
		if (matches(el, match)) {
			return el;
		}
	});
}
