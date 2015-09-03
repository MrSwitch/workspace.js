import on from './on';
import matches from '../dom/matches';

export default function delegate(match, eventName, handler, root = document) {
	return on(root, eventName, (e) => {
		if (matches(e.target, match)) {
			handler(e);
		}
	});
}
