//= require fastclick-1.0.6.min
//= require headroom-0.7.0.min
//= require jquery-1.11.2.min
//= require jquery-bigtext-1.3.0
//= require classie
//= require hydrogen-0.0.1

// jquery bigtext
$(document).ready(function(){
  $("#symbol").bigText({
    maximumFontSize: 600,
    verticalAlign: "top",
  });
});

// sticky footer init
$(document).scroll(function() {
  stickyFooter();
});

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
}

// sticky footer
function stickyFooter() {
  if($('#social').offset().top + $('#social').height() >= $('#footer').offset().top - 10)
      $('#social').css('position', 'absolute');
  if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top)
    $('#social').css('position', 'fixed');
}

// social popups
$('.popup').click(function(event) {
  var width  = 600,
      height = 375,
      left   = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      url    = this.href,
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;
  
  window.open(url, 'twitter', opts);

  return false;
});