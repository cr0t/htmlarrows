//= require fastclick-1.0.6.min
//= require headroom-0.7.0.min
//= require classie
//= require hydrogen-0.0.1

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
	console.log("hello there")
	desktop_headroom.destroy();
	mobile_headroom.destroy();
	headroom_init();
}
