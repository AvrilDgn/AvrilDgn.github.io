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
	$(".phone").mask("+7 (999) 999-99-99", { placeholder: "_" });

	//menu
	$(".menudef").click(function (e) { $(".head_menu").toggleClass("activemenu"), $("#mysidenav").toggleClass("width250"), e.preventDefault() }), $(".closebtn, section, .alinks").click(function () { $(".head_menu").removeClass("activemenu"), $("#mysidenav").removeClass("width250") });

	//paralax 
	if (window.innerWidth > 800) { var lFollowX = 0, lFollowY = 0, x = 0, y = 0, friction = .02; function paralaxbg() { translate = "translate(" + .5 * (x += (lFollowX - x) * friction) + "px, " + .5 * (y += (lFollowY - y) * friction) + "px) scale(1.1)", translate2 = "translate(" + 2 * x + "px, " + 2 * y + "px) scale(1.1)", translate3 = "translate(" + 2 * x + "px, " + 2 * y + "px) scale(1.1)", $(".parbg").css({ "-webit-transform": translate, "-moz-transform": translate, transform: translate }), $(".parbg2").css({ "-webit-transform": translate2, "-moz-transform": translate2, transform: translate2 }), $(".parbg3").css({ "-webit-transform": translate3, "-moz-transform": translate3, transform: translate3 }), window.requestAnimationFrame(paralaxbg) } $(window).on("mousemove", function (a) { var t = Math.max(-100, Math.min(100, $(window).width() / 2 - a.clientX)), r = Math.max(-100, Math.min(100, $(window).height() / 2 - a.clientY)); lFollowX = 25 * t / 100, lFollowY = 25 * r / 100 }), paralaxbg(); };

	// menufixed
	$(window).on("scroll", function () { var o = $("#header"); 10 < $(window).scrollTop() ? o.addClass("header--fixed") : o.removeClass("header--fixed") });

	//moreless
	var prmCount = 3, toggleCount = 3, totalCnt = $("#block_otziv .col3").length; $(".morelink").click(function (o) { o.preventDefault(), $("#block_otziv .lesslink").removeClass("hiddeni"); for (var l = prmCount + $("#block_otziv .col3.active").length, t = l + toggleCount, i = l; i < t; i++)$("#block_otziv").find(".col3").eq(i).addClass("active"); (l = prmCount + $("#block_otziv .col3.active").length) == totalCnt && $(this).addClass("hiddeni") }), $(".lesslink").click(function (o) { o.preventDefault(), $("#block_otziv .morelink").removeClass("hiddeni"), $("#block_otziv").find(".col3").removeClass("active"), $(this).addClass("hiddeni") });

	//scroll
	$(document).on("click", 'a[href^="#"]', function (t) { t.preventDefault(), $("html, body").animate({ scrollTop: $($.attr(this, "href")).offset().top }, 500) });

	//перенос данных в форму с первой формы
	$(".radio2").on("change", function (a) { var n = $(this).val(); $("#popup_main input[name='kolvo1']").val(n) }), $(".radio1").on("change", function (a) { var n = $(this).val(); $("#popup_main input[name='type1']").val(n) });
});

//Проверка формы
$("form .btn_or").click(function (e) { var t = $(this).closest("form"), i = !0; t.find(".required").each(function () { var e = $(this).val(); e && "" != e || ($(this).addClass("error"), i = !1) }), i || e.preventDefault() }), $(".required").focus(function () { var e = $(this); e.removeClass("error"), $("span.error", e).fadeOut() }), $(document).on("change", "input[name='checkbox']", function (e) { var t = $(this).closest("form"); $(this).is(":checked") ? t.find('button[type="submit"]').removeClass("disabled") : (t.find('button[type="submit"]').addClass("disabled"), t.find('button[type="submit"]').off("click")) }), $(".metrreq").keypress(function (e) { if (8 != e.which && 0 != e.which && (e.which < 48 || 57 < e.which)) return !1 });

//tabs
$(".portfolio__tabs .portfolio__tab").on("click", function (a) { 
	a.preventDefault(), 
	$(".portfolio__tabs .portfolio__tab").removeClass("portfolio__tab--active"),
	$(this).addClass("portfolio__tab--active"), 
	$(".portfolio__tab-content-wrapper .portfolio__tab-content").removeClass("portfolio__tab-content--active"); 
	let href = $(this).attr("data-href"); 
	$(".portfolio__tab-content-wrapper #" + href).addClass("portfolio__tab-content--active") ;
});

//карта
function init() {
	(myMap = new ymaps.Map("map", { center: [55.71231956901403, 37.66280249999997], behaviors: ["default"], zoom: 16, controls: ["zoomControl", "fullscreenControl"] })).behaviors.disable(["rightMouseButtonMagnifier", "scrollZoom"]);
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { myMap.behaviors.disable('drag'); }; myPlacemark1 = new ymaps.Placemark([55.71231956901403, 37.66280249999997], {}, { iconLayout: "default#image", iconImageHref: "assets/img/map-pin.png", iconImageSize: [73, 97], iconImageOffset: [-36.5, -97] }), myMap.geoObjects.add(myPlacemark1); 2
} ymaps.ready(init); var myMap;



/***/ })
/******/ ]);