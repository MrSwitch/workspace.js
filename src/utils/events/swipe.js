// swipe
// Checks for a swipe to the left or to the right

import touch from './touch';

export default function swipe(elements, callback) {

	return touch(elements, function(e, o, s) {

		e.gesture.type = "drag" + e.gesture.direction;

		callback.call(this, e);

	}, function(e){

	}, function(e,s){
		// How long did this operation take?
		if (e.gesture.deltaTime < 200 && e.gesture.distance > 20 && e.gesture.velocity > 0.3) {
			e.gesture.type = "swipe" + e.gesture.direction;
		}
		else {
			e.gesture.type = "release";
		}


		callback.call(this, e);
	});
};
