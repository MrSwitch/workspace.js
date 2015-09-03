import each from './each';

export default function(elements, props) {
	return each(elements, (element) => {
		for (let x in props) {
			element.setAttribute(x, props[x]);
		}
	});
}
