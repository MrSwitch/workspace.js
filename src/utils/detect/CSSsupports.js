// Add browser ability to the window HTML.classList
export default function (property, enabled) {
	document.documentElement.className = document.documentElement.className + ' ' + (enabled?"":"no-") + property;
};