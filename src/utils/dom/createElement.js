
import extend from '../object/extend';

export default function (tagName, prop) {
	let elm = document.createElement(tagName);
	extend(elm, prop);
	return elm;
}
