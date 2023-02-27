jQuery(function ($) {
    'use strict';

    // Menu
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $('.main-nav').addClass('menu-shrink');
        } else {
            $('.main-nav').removeClass('menu-shrink');
        }
    });	

    // Mean Menu
    jQuery('.mean-menu').meanmenu({
        meanScreenWidth: '991'
    });

    // Sidebar Modal
	$('.modal a').not ('.dropdown-toggle').on('click', function() {
		$('.modal').modal ('hide');
	});

    // Search JS
    $('#close-btn').on('click', function() {
        $('#search-overlay').fadeOut();
        $('#search-btn').show();
    });
    $('#search-btn').on('click', function() {
        $('#search-overlay').fadeIn();
    });

    // Wow 
    new WOW().init();

	// Testimonials Slider
	$('.testimonials-slider').owlCarousel({
		items: 1,
		loop: true,
		margin: 30,
		singleItem: true,
		nav: true,
		dots: false,
		autoplay: false,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,  
        navText: [
			"<i class='bx bx-left-arrow-alt'></i>",
			"<i class='bx bx-right-arrow-alt'></i>"
		],
	});

    // Partner Slider
	$('.partner-slider').owlCarousel({
		loop: true,
		margin: 30,
		singleItem: true,
		nav: false,
		dots: false,
		autoplay: false,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,  
        responsive:{
            0:{
                items: 2,
            },
            600:{
                items: 3,
            },
            1000:{
                items: 5,
            }
        }
	});

    // Feedback Slider
	$('.feedback-slider').owlCarousel({
		loop: true,
		margin: 15,
		singleItem: true,
		nav: false,
		dots: true,
		autoplay: false,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,  
        responsive:{
            0:{
                items: 1,
            },
            600:{
                items: 2,
            },
            1000:{
                items: 3,
            }
        }
	});

    // Magnific Popup
	$('.popup-youtube').magnificPopup({
		disableOn: 300,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

    // Number 
	$('.minus').on('click', function() {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.plus').on('click', function() {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

    // Tabs
	$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
	$('.tab ul.tabs li a').on('click', function (g) {
		var tab = $(this).closest('.tab'), 
		index = $(this).closest('li').index();
		tab.find('ul.tabs > li').removeClass('current');
		$(this).closest('li').addClass('current');
		tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
		tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
		g.preventDefault();
	});

    // Accordion 
	$('.accordion > li:eq(0) .faq-head').addClass('active').next().slideDown();
	$('.accordion .faq-head').on('click', function(j) {
		var dropDown = $(this).closest('li').find('.faq-content');
		$(this).closest('.accordion').find('.faq-content').not(dropDown).slideUp(300);
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).closest('.accordion').find('.faq-head.active').removeClass('active');
			$(this).addClass('active');
		}
		dropDown.stop(false, true).slideToggle(300);
		j.preventDefault();
	});

    // Loader
    jQuery(window).on('load',function(){
        jQuery('.loader').fadeOut(500);
    });

    // Go Top
	$(function(){
		$(window).on('scroll', function(){
			var scrolled = $(window).scrollTop();
			if (scrolled > 500) $('.go-top').addClass('active');
			if (scrolled < 500) $('.go-top').removeClass('active');
		});  
		$('.go-top').on('click', function() {
			$('html, body').animate({ scrollTop: '0' },  500);
		});
    });  

    // Subscribe Form JS
    $('.newsletter-form').validator().on('submit', function (event) {
        if (event.isDefaultPrevented()) {
            // Hande the invalid form...
            formErrorSub();
            submitMSGSub(false, 'Please enter your email correctly.');
        } else {
            // Everything looks good!
            event.preventDefault();
        }
    });
    function callbackFunction (resp) {
        if (resp.result === 'success') {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }
    function formSuccessSub(){
        $('.newsletter-form')[0].reset();
        submitMSGSub(true, 'Thank you for subscribing!');
        setTimeout(function() {
            $('#validator-newsletter').addClass('hide');
        }, 4000)
    }
    function formErrorSub(){
        $('.newsletter-form').addClass('animated shake');
        setTimeout(function() {
            $('.newsletter-form').removeClass('animated shake');
        }, 1000)
    }
    function submitMSGSub(valid, msg){
        if(valid){
            var msgClasses = 'validation-success';
        } else {
            var msgClasses = 'validation-danger';
        }
        $('#validator-newsletter').removeClass().addClass(msgClasses).text(msg);
    }

    // AJAX Mail Chimp JS
    $('.newsletter-form').ajaxChimp({
        url: 'https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9', // Your url MailChimp
        callback: callbackFunction
    });
}(jQuery));