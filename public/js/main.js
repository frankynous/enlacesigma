jQuery(document).ready(function ($) {

  $('#tempModal').modal('show');

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#logo').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#logo').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

var scrollingBtn = (function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('mouseup', scrollingBtn);

  //Toggle Services
  $('.service0Btn').on('mousedown', function () {
    $('.service-class').addClass('invisible');
    $('#service0').removeClass('invisible');
    $('#service0').addClass('visible');
  });
  
  $('.service1Btn').on('mousedown', function () {
    $('.service-class').addClass('invisible');
    $('#service1').removeClass('invisible');
    $('#service1').addClass('visible');
  });

  $('.service2Btn').on('mousedown', function () {
    $('.service-class').addClass('invisible');
    $('#service2').removeClass('invisible');
    $('#service2').addClass('visible');
  });
  
  $(function () {
    var $content = $('#jsonContent');
    var data = {
      rss_url: 'https://medium.com/feed/@frankynous'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
      if (response.status == 'ok') {
        var output = '';
        $.each(response.items, function (k, item) {
          var visibleSm;
          if (k < 3) {
            visibleSm = '';
          } else {
            visibleSm = ' visible-sm';
          }
          output += '<div class="col-sm-6 col-md-4' + visibleSm + '">';
          output += '<div class="blog-post"><header>';
          output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";
          var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
          var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
          var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
          var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
          var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
          output += '<div class="blog-element"><img class="img-responsive" src="' + src + '" width="360px" height="240px"></div></header>';
          output += '<div class="blog-content"><h4><a href="' + item.link + '">' + item.title + '</a></h4>';
          output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
          var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
          var maxLength = 120 // maximum number of characters to extract
          //trim the string to the maximum length
          var trimmedString = yourString.substr(0, maxLength);
          //re-trim if we are in the middle of a word
          trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
          output += '<p>' + trimmedString + '...</p>';
          output += '</div></div></div>';
          return k < 3;
        });
        $content.html(output);
      }
    });
  });

  // Porfolio filter
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // custom code

});
