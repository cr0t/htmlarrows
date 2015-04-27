//= require fastclick-1.0.6.min
//= require headroom-0.7.0.min
//= require fontscale
//= require classie
//= require hydrogen-0.0.1

fontScale();

// headroom sticky header on scroll
var desktop = document.querySelector("#nav");
var desktop_headroom = new Headroom(desktop, {
  "offset": 205,
  "tolerance": 5,
  "classes": {
    "initial": "animated",
    "pinned": "slideDown",
    "unpinned": "slideUp"
  }
});


var mobile = document.querySelector("#nav-mobile");
var mobile_headroom = new Headroom(mobile, {
  "offset": 205,
  "tolerance": 5,
  "classes": {
    "initial": "animated",
    "pinned": "slideDown",
    "unpinned": "slideUp"
  }
});

function headroom_init() {
	var viewport = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if( viewport > 768 ) {
		desktop_headroom.init();
	} else {
		mobile_headroom.init();
	}
}

// init headroom
headroom_init();

// re-init headroom on window resize
window.onresize = function() {
	desktop_headroom.destroy();
	mobile_headroom.destroy();
	headroom_init();
  fontScale();
}

// social popups
// $('.popup').click(function(event) {
//   var width  = 600,
//       height = 375,
//       left   = ($(window).width()  - width)  / 2,
//       top    = ($(window).height() - height) / 2,
//       url    = this.href,
//       opts   = 'status=1' +
//                ',width='  + width  +
//                ',height=' + height +
//                ',top='    + top    +
//                ',left='   + left;
  
//   window.open(url, 'twitter', opts);

//   return false;
// });