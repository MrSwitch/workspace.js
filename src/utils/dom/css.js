// css - apply properties to an element
import each from './each';

export default function css(elements, props) {
	return each(elements, (el) => {
		for (let key in props) {
			el.style[key] = props[key];
		}
	});
}
