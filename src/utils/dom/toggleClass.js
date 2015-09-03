import each from './each';
import addClass from './addClass';
import removeClass from './removeClass';
import hasClass from './hasClass';

export default function(elements, className, condition) {

	if (typeof(condition) !== 'function') {
		condition = function(el) {
			return !hasClass(el, className);
		};
	}

	return each(elements, (el) => {
		if (condition(el)) {
			addClass(el, className);
		}
		else {
			removeClass(el, className);
		}
	});
}
