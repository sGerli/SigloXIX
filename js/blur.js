/*
	Blur Effect
*/

/**
		 * Cache
		 */
		var $content = $('.header .h-container')
		  , $blur    = $('.header .image')
		  , wHeight  = $(window).height()
		  , hHeight  = $('.header').height;
		
		$(window).on('resize', function(){
		  wHeight = $(window).height();
		  hHeight  = $('.header').height;
		});
		
		/**
		 * requestAnimationFrame Shim 
		 */
		window.requestAnimFrame = (function()
		{
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
		})();
		
		/**
		 * Scroller
		 */
		function Scroller()
		{
		  this.latestKnownScrollY = 0;
		  this.ticking            = false;
		}
		
		Scroller.prototype = {
		  /**
		   * Initialize
		   */
		  init: function() {
		    window.addEventListener('scroll', this.onScroll.bind(this), false);
		  },
		
		  /**
		   * Capture Scroll
		   */
		  onScroll: function() {
		    this.latestKnownScrollY = window.scrollY;
		    this.requestTick();
		  },
		
		  /**
		   * Request a Tick
		   */
		  requestTick: function() {
		    if( !this.ticking ) {
		      window.requestAnimFrame(this.update.bind(this));
		    }
		    this.ticking = true;
		  },
		
		  /**
		   * Update.
		   */
		  update: function() {
		    var currentScrollY = this.latestKnownScrollY;
		    this.ticking       = false;
		    
		    /**
		     * Do The Dirty Work Here
		     */
		    var slowScroll = currentScrollY / 4
		      , blurScroll = currentScrollY * 6 
		      , scaleScroll = currentScrollY / 6
		      , opacity     = ((currentScrollY * 100) / hHeight) / 100;
		    
		    $content.css({
		      'transform'         : 'translateY(-' + slowScroll + 'px)',
		      '-moz-transform'    : 'translateY(-' + slowScroll + 'px)',
		      '-webkit-transform' : 'translateY(-' + slowScroll + 'px)'
		    });
		    
		    $blur.css({
		      '-webkit-filter' : 'blur(' + (blurScroll / wHeight) + 'px)',
		      'transform'      : 'scale(' + ((scaleScroll / wHeight) + 1.1) + ')',
		      'opacity'        : opacity
		    });
		  }
		};
		
		/**
		 * Attach!
		 */
		var scroller = new Scroller();  
		scroller.init();