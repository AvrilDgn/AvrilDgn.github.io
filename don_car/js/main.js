$(document).ready(function() {
	/*slick slider*/
	$('.slider__blocks').slick({
		dots: false,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	/*mask*/
	$(function(){
	  	$(".wpcf7-tel.wpcf7-validates-as-tel").mask("+7 (999) 999-99-99");
	});

	/*smooth animation(anchor)*/
	$('a[href^="#"]').click(function(){
		var el = $(this).attr('href');
		$('.wrapper').animate({
			scrollTop: $(el).offset().top}, 1000);
		return false;
	});

	/*parallax*/
	/*$('.wrapper').scroll(function(){
		var leaves = $('.leaves__item');
		var howMuchScrolled = $('.wrapper').scrollTop();
  		var verticalScrollSpeed = howMuchScrolled / 2; 
  		var scrollDown = 0 - verticalScrollSpeed;
		leaves.css('transform', 'translateY(' + scrollDown + 'px)');

  		$('.con').text(howMuchScrolled);
	});*/

	var booking_modal = $('.js_booking_modal');
	var order_modal = $('.js_order_modal');
	var booking_close = $('.js_booking_close');
	var choice_car = $('.js_choice_car');
	var hire_car = $('.js_hire_car');
	var car_item = $('.js_car_item');

	choice_car.click(function (e) {
		e.preventDefault();
		booking_modal.css('display', 'flex');
	});
	hire_car.click(function (e) {
		e.preventDefault();
		order_modal.css('display', 'flex');
	});
	car_item.click(function (e) {
		e.preventDefault();
		order_modal.css('display', 'flex');
	});
	booking_close.click(function (e) {
		e.preventDefault();
		booking_modal.css('display', 'none');
	});
});