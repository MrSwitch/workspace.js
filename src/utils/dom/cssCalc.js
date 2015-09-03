// cssCalc
import each from './each';

export default function (elements) {
	let elm = each(elements)[0];
	return window.getComputedStyle(elm);
}
