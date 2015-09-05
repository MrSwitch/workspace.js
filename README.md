



# workspace.js

	<button class="toggle-frame-nav">toggle menu</button>
	Kicking off web apps with a responsive layout, <b>and then some...</b>






## Frames
Place navigation and content within a `[class=frameset]`


```text/html
	<section class="frameset">
	  <nav></nav>
	  <nav></nav>
	  <article class="flex"></article>
	</section>
```

On a large screen; frames are displayed inline with their default widths. Control bars let the user alter their size.

On a small screen (such as mobile) each frame occupies 100% of the parent frameset window.




## Controls

Place controls on the page to view the frame navigation on left side

```text/html
	<button class="toggle-frame-nav">toggle navigation</button>
```

Demo

### Native Dom Events
Navigate to a frame
```
	frameEl.dispatchEvent(new Event('active'));
```



## Events touch/swipe
Navigating between frames on small screens is simple as a swipe to the left or right with a finger or mouse pointer.



## Lazy loading
Defer image loading

```text/html
	<img data-src='http://www.gravatar.com/avatar/20043d5ade315f3c25d13b18dba95bc4.jpg' />
```

By setting the URL of an image to the attribute `data-src`,instead of `src`. The image shant be loaded until it is visible. Scroll down...





