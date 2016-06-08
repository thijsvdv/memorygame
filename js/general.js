(function($) {
  $('input').each(function() {
    $(this)
      .focus(function() {
        if($(this).val() === $(this).attr('rel')) $(this).val('');
      })
      .blur(function() {
        if($(this).val() === '') $(this).val($(this).attr('rel'));
      })
      .blur();
  });

  // Empty fields before submit, if they have not been altered
  $('form').submit(function() {
    $('input').each(function() {
      if($(this).val() === $(this).attr('rel')) $(this).val('');
    });
  });

  // Smooth scroll
  $('a[href*=#]:not([href=#])').click(function() {
    $(this).addClass('active').siblings().removeClass('active');

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('.content').animate({
          scrollTop: target.position().top
        }, 500);

        return false;
      }
    }
  });

  // GA
  $('[data-category]').click(function() {
    var category = $(this).attr('data-category'),
        label = $(this).attr('data-label');
    console.log('SEND GA EVENT');
    ga('send', 'event', { eventCategory: category, eventAction: 'click', eventLabel: label, eventValue: 1});
  });
  
  
  // Animations
  var scale = 1;
  var opacity = 1;
  var top = 0;
  $('body').append('<style type="text/css" id="styler"></style>');

  $('.slice, .prices__final').css('opacity', 0);
  
  var scroll = window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             // IE Fallback, you can even fallback to onscroll
             function(callback){ window.setTimeout(callback, 1000/60) };
  
  var masking = false;
  if ( document.body.style[ 'webkitMaskRepeat' ] !== undefined ) {
    $('.bottle').addClass('masking');
    masking = true;
  } else {
    
  }
  
  var top = 0;
  var shine = 0;
  var prev_top = 0;
  function anim() {
    top = window.pageYOffset;
    if(top !== prev_top) {
      shine = 100-5*top;
      scale = 1+top/1000;
      opacity = 1-top/300;
      prev_top = top;
      
      $('.bottle').css('transform', 'translateX(-53%) translateY(-' + 0.4*top + 'px)');
      $('.bottle_bg').css('transform', 'translateX(-50%) translateY(-' + 0.2*top + 'px)');
      $('.bottle_shadow').css({
        transform: 'scale(' + scale + ') translateZ(0) translateX(-50%) translateY(70%)',
        opacity: opacity
      });
      
      if(masking) {
        $('#styler').html(`
          .bottle::after {
            background-position: 0 ${shine}px
          }
        `);
      }
      
      $('.slice, .prices__final').css('opacity', (top-100)/500);
    }
    
    scroll(anim);
  }
  if($('.bottle').length > 0) anim();
  
  
})(jQuery);