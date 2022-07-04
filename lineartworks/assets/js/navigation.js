;(function($) {
	$('.header-menu').hover(function() {
		if ($('.header-menu').hasClass('active')) {
			$('.header-menu .menu li').on('click', function() {
				$(this).find('.sub-menu').slideToggle('fast');	
			});
		} else {
			$('.header-menu .menu li').hover(function() {
				$(this).find('.sub-menu').slideDown('fast')	
			}, function() {
				$(this).find('.sub-menu').slideUp('fast')	

			});
		}
	});
	$('.menu__links-main .menu li').on('click', function() {
		$(this).find('.sub-menu').slideToggle('fast');	
	});
})(jQuery);