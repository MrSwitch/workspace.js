import each from './each';

export default function(elements, callback) {
	var bool;

	each(elements, (el) => {
		if (!bool) {
			bool = callback(el);
		}
	});

	return bool;
}
