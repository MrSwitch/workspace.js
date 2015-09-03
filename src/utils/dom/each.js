export default function each(matches, callback = function(){}) {

	if (matches instanceof Element || matches instanceof HTMLDocument || matches instanceof Window) {
		callback(matches);
		return [matches];
	}

	if (typeof(matches) === 'string') {
		matches = document.querySelectorAll(matches);
	}

	if (callback) {

		for (let i = 0; i < matches.length; i++) {
			callback.call(matches[i], matches[i], i );
		}
	}

	return matches || [];
}
