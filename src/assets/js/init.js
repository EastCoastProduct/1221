/* ==================================================
//  ____  _     _   _            _   _          _____ _
// |  _ \(_)___| |_(_)_ __   ___| |_(_)_   ____|_   _| |__   ___ _ __ ___   ___  ___
// | | | | / __| __| | '_ \ / __| __| \ \ / / _ \| | | '_ \ / _ \ '_ ` _ \ / _ \/ __|
// | |_| | \__ \ |_| | | | | (__| |_| |\ V /  __/| | | | | |  __/ | | | | |  __/\__ \
// |____/|_|___/\__|_|_| |_|\___|\__|_| \_/ \___||_| |_| |_|\___|_| |_| |_|\___||___/
//
/* ================================================*/

$(document).ready(function(){
    'use strict';

    // ANIMATED ONLY IF NOT AT TOP OF PAGE ON LOAD //
    var $win = $(window);
    if ($win.scrollTop() == 0)
        jQuery('.navbar-fixed-top').addClass('wow');
    else if ($win.height() + $win.scrollTop() == $(document).height()) {
         jQuery('.navbar-fixed-top').removeClass('wow');
    }

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // $('.lb-link').magnificPopup({
    //   type: 'image'
    // });

    //WORD ROTATE
    $('.wodry').wodry({
        animation: 'rotateX',
        delay: 2000,
        animationDuration: 1000
    });
});

$(function() {
    'use strict';
    // DIRECTION AWARE HOVER //
    $(' .direction-aware li ').each( function() {
      $(this).hoverdir();
    });

    // FULLSCREEN FIX //
    var windowHeight = $(window).innerHeight();
    var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if( !isMobileDevice ) {
      $('#headerwrap.fullheight').css('height', windowHeight);
    }

    // ANIMATE ONCE PAGE LOAD IS OVER //
    Pace.on("done", function(){
        new WOW().init();
    });

    function scrollToLink(link) {
      var $href = $(link).attr('href');
      var $anchor = $($href).offset();
      $('html, body').animate({ scrollTop: $anchor.top });
    }

    $('a.page-scroll').click(function(){
      scrollToLink(this);
      return false;
    });

    $('nav ul').find('a').click(function(){
      scrollToLink(this);
      return false;
    });

    $('.entry-content table, #post-content table').addClass('table');
    $('.entry-content dl, #post-content dl').addClass('dl-horizontal');
});

    // ONEPAGER XTRA //
    $('body').scrollspy({
        target: '.navbar-fixed-top'
    })

/*-----------------------------------------------------------------------------------*/
/*  PRELOADER
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function() {
"use strict";

  jQuery(window).trigger('resize');

  jQuery('a:not([target="_blank"]):not([href*=#]):not([href^=mailto]):not(.fancybox-media):not(.btn.responsive-menu):not(a[href$="jpg"]):not([href$="jpeg"]):not(a[href$="gif"]):not(a[href$="png"]):not(a.ajax-link)').click(function(){
    var href = jQuery(this).attr('href');
    jQuery('.preloader').fadeIn(600);
    setTimeout(function(){
      window.location = href;
    }, 650);
    return false;

  });

});
