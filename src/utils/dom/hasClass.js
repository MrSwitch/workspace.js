import until from './until';

export default function(elements, className) {
	var reg = new RegExp("(^|\\s)"+className+"($|\\s)", 'i');
	return until(elements, (el) => {
		return el.className && el.className.match(reg);
	});
}
