$(document).ready(function() {
	

	/*mobil menu*/
	menuShow = true;
	body = $('body');
	menu = $(".menu-mob");
	menuBtn = $(".header__menu_btn a");

	menuBtn.click(function (e) {
		e.preventDefault();
		link = $(this).find('i');

		if (menuShow) {
			link.removeClass('icon-menu-1');
			link.addClass('icon-cancel-1');
			link.parent().parent().css('font-size', '30px');
			menu.removeClass('d-none');
			body.addClass('menu_active');
			menuShow = false;
		} else {
			link.removeClass('icon-cancel-1');
			link.addClass('icon-menu-1');
			link.parent().parent().css('font-size', '51px');
			menu.addClass('d-none');
			body.removeClass('menu_active');
			menuShow = true;		
		}
	});
	$(".header__nav-menu a").click(function (e) {
		e.preventDefault();
		link = menuBtn.find('i');
		
		link.removeClass('icon-cancel-1');
		link.addClass('icon-menu-1');
		link.parent().parent().css('font-size', '51px');
		menu.addClass('d-none');
		body.removeClass('menu_active');
		menuShow = true;
	});

	/*smooth animation(anchor)*/
	headerLinks = $('.header__nav-menu').find('a');
	footerLinks = $('.footer__contacts').find('a');

	headerLinks.on("click", function (e) {
		AnchorScroll(e, this);
	});
	footerLinks.on("click", function (e) {
		AnchorScroll(e, this);
	});

	function AnchorScroll (e, link) {
		e.preventDefault();

		var target = link.hash,
		$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
			}, 500, 'swing', function () {
			window.location.hash = target;
		});
	}

	/*slider*/
	$('.slider__blocks').slick({
		arrows: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="icon-left-open-3 slider__arrow_left"></div>',
		nextArrow: '<div class="icon-right-open-3 slider__arrow_right"></div>',
		
		responsive: [
		{
			breakpoint: 991,
			settings: {
				arrows: false,
			}
		},
		]
	});

	/*media*/
	var logoObj = $('.header__logo img');
	var logoImgMobile = "img/logo_mob.png";
	var logoImgDesktop = "img/logo.png";
	var mql_md = window.matchMedia("only screen and (max-width: 991px)");  
 
	mql_md.addListener(md_setup_for_width);
 	md_setup_for_width(mql_md); 

	function md_setup_for_width(mql) {
		if (mql.matches && logoObj.attr("src") === "img/logo.png") {
			logoObj.attr("src", logoImgMobile);
		} else if (!mql.matches && logoObj.attr("src") === "img/logo_mob.png") {
			logoObj.attr("src", logoImgDesktop);
		}
	}

});