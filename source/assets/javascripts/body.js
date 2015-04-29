//= require fastclick-1.0.6.min
//= require headroom-0.7.0.min
//= require fontscale
//= require classie
//= require hydrogen-0.0.1

fontScale();
setLayout();

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

// re-init headroom and fontscale on window resize
window.onresize = function() {
	desktop_headroom.destroy();
	mobile_headroom.destroy();
	headroom_init();
  fontScale();
}

// one click code selector
function selector(element) {
  var doc = document, 
      text = element,
      range, 
      selection
  ;    
  if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(text);
      range.select();
  } else if (window.getSelection) {
      selection = window.getSelection();        
      range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
  }
}

var selectables = document.querySelectorAll('.selectable');
for( var i = 0; i < selectables.length; i++ ){
  selectables[i].addEventListener( 'click', function(e) {
    var target = e.target
    selector(target);
  }, false );
}

// toggle layout on click
function toggleLayout(layout) {
  var section = document.getElementById('index');
  if ( classie.has( section, layout )) {
    return
  } else {
    if ( layout === 'table' ){
      classie.remove( section, 'grid');
      classie.add( section, layout);
    } else {
      classie.remove( section, 'table');
      classie.add( section, 'grid');
    }
  setCookie(layout);
  }
}

// set the layout from user cookie
function setLayout(layout) {
  var cookie = getCookie('htmlarrows')
  if ( cookie === 'table' ) {
    toggleLayout('table');
  } else {
    return
  }
}

// set a cookie for user preferred layout
function setCookie(layout) {
  var date = new Date();
  date.setTime(date.getTime() + (1024*24*60*60*1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = "htmlarrows=" + layout + "; " + expires + "; path=/";
}

// get cookie (borrowed from https://developer.mozilla.org/en-US/docs/Web/API/document/cookie)
function getCookie(name) {
  if (!name) { return null; }
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

var layoutToggles = document.querySelectorAll('.layout-toggle');
for( var i = 0; i < layoutToggles.length; i++ ){
  layoutToggles[i].addEventListener( 'click', function(e) {
    if ( e.target.id ) {
      var layout = e.target.id;
    } else {
      var layout = e.target.parentNode.id;
    }
    toggleLayout(layout);
  });
}

// social popups
var socialLinks = document.querySelectorAll('.social-link');
for( var i = 0; i < socialLinks.length; i++ ){
  socialLinks[i].addEventListener( 'click', function(e) {
    if ( e.target.id ) {
      var target = e.target;
    } else {
      var target = e.target.parentNode;
    }
    var name = target.id,
        width  = 600,
        height = 375,
        left   = (window.innerWidth - width)  / 2,
        top    = (window.innerHeight - height) / 2,
        url    = target.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    window.open(url, name, opts);
    return false;
  }, false);
}




// social popups
// $('.popup').click(function(event) {
//   
// });