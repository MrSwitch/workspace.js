
(function($){

	'use strict';

	var console = window.console || {log:function(){}},
		Touch = ("ontouchstart" in window),
		MOBILE_WIDTH = 650;


	//
	// TestProp tests support for FlexBox or Flex css specification
	// Tests CSS properties supported in the browser
	function testProp(prop,undefined){
		var s = (document.createElement('div')).style;
		return s["Moz"+prop] !== undefined || s["Webkit"+prop] !== undefined || s["ms"+prop] !== undefined || s[prop.replace(/^./,function(m){return m.toUpperCase();})] !== undefined;
	}

	var flex = testProp("FlexWrap");
	var legacyflex = testProp("BoxDirection");

	var transform = testProp("Transform");
	var transform3d = testProp("Perspective");

	//
	// Check if the view is in mobile mode.
	// mobile() looks at window width to determine the mobile mode, essentially its just small screen
	function mobile(){
		return (document.documentElement.offsetWidth < MOBILE_WIDTH);
	}

	mobile();


	//
	// Add browser ability to the window HTML.classList
	document.documentElement.className = [document.documentElement.className || '', (flex?"":"no-")+"flex",(legacyflex?"":"no-")+"legacyflex", (Touch?'':'no-')+'touch'].join(" ");


	//
	// $.fn.transform
	// Assign CSS transform operation
	$.fn.transform = function(prop,value){
		var x = prop + "(" + value + ")";
		if(transform3d && prop === "translateX"){
			x = "translate3d(0,0,0) translate("+(value||'0')+",0)";
		}
		var o = {transform:x,msTransform:x,MozTransform:x,WebkitTransform:x};
		return $(this).css(o);
	};


	//
	// Frameset
	// Make child elements flexible frame like
	//
	$.fn.frameset = function(){

		var $frmst = $(this);
		/*
		if($frmst.find(".inner-frameset").length){
			$frmst = $frmst.find(".inner-frameset");
		}*/

		// Define "frame" as a direct desendent of the frameset
		var $frames = $frmst.addClass('frameset').find('> *').addClass('frame');

		// Add "active" status to the first one, or who bares the className 'frame-main'
		if($frames.filter(".active").length===0){
			$frames.each(function(i){
				if(i===0||$(this).hasClass("frame-main")){
					$(this).addClass('active').siblings().removeClass("active");
				}
			});
		}


		// Only for non-touch devices do we need the drag controls
		$frames.filter(function(){
			return !( flex && $(this).hasClass("flex") );
		}).each(function(i){

			// Create resize buttons
			$('<button class="resize"></button>').appendTo(this).touch(function(e,o){

				if(!o){
					return false;
				}
				var diff = (e.screenX - o.screenX);
				
				// If item is at its minimum?
				if(diff===0){
					// nothing to do
					return;
				}

				var $frm = $(this).parent(),
					$prev = $frm,
					width;

				// if the resize is on the left side
				// swap the $prev with the actual prev element
				if($(this).css("left") === "0px"){
					$prev = $frm = $prev.prev();
				}

				do{
					width = $prev.outerWidth(true) + diff;

					if( width > parseInt($prev.css('maxWidth'),10)){
						//console.log('Too big');
						continue;
					}
					else if( width < parseInt($prev.css('minWidth'),10)){
						//console.log('Too small');
						continue;
					}
					else{
						passed = true;
						break;
					}
				}
				while( ($prev = $prev.prev('.frame')) && $prev.length > 0 );

				if($prev.length===0){
					//console.log('Cannot shift left item any further');
					return;
				}

				var $next = $frm,
					nwidth,
					passed = false;

				while( $next.next('.frame').length > 0 ){
					$next = $next.next('.frame');
					nwidth = $next.outerWidth(true) - diff;

					if( nwidth > parseInt($next.css('maxWidth'),10)){
						//console.log('Too big for next');
						continue;
					}
					else if( nwidth < parseInt($next.css('minWidth'),10)){
						//console.log('Too small for next');
						continue;
					}
					else{
						passed = true;
						break;
					}
				}
				
				if(!passed){
					//console.log('Cannot move right items any further');
					return;
				}

				// Change size
				$prev.filter(function(){
					return !( flex && $(this).hasClass("flex") );
				}).width( width +"px");

				// This neighbour
				$next.filter(function(){
					return !( flex && $(this).hasClass("flex") );
				}).width( nwidth + 'px');

			});

			/*
			// Toggle Pin
			// create a pin member and attach it to each frame
			$('<button class="pin"></button>').appendTo(this).click(function(e){

				// Pinned + trigger fillframe
				$(this).parent().addClass('pinned').trigger('pinned').parent().trigger('fillframe');

				e.stopPropagation();
			});


			// Remove Pinned
			// create a pin member and attach it to each frame
			$(this).click(function(){
				if($(this).hasClass('pinned')){// remove + trigger fillframe
					$(this).removeClass('pinned').trigger('pinned').parent('.frameset').trigger('fillframe');
				}
			});
*/
		}).find('.workspace-back').bind('click', function(){
			$(this).parents('.frame').prev('.frame').addClass('active').siblings().removeClass('active');
		});

		//
		// FillFrame
		//
		$frmst.bind('fillframe', function(){
			
			// Is the frame
			if(mobile()){
//				$('.frame',this).width('100%');
				return;
			}

			// for all the nested frames within this
			// we are going to reorganise the widths
			var diff = $(this).width();

			$('.frame:not(.pinned)',this).each(function(){
			
				// How wide is this element?
				var w = $(this).outerWidth(true);
				diff -= w;

				// fix bug in IE, FF when resize, lets fix the widths, to prevent it overriding its container
				$(this).filter(function(){
					return !( flex && $(this).hasClass("flex") );
				}).width(w+'px');

			}).each(function(){
				if(diff===0){
					return;
				}
				var min = parseInt($(this).css('minWidth'),10) || 0,
					max = parseInt($(this).css('maxWidth'),10) || 0,
					wid = $(this).outerWidth(true);

				//console.log(diff,wid,min,max);

				if((wid+diff)<min){
					//console.log(diff,wid,'min');
					diff += (wid - min);
					wid = min;
				}
				else if((wid+diff)>max&&max>0){
					//console.log(diff,wid,'max');
					diff -= (wid - max);
					wid = max;
				}
				else{
					wid += diff;
					diff = 0;
				}
				//console.log(diff,wid);
				$(this).filter(function(){
					return !( flex && $(this).hasClass("flex") );
				}).width((wid) +'px');
			});
		});


		// resize
		if(!Touch){
			$(window).bind('resize', function(){
				$frmst.trigger('fillframe');
			});
			$frmst.trigger('fillframe');
		}
		return $frmst;
	};

	//
	// showFrame
	// If a frame comes into focus, either by being:
	// unppined or selected (frame-nav), or screen swipe bring its into focus
	$.fn.showFrame = function(toggle){
		return $(this).each(function(){
			var label = $('.frame-nav a').get($(this).index(0));
			$(this).add(label).addClass('active').siblings().removeClass('active');
			if(mobile()){
				// lets create the offset
				var i = $(this).index();
				var $W = $(this).parent();
				var x = "-"+((i/$W.find('.frame').length)*100)+"%";
				$W.transform("translateX", x);
			}else {
				$(this).add(label)[toggle?'toggleClass':'removeClass']('pinned');
			}
			$(this).parent().trigger('fillframe');
		});
	};

	//
	$.fn.buildNavigation = function(){

		$(this).each(function(){

			var $nav = $(this);

			if($nav.find(".toggle-frame-nav").length===0){
				$nav.html('<button class="toggle-frame-nav">close</button>');
			}

			// Populate the Nav with frame links
			$('.frameset .frame').each(function(){
				var frame=this;
				var $a = $("<a/>").text($(this).attr('data-framename')||this.title).appendTo($nav).attr("data-frmindex",$(frame).index()).click(function(){
					$(frame).showFrame(true);
				});
				$(this).on('pinned', function(){
					$a[$(this).hasClass("pinned")?'addClass':'removeClass']('pinned');
				});
			});

			// Add click event to body
			// to get out of the menu
			$('body').on("click", function(e){
				if( $("html").hasClass('show-frame-nav') && !$(e.target).parents(".frame-nav").length ){
					//e.preventDefault();
					//e.stopPropagation();
					$('html').toggleClass('show-frame-nav');
				}
			});

			$nav.appendTo("body");

			$(".toggle-frame-nav").click(function(e){
				$(document.documentElement).toggleClass("show-frame-nav");
				e.preventDefault();
				e.stopPropagation();
			});


			$(window).bind('resize', function(){
				$nav.height(window.innerHeight+"px");
				$(document.body).height(window.innerHeight+"px");
			}).trigger('resize');

		});
	};


	//
	// Loads images on demand
	// By adding data-src to images and binding dataSrc to a ancestor
	// The data-src attribute is read and defines a path to the image
	// load an image once the image fits a visible area. or if the image exists
	var images = [];
	$.fn.dataSrc = function(){
		// SHOWS IMAGES WHEN THEY ARE REQUIRED
		return $(this)
			.each(function(){
				// Position
				var h = $(this).height(),
					t = $(this).offset().top;

				// [data-src]
				$('img:not([src])',this).filter(function(){
					// Where is this positioned?
					var _t = $(this).offset().top,
						_h = $(this).height();

					// does it fix in the bounding box?
					return ( ( _t + _h ) >= t && _t <= ( t + h ) );

				}).each(function(){
					// SRC
					this.src = $(this).attr('data-src');
					if($(this).is('[data-src-error]')){
						this.onerror = function(){
							this.src = $(this).attr('data-src-error');
						};
					}
					$(this).removeAttr('data-src');
					// Have we already loaded this image into the browser?
					if( $.inArray(this.src,images) > -1 ){
						$(this).animate({opacity:1},'fast');
					} else {
						$(this).load( function(){
							$(this).animate({opacity:1},'fast');
							images.push(this.src);
						} );
					}
				});
			});
	};


	//
	// Add Frameset to elements which contain '.frameset'
	// Alternatively calling $("div").frameset() also works.
	// This does not work in touch devices. Which frankly are too fidly to control. Lets rely on the admin the user would have assigned with CSS media queries.
	$(function(){

		// Find elements denoted as framesets...
		// Append attributes to their chiidren;
		$('.frameset').frameset().find(".active").showFrame();

		// Containers with images can be loaded on demand
		// The container must simply have the className = "data-src"
		// A change in scroll position or visibility triggers the check
		$('.data-src').scroll(function(){
			$(this).dataSrc();
		});

		// Show frames
		// Add events to buttons which can expose the names of the frames.
		// This is good for mobile.
		$('.frame-nav').buildNavigation();

		// Add Gestures
		// To swipe between frames
		$(window).bind('resize', function(){

			// Get the number of frames in the frameset
			var $F = $(".frameset");
			var $f = $F.find(".frame");
			if(!mobile()){
				// reset frame
				$F.transform('translateX','').add($f).css({width:''});
				return;
			}

			var W = $F.parent().innerWidth();
			var tW = $f.length * W;
			$F.css({width:tW+"px"});
			$f.css({width:W+"px"});

			// Update the frame selection
			$f.filter(".active").showFrame();

		}).trigger('resize');


		$(".frameset").parent().swipe( function(e){

			if(!mobile()){
				return;
			}

			var $F = $(this).find('.frameset');
			var $f = $F.find(".frame");
			var $a = $f.filter('.active');
			var W = $F.parent().innerWidth();
			var n = $f.length;
			var i = $a.index();
			var $b = $a;

			switch(e.type){
				case "dragleft":
				case "dragright":

					// Cancel defaults
					e.preventDefault();
					e.stopPropagation();

					// What is the current frame offset (fo)
					var fo = -((100/n)*i);
					// What is the delta change in X as a percentage of the whole length,
					var dx = ((100/W)*e.gesture.deltaX)/n;

					// slow down at the first and last pane
					if( ( i === 0 && e.gesture.direction === 'right') || (i === (n-1) && e.gesture.direction === 'left') ){
						dx *= 0.3;
					}

					$F
					.transform('translateX', (fo + dx) + "%")
					.css({
						"WebkitTransition":"-webkit-transform 0s",
						"mozTransition":"-moz-transform 0s",
						"transition":"transform 0s"
					});

					return;
				case "swipeleft":
					$b = $a.next();
				break;

				case "swiperight":
					$b = $a.prev();
				break;

				case "release":

					if(Math.abs(e.gesture.deltaX)>(W/2)){
						if(e.gesture.direction === 'right'){
							$b = $a.prev();
						}
						else{
							$b = $a.next();
						}
					}

				break;
			}

			$F.css({
				"WebkitTransition":"",
				"mozTransition":"",
				"transition":""
			});

			if($b.length===0){
				$b = $a;
			}

			$b.showFrame();

			return true;
		});


		$(document.body).on('keydown', function(e){
			switch(e.which){
				case 37:
					$(".frameset .frame.active").prev().showFrame();
				break;
				case 39:
					$(".frameset .frame.active").next().showFrame();
				break;
			}
		});
	});

})(jQuery);
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

	if(e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length>0){
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

		// Velocity
		e.gesture.velocity = e.gesture.distance/e.gesture.deltaTime;
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
		if(e.gesture.deltaTime<200&&e.gesture.distance>20&&e.gesture.velocity>0.3){
			e.type = "swipe"+e.gesture.direction;
		}
		else{
			e.type = "release";
		}


		callback.call(this, e);
	});
};


})(jQuery);
