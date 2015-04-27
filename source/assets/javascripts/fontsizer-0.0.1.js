





(function() {

	var elem = document.querySelector( '#symbol' ),
			cont = window.getComputedStyle(elem.parentNode, null);
			width = parseInt(cont.getPropertyValue('width')),
			height = parseInt(cont.getPropertyValue('height')),
			padding = {
				top: parseInt(cont.getPropertyValue('padding-top')),
				right: parseInt(cont.getPropertyValue('padding-right')),
				bottom: parseInt(cont.getPropertyValue('padding-bottom')),
				left: parseInt(cont.getPropertyValue('padding-left'))
			}

			// widthFactor = cont.innerWidth

	function init() {
		fontCalc();
	}

	function fontCalc() {
		var widthFactor = (width - )


		if ( widthFactor < heightFactor ) {
			lineHeight = Math.floor( widthFactor * 1000 );
		} else if ( widthFactor >= heightFactor ) {
			lineHeight = Math.floor( heightFactor * 1000 );
		}

		var fontSize = 

		fontStyle();
	}

	function fontStyle() {
		if ( elem ) {
			elem.style.fontSize = Math.floor(fontSize) + 'px',
			elem.style.lineHeight = Math.ceil(lineHeight) + 'px'
		}
	}

	init();

});




(function() {

	var body = document.body,
		  main = document.querySelector( '#main' ),
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
			classie.remove( main, 'main-inactive');
		}
		else {
			classie.add( nav, 'nav-open');
			classie.remove( nav, 'nav-right');
			classie.add( body, 'nav-active' );
			classie.add( main, 'main-inactive');
		}
		isOpen = !isOpen;
	}

	init();

})();