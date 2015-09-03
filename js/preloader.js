// Set preloader div height
document.getElementById('pre').style.height = window.innerHeight + "px";

// Get loader divs position and then get its optimal height
var pos = findPos(document.getElementById('loader'));
document.getElementById('loader').style.height = ((window.innerHeight - pos) + 24) + "px";

// do if window resizes
$(window).resize(function() {
   document.getElementById('pre').style.height = window.innerHeight + "px";
   document.getElementById('loader').style.height = ((window.innerHeight - pos) + 24) + "px";
});

// Detect position
function findPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		
	}
	return curtop;
}

// Add imageload
imagesLoaded( document.querySelector('body'), function( instance ) {
  $(document.querySelector('body')).addClass("loaded-anim");
  $(document.querySelector('body')).removeClass("loading");
  
  var pfx = ["webkit", "moz", "MS", "o", ""];
	function PrefixedEvent(element, type, callback) {
		for (var p = 0; p < pfx.length; p++) {
			if (!pfx[p]) type = type.toLowerCase();
			element.addEventListener(pfx[p]+type, callback, false);
		}
	}
  PrefixedEvent(document.querySelector('.preloader'), "AnimationEnd", isDoneWait);
  
  function isDoneWait(e) {
	  setTimeout(isDone, 2000)
  }
  function isDone(e) {
	   $(document.querySelector('body')).removeClass("loaded-anim");
	$(document.querySelector('body')).addClass("loaded");
  }            
  
 });