$(document).ready(function() {
	/*slick slider*/
	$('.slider__blocks').slick({
		autoplay: true,
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	/*fixed header*/
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){
			$('.header').addClass("fixed");
			$('.header__top').append($('.header__bottom>.search'));

		}
		else{
			$('.header').removeClass("fixed");
			$('.header__bottom').append($('.header__top>.search'));
		}
	});

	/*account*/
	var account = $('.account');
	/*click on "menu-outline" and open popap with menu*/
	$('.user-panel__avatar').click(function(e) {
		e.preventDefault();
	    account.css('display', 'block');
	});
	/*click on ".popup__close" and close popap*/
	$('.account__close').click(function(e) {
		e.preventDefault();
	    account.css('display', 'none');
	});

});