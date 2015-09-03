import on from './on';

export default function ready(callback) {
	if (document.readyState !== "loading" && document.body) {
		callback();
	}
	else {
		on(document, 'DOMContentLoaded', callback);
	}
}
