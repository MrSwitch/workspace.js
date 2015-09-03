// Select Class
import each from './each';
import addClass from './addClass';
import removeClass from './removeClass';

export default function (elements, className = 'selected') {
	return each(elements, (el) => {
		removeClass(el.parentNode.children, className);
		addClass(el, className);
	});
}
