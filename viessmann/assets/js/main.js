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

document.addEventListener("DOMContentLoaded", function (domLoadedEvent) {

	/*
	//header fixation
	let header = document.querySelector('.header');

	function fixationHeader() {
		if (window.scrollY >= 100) {
			header.classList.add('header--fixed');
		} else {
			header.classList.remove('header--fixed');
		}
	}

	fixationHeader();
	window.addEventListener('scroll', fixationHeader);
	*/


	let radioDistricts = document.querySelectorAll('.departure__districts-item input');
	let mapDistricts = document.querySelectorAll('.departure__map svg path');


	mapDistricts.forEach(district => {
		let id = district.id;

		if (id && id !== '') {
			let radio = document.querySelector('.departure__districts-item input[value=' + id + ']');

			if (radio && radio !== '') {

				district.addEventListener('mouseenter', function (e) {
					radio.classList.add('hover');
				});

				district.addEventListener('mouseleave', function (e) {
					radio.classList.remove('hover');
				});

				district.addEventListener('click', function (e) {
					radio.checked = true;
					document.querySelector('.departure__map svg path.active').classList.remove('active');
					district.classList.add('active');
				});
			}
		}
	});

	radioDistricts.forEach(district => {
		let value = district.value;

		if (value && value !== '') {
			let target = document.querySelector('#' + value);

			if (target && target !== '') {

				district.parentElement.addEventListener('mouseenter', function (e) {
					target.classList.add('hover');
				});

				district.parentElement.addEventListener('mouseleave', function (e) {
					target.classList.remove('hover');
				});

				district.addEventListener('click', function (e) {
					document.querySelector('.departure__map svg path.active').classList.remove('active');
					target.classList.add('active');
				});
			}
		}
	});


	// let block = document.querySelector('.departure__districts-wrap');
	// let winPos = block.getBoundingClientRect().top + window.scrollY;
	// let height = block.offsetHeight;
	// let navbar_pb = parseInt(block.parentElement.style.paddingBottom);

	// window.addEventListener('scroll', function () {
	// 	let scrollPos = window.scrollY;

	// 	console.log(scrollPos);
	// 	console.log(winPos);


	// 	if (scrollPos >= winPos) {
	// 		block.parentElement.style.paddingBottom = height;
	// 		block.classList.add('fixed');
	// 	} else {
	// 		block.parentElement.style.paddingBottom = navbar_pb;
	// 		block.classList.remove('fixed');
	// 	}
	// })

	let step = 1;
	let maxStep = 3;
	let quizPrevBtn = document.querySelector('.quiz__step-btn--prev');
	let quizNextBtn = document.querySelector('.quiz__step-btn--next');
	let quizBodies = document.querySelectorAll('.quiz__body');
	let stepsCount = document.querySelector('.quiz__steps-count b');

	quizNextBtn.addEventListener('click', function (e) {
		step++;

		if (step >= maxStep) {
			quizNextBtn.classList.add('disabled');
		}
		quizPrevBtn.classList.remove('disabled');

		quizBodies.forEach(body => {
			if (+body.dataset.quizId === step) {
				body.classList.add('active');

				console.log(body.dataset.quizId);
				console.log(step);
				
			} else {
				body.classList.remove('active');
			}

		});

		stepsCount.textContent = 'шаг ' + step;
	});

	quizPrevBtn.addEventListener('click', function (e) {
		step--;

		if (step <= 1) {
			quizPrevBtn.classList.add('disabled');
		}
		quizNextBtn.classList.remove('disabled');

		quizBodies.forEach(body => {
			body.classList.remove('active');

			if (+body.dataset.quizId === step) {
				body.classList.add('active');
			}
		});

		stepsCount.textContent = 'шаг ' + step;
	});
});

/***/ })
/******/ ]);