export default function(elem) {
	return Array.prototype.indexOf.call(elem.parentNode.children, elem);
}
