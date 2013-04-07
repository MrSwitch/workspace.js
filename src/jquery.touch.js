//
// jquery.touch.js
// Standardizes touch events


(function($){

//
// Calculate the difference from the starting position and the end position.
// Returns a gesture object given
function gesture(e,o){

	// Response Object
	e.gesture = {};

	if(e.originalEvent.touches&&e.originalEvent.touches.length>0){
		e.gesture.touches = e.originalEvent.touches;
	}
	else{
		e.gesture.touches = [e];
	}

	e.gesture.screenX = e.gesture.touches[0].screenX;
	e.gesture.screenY = e.gesture.touches[0].screenY;


	// If the second parameter isn't defined then we're unable to define getures
	// But if it is then whoop, lets go.
	if(o){
		e.gesture.deltaTime = (e.timeStamp - o.timeStamp);

		var dx = e.gesture.deltaX = e.gesture.screenX - o.gesture.screenX;
		var dy = e.gesture.deltaY = e.gesture.screenY - o.gesture.screenY;

		// Which is the best direction for the gesture?
		if(Math.abs(dy)>Math.abs(dx)){
			e.gesture.direction = (dy>0?'up':'down');
		}
		else{
			e.gesture.direction = (dx>0?'right':'left');
		}

		// Distance
		e.gesture.distance = Math.sqrt((dx*dx)+(dy*dy));
	}
}


//
// Touch
// @param callback function - Every touch event fired
// @param complete function- Once all touch event ends
//
$.fn.touch = function(callback, start, complete){

	// loop through and add events
	return $(this).each(function(){

		// Store callbacks, and previous pointer position
		var cb = {}, mv = {}, fin = {};

		$(document).bind('mousemove MSPointerMove touchmove', function(e){

			// Fix Android not firing multiple moves
			if(e.type.match(/touch/i)){
//				e.preventDefault();
			}

			// Mousebutton down?
			if(e.type.match(/mouse/i)&&e.which!==1){
				// The mouse buttons isn't pressed, kill this
				return;
			}

			// trigger the call
			var i = e.originalEvent.pointerId||0,
				func = cb[i],
				o = mv[i];

			// Extend the Event Object with 'gestures'
			gesture(e,o);

			// Trigger callback
			if(func&&typeof(func)==='function'){
				func.call(this, e, o);
			}

			mv[i] = e;
		});

		$(document).bind('mouseup MSPointerUp touchend touchcancel', function(e){

//			e.preventDefault();

			var i = e.originalEvent.pointerId||0;
			cb[i] = null;

			if(e.type==="touchend"||e.type==="touchcancel"){
				e = mv[i];
			}

			var func = fin[i];
			if(func){
				func.call(this,e);
			}

			fin[i] = null;
		});

		// bind events
		$(this)
			.bind('touchend', function(e){
				console.log("el:touchend");
				console.log(e);
			})
			.bind("selectstart",function(e){return false;})
			.bind('mousedown MSPointerDown touchstart', function(e){

				// prevent default
				//e.preventDefault();

				// Cancel the mousemove if the msMousePointer is enabled
				if(e.type==='mousemove'&&"msPointerEnabled" in window.navigator){
					return;
				}

				// default pointer ID
				var i = e.originalEvent.pointerId = ( e.originalEvent.pointerId || 0);

				// If touch, choose the first element.
				// For multiple we may need to pass in a flag to this function
				if(e.originalEvent.touches&&e.originalEvent.touches.length){
					var ts = e.timeStamp;
					e = e.originalEvent.touches[0];
					e.timeStamp = ts;
				}

				// bind the on move handler to the
				var el = this;


				// Add Gestures to event Object
				gesture(e);

				mv[i] = e;
				cb[i] = function(_e,o){ callback.call(el,_e,o,e); };
				fin[i] = function(_e){ if(complete) {complete.call(el,_e,e);} };

//					e.preventDefault();
//					e.stopPropagation();

				// trigger start
				if(start){
					start.call(this,e);
				}
			});
	});
};


//
// $.fb.swipe
// Checks for a swipe to the left or to the right
$.fn.swipe = function(callback){

	return $(this).touch(function(e,o,s){

		// Extend event Object with gestures
		gesture(e,s);

		e.type = "drag" + e.gesture.direction;

		callback.call(this, e);

	}, function(e){

	}, function(e,s){

		// Extend event Object with gestures
		gesture(e,s);

		// How long did this operation take?
		if(e.gesture.time<200&&e.gesture.distance>50){
			e.type = "swipe"+e.gesture.direction;
		}
		else{
			e.type = "release";
		}


		callback.call(this, e);
	});
};


})(jQuery);