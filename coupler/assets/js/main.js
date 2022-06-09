/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

$(document).ready(function () {

	//masked input phone
	$("input[type='tel']").mask("+7 (999) 999-99-99", { placeholder: "_" });

	// menufixed
	let header = $(".header"),
		main = $(".main");

	let headerFixation = function () {
		if ($(window).scrollTop() > 10) {
			header.addClass("header--fixed");
			main.css("padding-top", header.height());
		} else {
			header.removeClass("header--fixed");
			main.css("padding-top", '');
		}
	}

	headerFixation();
	$(window).on("scroll", headerFixation);

	//scroll
	$(document).on("click", 'a[href^="#"]', function (t) { t.preventDefault(), $("html, body").animate({ scrollTop: $($.attr(this, "href")).offset().top }, 500) });

	//paralax 
	if (window.innerWidth > 800) {
		var lFollowX = 0,
			lFollowY = 0,
			x = 0,
			y = 0,
			friction = .02;

		function paralaxbg() {
			translate = "translate(" + .5 * (x += (lFollowX - x) * friction) + "px, " + .5 * (y += (lFollowY - y) * friction) + "px) scale(1.1)",
				translate2 = "translate(" + 2 * x + "px, " + 2 * y + "px) scale(1.1)",
				translate3 = "translate(" + 2 * x + "px, " + 2 * y + "px) scale(1.1)",
				$(".parbg").css({ "-webit-transform": translate, "-moz-transform": translate, transform: translate }),
				$(".parbg2").css({ "-webit-transform": translate2, "-moz-transform": translate2, transform: translate2 }),
				$(".parbg3").css({ "-webit-transform": translate3, "-moz-transform": translate3, transform: translate3 }),
				window.requestAnimationFrame(paralaxbg)
		}

		$(window).on("mousemove", function (a) {
			var xPos = Math.max(-100, Math.min(100, $(window).width() / 2 - a.clientX)),
				yPos = Math.max(-100, Math.min(100, $(window).height() / 2 - a.clientY));
			lFollowX = 25 * xPos / 100,
				lFollowY = 25 * yPos / 100
		}),

			paralaxbg();
	};

	//tabs
	$(".portfolio__tabs .portfolio__tab").on("click", function (a) {
		a.preventDefault(),
			$(".portfolio__tabs .portfolio__tab").removeClass("portfolio__tab--active"),
			$(this).addClass("portfolio__tab--active"),
			$(".portfolio__tab-content-wrapper .portfolio__tab-content").removeClass("portfolio__tab-content--active");
		let href = $(this).attr("data-href");
		$(".portfolio__tab-content-wrapper #" + href).addClass("portfolio__tab-content--active");
	});

	$(".portfolio__tab-content").each(function () {
		let id = $(this).attr("id");

		$("#" + id + " .thumbs__img").on("click", function () {
			$("#" + id + " .thumbs__img--active").removeClass("thumbs__img--active"),
				$(this).addClass("thumbs__img--active");

			let src = $(this).find("img").attr("src");
			$("#" + id + " .portfolio__big-img").find("img").attr("src", src)
		})
	});

	//карта
	function init() {
		(myMap = new ymaps.Map("map", { center: [55.71231956901403, 37.66280249999997], behaviors: ["default"], zoom: 16, controls: ["zoomControl", "fullscreenControl"] })).behaviors.disable(["rightMouseButtonMagnifier", "scrollZoom"]);
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { myMap.behaviors.disable('drag'); }; myPlacemark1 = new ymaps.Placemark([55.71231956901403, 37.66280249999997], {}, { iconLayout: "default#image", iconImageHref: "assets/img/map-pin.png", iconImageSize: [73, 97], iconImageOffset: [-36.5, -97] }), myMap.geoObjects.add(myPlacemark1); 2
	} ymaps.ready(init); var myMap;



	//menu
	$(".header__toggle-btn").click(function (e) {
		$(".header__mobile-menu").toggleClass(".header__mobile-menu--active"),
			e.preventDefault()
	}),
		$(".header__toggle-btn, section, .alinks").click(function () {
			$(".header__mobile-menu").removeClass(".header__mobile-menu--active")
		});


	//more reviews
	let reviewsCount = $(".reviews__item").length,
		reviewsToggleCount = Math.ceil(reviewsCount / 3),
		reviewsToggleCur = reviewsToggleCount - 1;

	if (reviewsToggleCur < 1) $('.reviews__btn').css('display', 'none');

	$(".reviews__btn").click(function (e) {
		e.preventDefault();

		$(".reviews__list").css('transform', 'translateX(-' + 100 * (reviewsToggleCount - reviewsToggleCur) + '%)'),

			(--reviewsToggleCur < 1) ? $(this).stop().animate({
				opacity: 0,
			}, 800, function () {
				$(this).remove();
			}
			) : null;
	});


	//fancybox change close btn
	$('.modal-close').click(function (e) {
		e.preventDefault();
		$.fancybox.close();
	});


	//Проверка формы
	$("form .button").click(function (e) {
		let t = $(this).closest("form"),
			i = !0;

		t.find("input[required]").each(function () {
			let e = $(this).val();
			e && "" != e || ($(this).addClass("error"), i = !1)
		}),
			i || e.preventDefault()
	}),
		$(".required").focus(function () {
			var e = $(this);
			e.removeClass("error"),
				$("span.error", e).fadeOut()
		}),
		$(document).on("change", "input[name='checkbox']", function (e) {
			var t = $(this).closest("form");
			$(this).is(":checked") ? t.find('button[type="submit"]').removeClass("disabled") : (t.find('button[type="submit"]').addClass("disabled"),
				t.find('button[type="submit"]').off("click"))
		}),
		$(".metrreq").keypress(function (e) {
			if (8 != e.which && 0 != e.which && (e.which < 48 || 57 < e.which)) return !1
		});


});

/***/ })
/******/ ]);