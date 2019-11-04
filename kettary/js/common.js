$('document').ready(function() {

	$('.single-slider__content').slick({
		dots: true,
		autoplay: true,
		nextArrow: '<i class="arrow slider__arrow slider__arrow_next"></i>',
		prevArrow: '<i class="arrow slider__arrow slider__arrow_prew"></i>',
		customPaging: function(slider, i) {
			return '<div class="slider__dot"></div>';
		},
		responsive: [
		    {
		      	breakpoint: 768,
		      	settings: {
			        arrows: false,
		    	}
	    	},
	    ],
	});

	// review slider
	var rev_elements = $('.reviews-slider__item'),
		rev_container = $('.reviews-slider__content'),
		rev_elements_count = rev_elements.length;

	$('.reviews-slider__img').append("<div class='reviews-slider__overlay'></div>");

	if (rev_elements_count == 3)
		rev_elements.clone().appendTo(rev_container);

	$('.reviews-slider__content').slick({
		arrows: true,
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 3,
		infinite: true,
		nextArrow: '<i class="arrow slider__arrow slider__arrow_next reviews-slider__arrow_next"></i>',
		prevArrow: '<i class="arrow slider__arrow slider__arrow_prew reviews-slider__arrow_prew"></i>',
		responsive: [
		    {
		      	breakpoint: 992,
		      	settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1,
					centerMode: false,
		    	}
	    	},
	    ],
	});

	// $('.reviews-slider__arrow_next').on('click', function(){
	// 	$('.reviews-slider__content').slick("slickNext");
	// });

	// var rev_center_element = $('.slick-center'),
	// 	index_center_element = $('.reviews-slider__content').index(rev_center_element);	//index center's element
	// index_center_element.removeClass('slick-center');

	// rev_elements.eq(index_center_element++).addClass('slick-center');

	/*fixed header and anchor*/
	$(window).scroll(function() {
		var cur_position = $(this).scrollTop();
		if (cur_position > 1){
			$('.top-menu').css('position', 'fixed');
		}
		else{
			$('.top-menu').css('position', 'relative');
		}
		if (cur_position > 401){
			$('.anchor-up').removeClass('anchor-up_disabled');
		}
		else{
			$('.anchor-up').addClass('anchor-up_disabled');
		}
	});

	/*smooth animation(anchor)*/
	$('.top-menu-nav__list').on("click", "a", function (e) {
		e.preventDefault();

		var target = this.hash,
		$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
			}, 600, 'swing', function () {
			window.location.hash = target;
		});
	});
	$('.our-groups__arrow').on("click", function (e) {
		e.preventDefault();

		$('html, body').stop().animate({
			'scrollTop': 0
			}, 600, 'swing');
	});

	// phone mask
    $(function() {
        $(".popup-phone__input").mask("+7 (999) 999 99 99", {
	        placeholder: " ", 
	        autoclear: false, 
     	});
    });

    // popup open
    var is_popup = false;
    $('.js_open_popup').on("click", function () {
		$('.popup-phone__error').removeClass('popup-phone__error_active');
    	$('.popup').addClass('popup_active');
        $(".popup").css('opacity', '0');
    	setTimeout(function(e) {
	        is_popup = true;
	        $(".popup").css('opacity', '1');
	      	e.stopPropagation();
		}, 500);
	});

    // popup close 
    $(document).on('click', function (e) {
        if (!$('.popup__overlay').has(e.target).length) { 
        	Close_Popup();
        }
    });
	$(".popup__close-btn").on('click', function () {
        Close_Popup();
    });
    function Close_Popup() {
    	if (is_popup) {
	    	$(".popup_active").css('opacity', '0');
	    	setTimeout(function(e) {
		        $('.popup_active').removeClass('popup_active');
				$(".popup-phone").css('opacity', '1');
				$(".popup-phone").removeClass('popup-phone_disabled');
				$(".popup-thanks").addClass('popup-thanks_disabled');
		        is_popup = false;
		      	e.stopPropagation();
			}, 500);
	    }
    }


	/*unfolding groups*/
	// toutch link
	$('.groups-details__uncover').on("click", function (e) {
		e.preventDefault();

		$(this).parent().addClass('groups-details__item_full');
		$(this).remove();
	});

	var mql = window.matchMedia('(min-width: 992px)');
	var navbar =  $('.our-groups__left-side');  // navigation block
	var wrapper = $('.our-groups');        // may be: navbar.parent();
	var is_lg = mql.matches;

	mql.addListener(ChangeScreen);

	$(window).scroll(function(){
		if(mql.matches) {
		    var nsc = $(document).scrollTop();
		    var bp1 = wrapper.offset().top;
		    var bp2 = bp1 + wrapper.outerHeight() - 70 - $(window).height();
		    
		    if (nsc>bp1) {  navbar.css('position','fixed'); }
		    else { navbar.css('position','absolute'); }
		    if (nsc>bp2) { navbar.css({
		    	position: 'absolute',
		    	bottom: '70px',
		    	top: 'auto',
		    })} else {
		     	navbar.css('top', '100px'); 
		 	}
	 	}
	});

	$('.groups-details-heading').on("click", function () {
		if(!mql.matches) {
	    	$(this).children('.triangle').toggleClass('triangle_down');
	    	$(this).parent().toggleClass('groups-details__item_full');
	    }
	});

	/* form send ajax*/
	$(function(){
		'use strict';
		$('#form').on('submit', function(e){
			e.preventDefault();
			var fd = new FormData( this );
			$.ajax({
				url: '../send.php',
				type: 'POST',
				contentType: false, 
				processData: false, 
				data: fd,
				success: function(msg){
					if(msg == 'ok') {
					   	ChangeModal(); 
					} else {
						$('.popup-phone__error').addClass('popup-phone__error_active');
					}
				}
			});
		});
	});


	/*y-map*/
	ymaps.ready(function () {
	    var myMap = new ymaps.Map('map', {
	            center: [45.237890, 38.991510],
	            zoom: 14,
	            controls: ['zoomControl']
	        }, {
	            searchControlProvider: 'yandex#search'
	        }),

	        // Создаём макет содержимого.
	        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
	            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
	        );

		    myMap.geoObjects
		        .add(new ymaps.Placemark([45.240509, 38.988680], {
		            balloonContent: '<strong>Краснодарский</strong> край, <strong>Динской</strong> район, ст. <strong>Новотитаровская</strong>, ул <strong>Ленина 91а</strong>, второй этаж.',
		            iconCaption: 'Кеттери - территория чудес',
		        }, {
		            preset: 'islands#icon',
		            iconColor: '#0095b6',
		            // iconImageSize: [48, 48],
		        }));
	        myMap.behaviors.disable('scrollZoom'); 
	        /*myMap.behaviors.disable('drag');*/
	        // map.behaviors.disable('multiTouch');
	});

});

function ChangeModal() {
	$(".popup-phone").css('opacity', '0');
	setTimeout(function() {
		$(".popup-phone").addClass('popup-phone_disabled');
		$(".popup-thanks").removeClass('popup-thanks_disabled');
		$(".popup-thanks").css('opacity', '0');
	}, 500);
	setTimeout(function() {
		$(".popup-thanks").css('opacity', '1');
	}, 600);
}

function Check_Phone_Input(phone_input) {
	var numb_count = phone_input.value.match(/[0-9]/g).length,
		popup_button = $('.popup-phone__button');

	if (numb_count < 11) {
		popup_button.prop('disabled', true);
	} else {
		popup_button.prop('disabled', false);
	}
}

function ChangeScreen(e) {
	if(e.matches) {
	    $('.our-groups__left-side').css({
	    	position: 'absolute',
	    	bottom: '70px',
	    	top: 'auto',
	    });
	    $('.groups-details__item').removeClass('groups-details__item_full');
    	$('.triangle').removeClass('triangle_down');
    	$('.triangle').addClass('triangle_down');
        myMap.behaviors.disable('scrollZoom'); 
        myMap.behaviors.enable('drag');
	}
	else {
	    $('.our-groups__left-side').css({
	    	position: 'relative',
	    	bottom: 'auto',
	    	top: 'auto',
	    });
	    $('.groups-details__item').removeClass('groups-details__item_full');
    	$('.triangle').removeClass('triangle_down');
    	$('.triangle').addClass('triangle_down');
        myMap.behaviors.enable('scrollZoom'); 
        myMap.behaviors.disable('drag');
	}
}