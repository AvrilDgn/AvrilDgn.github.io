$(document).ready(function() {
	var menuBtn = $('.header-menu_btn');
	var menuNav = $('.header-menu_nav-panel');

	menuBtn.on('click', function(event) {
		event.preventDefault();
		menuNav.toggleClass('header-menu_nav-panel__active');
	});

	$('.filter_item').on('click', function(event) {
		$('#active').removeAttr('id');
		$(this).attr('id', 'active');
		var filter = $(this).data('filter_item');

		$('.data-work-example').each(function(i,elem) {
			if ($(this).data('work-example') == filter || filter == 'all') {
				$(this).removeClass('d-none');
			}
			else {
				$(this).addClass('d-none');
			}
		});
	});

	$('.teamates').slick({
		arrows: false,
		dots: true,
		slidesToShow: 4,
		slidesToScroll: 2,
		responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2
			}
		}
		]
	});
	$('.clients').slick({
		arrows: false,
		dots: true,
		slidesToShow: 5,
		slidesToScroll: 2,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 2
			}
		}
		]
	});
	$('.testimonials').slick({
		arrows: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
});