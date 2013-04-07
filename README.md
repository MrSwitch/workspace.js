




menu
# workspace.js
Kicking off web apps with a responsive layout, and then some...





## Frames
Place navigation and content within a [class=frameset]



	<section class="frameset">
	  <nav></nav>
	  <nav></nav>
	  <article class="flex"></article>
	</section>


On a large screen; frames are displayed inline with their default widths. Control bars let the user alter their size.

On a small screen (such as mobile) each frame occupies 100% of the parent frameset window.




## Controls

Place controls on the page to view the frame navigation on left side


	<button class="toggle-frame-nav">toggle navigation</button>


Demo

### jQuery
Navigate to a frame

	$(frameEl).showframe();
 


	
## Events touch/swipe
Navigating between frames on small screens is simple as a swipe to the left or right with a finger or mouse pointer.
You can also take advantage of these in your application, e.g.


	$("body").swipe(function(){
	  switch (e.type){
	    case "swipeleft":
	    // do something
	    case "swiperight":
	    // do something else
	  }
	});
 



## Ondemand &lt;img&gt;
Defer image loading


	<img data-src='http://www.gravatar.com/avatar/20043d5ade315f3c25d13b18dba95bc4.jpg' />


By setting the URL of an image to the attribute data-src,instead of src. The image shant be loaded until it is visible.






