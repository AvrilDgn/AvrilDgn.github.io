(function ($) {
	$(".slider .owl-carousel").owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		smartSpeed: 500,
		items: 1,
		autoplay: false,
		autoplayTimeout: 3000,
		autoplayHoverPause: false,
	});

	$(".carousel .owl-carousel").owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		smartSpeed: 500,
		items: 1,
	});

	$('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	$('.serv-menu').on('click', function () {
		$(this).toggleClass('serv-menu--opened');
	});

	$('.gallery__slider').slick({
		rows: 3,
		dots: false,
		arrows: true,
		prevArrow: $('.gallery__arrow--prev'),
		nextArrow: $('.gallery__arrow--next'),
		infinite: true,
		speed: 300,
		slidesToShow: 6,
		slidesToScroll: 3,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 575,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		],
	});

	$('.lazy').Lazy();
})(jQuery);