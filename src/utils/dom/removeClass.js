// removeClass
import each from './each';

export default function(elements, className) {
	var reg = new RegExp("(^|\\s)"+className+"($|\\s)", 'ig');
	return each(elements, (el) => {
		el.className = el.className.replace(reg, ' ');
	});
}
