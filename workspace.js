(function($){

	'use strict';

	var console = console || {log:function(){}};

	//
	// Touch
	// @param callback function - Every touch event fired
	// @param complete function- Once all touch event ends
	//
	$.fn.touch = function(callback, complete){

		// Store callbacks, and previous pointer position
		var cb = {}, mv = {};

		$("body").bind('mousemove MSPointerMove', function(e){
			// trigger the call
			var i = e.originalEvent.pointerId||0,
				func = cb[i],
				o = mv[i];

			if(func&&typeof(func)==='function'){
				func.call(this, e, o);
			}
			mv[i] = e;
		});

		$("body").bind('mouseup MSPointerUp', function(e){
			cb[e.originalEvent.pointerId||0] = null;
		});


		// loop through and add events
		return $(this).each(function(){
			// bind events
			$(this)
				.bind("selectstart",function(e){return false;})
				.bind('mousedown MSPointerDown', function(e){
					// Cancel the mousemove if the msMousePointer is enabled
					if(e.type==='mousemove'&&"msPointerEnabled" in window.navigator){
						return;
					}

					// default pointer ID
					e.originalEvent.pointerId = e.originalEvent.pointerId || 0;

					// bind the on move handler to the
					var el = this;
					mv[e.originalEvent.pointerId] = e;
					cb[e.originalEvent.pointerId] = function(_e,o){ callback.call(el,_e,o,e); };

					e.preventDefault();
					e.stopPropagation();
				});
		});
	};

	//
	// Frameset
	// Make child elements flexible frame like
	//
	$.fn.frameset = function(){

		// Width
		var MOBILE_WIDTH = 600;

		$(this).addClass('frameset').find('> *').addClass('frame').each(function(i){

			if(i===0){
				$(this).addClass('active');
			}

			if(!('ontouchstart' in window)){
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

					do{
						width = $prev.outerWidth() + diff;

						if( width > parseInt($prev.css('maxWidth'),10)){
							console.log('Too big');
							continue;
						}
						else if( width < parseInt($prev.css('minWidth'),10)){
							console.log('Too small');
							continue;
						}
						else{
							passed = true;
							break;
						}
					}
					while( ($prev = $prev.prev('.frame')) && $prev.length > 0 );

					if($prev.length===0){
						console.log('Cannot shift left item any further');
						return;
					}

					var $next = $frm,
						nwidth,
						passed = false;

					while( $next.next('.frame').length > 0 ){
						$next = $next.next('.frame');
						nwidth = $next.outerWidth() - diff;

						if( nwidth > parseInt($next.css('maxWidth'),10)){
							console.log('Too big for next');
							continue;
						}
						else if( nwidth < parseInt($next.css('minWidth'),10)){
							console.log('Too small for next');
							continue;
						}
						else{
							passed = true;
							break;
						}
					}
					
					if(!passed){
						console.log('Cannot move right items any further');
						return;
					}

					// Change size
					$prev.width( width +"px");

					// This neighbour
					$next.width( nwidth + 'px');

				});

				// Toggle Pin
				// create a pin member and attach it to each frame
				$('<button class="pin"></button>').appendTo(this).click(function(e){

					// Pinned + trigger fillframe
					$(this).parent().addClass('pinned').css({width:'20px',minWidth:0}).parent().trigger('fillframe');

					e.stopPropagation();
				});


				// Remove Pinned
				// create a pin member and attach it to each frame
				$(this).click(function(){
					if($(this).hasClass('pinned')){// remove + trigger fillframe
						$(this).removeClass('pinned').removeAttr('style').parent('.frameset').trigger('fillframe');
					}
				});
			}
		}).find('.workspace-back').bind('click', function(){
			$(this).parents('.frame').prev('.frame').addClass('active').siblings().removeClass('active');
		});

		//
		// FillFrame
		//
		$(this).bind('fillframe', function(){
			
			// Is the frame
			if(window.outerWidth < MOBILE_WIDTH){
				$(this).addClass('mobile');
				$('.frame',this).width('100%').each(function(){console.log(this);});
				return;
			}

			// Just in case this we defined as a mobile app
			$(this).filter('.mobile').removeClass('mobile');

			// for all the nested frames within this
			// we are going to reorganise the widths
			var diff = $(this).width();

			$('.frame:not(.pinned)',this).each(function(){
			
				// How wide is this element?
				var w = $(this).outerWidth();
				diff -= w;

				// fix bug in IE, FF when resize, lets fix the widths, to prevent it overriding its container
				$(this).width(w+'px');

			}).each(function(){
				if(diff===0){
					return;
				}
				var min = parseInt($(this).css('minWidth'),10) || 0,
					max = parseInt($(this).css('maxWidth'),10) || 0,
					wid = $(this).outerWidth();

				console.log(diff,wid,min,max);

				if((wid+diff)<min){
					console.log(diff,wid,'min');
					diff += (wid - min);
					wid = min;
				}
				else if((wid+diff)>max&&max>0){
					console.log(diff,wid,'max');
					diff -= (wid - max);
					wid = max;
				}
				else{
					wid += diff;
					diff = 0;
				}
				console.log(diff,wid);
				$(this).width((wid) +'px');
			});
		});

		return $(this);

	};




	//
	// Add Frameset to elements which contain '.frameset'
	// This does not work in touch devices. Which frankly are too fidly to control. Lets rely on the admin the user would have assigned with CSS media queries.
	//
	$(function(){

		// Find elements denoted as framesets...
		// Append attributes to their chiidren;
		$('.frameset').frameset();

		// resize
		$(window).bind('resize', function(){
			$('.frameset').trigger('fillframe');
		});

	});

})(jQuery);
