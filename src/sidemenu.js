// Events
import emit from './utils/events/emit';
import on from './utils/events/on';

// DOM
import css from './utils/dom/css';
import documentElement from './utils/dom/documentElement';
import createElement from './utils/dom/createElement';
import parents from './utils/dom/parents';
import toggleClass from './utils/dom/toggleClass';
import removeClass from './utils/dom/removeClass';
import hasClass from './utils/dom/hasClass';
import attr from './utils/dom/attr';
import index from './utils/dom/index';
import each from './utils/dom/each';

// Navigation
export default function sidemenu(query) {

	// Find the element
	each(query, (nav) => {

		// Does there exist a navigation
		let toggle = createElement('button', {
			innerText: 'Close',
			className: 'toggle-frame-nav'
		});

		nav.appendChild(toggle);

		on('.toggle-frame-nav', 'click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			toggleClass(documentElement, "show-frame-nav");
		});

		// Populate the Nav with frame links
		each('.frameset .frame', (frame) => {
			let name = frame.getAttribute('data-framename') || frame.title;
			let link = createElement('a', {innerText: name});
			attr(link, {
				"data-frmindex" : index(frame)
			});
			nav.appendChild(link);

			on(link, 'click', () => {
				emit(frame, 'active');
			});

			on(frame, 'pinned', (e) => {
				toggleClass(link, 'pinned');
			});
		});

		// Add click event to body
		// to get out of the menu
		on(document.body, "click", (e) => {
			if (hasClass(documentElement, 'show-frame-nav') && !parents(e.target, ".frame-nav").length) {
				e.preventDefault();
				e.stopPropagation();
				removeClass(documentElement, 'show-frame-nav');
			}
		});

		document.body.appendChild(nav);
	});
}
