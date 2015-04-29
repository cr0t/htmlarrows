// Hydrogen Javascript
// version: 0.0.1

// fastclick init (https://github.com/ftlabs/fastclick)
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}


(function() {
	/* Mobile nav based on Codrops (http://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/)
	 * Original License:
	 *
	 * Licensed under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 * 
	 * Copyright 2014, Codrops
	 * http://www.codrops.com
	*/
	var body = document.body,
		  main = document.querySelector( '#main' ),
		  htmlElement = document.querySelector("html"),
		  openbtn = document.getElementById( 'nav-open-button' ),
		  closebtn = document.getElementById( 'nav-close-button' ),
		  isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		if(openbtn) {
			openbtn.addEventListener( 'click', toggleNav );
		}

		if(closebtn) {
			closebtn.addEventListener( 'click', toggleNav );
		}

		if(main) {
			main.addEventListener( 'click', function(e) {
				var target = e.target;
				if( isOpen && target !== openbtn ) {
					toggleNav();
				}
			});
		};
	}

	function toggleNav() {
		if(isOpen) {
			classie.remove( nav, 'nav-open');
			classie.add( nav, 'nav-right');
			classie.remove( body, 'nav-active' );
			classie.remove(htmlElement, 'nav-active');
			classie.remove( main, 'main-inactive');
		}
		else {
			classie.add( nav, 'nav-open');
			classie.remove( nav, 'nav-right');
			classie.add( body, 'nav-active' );
			classie.add(htmlElement, 'nav-active');
			classie.add( main, 'main-inactive');
		}
		isOpen = !isOpen;
	}

	init();

})();