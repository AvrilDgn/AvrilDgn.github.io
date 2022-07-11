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


class Accordion {
	constructor(target, config) {
		this._el = typeof target === 'string' ? document.querySelector(target) : target;
		const defaultConfig = {
			alwaysOpen: true,
			duration: 350,
			itemClass: 'accordion__item',
			headerClass: 'accordion__header',
			bodyClass: 'accordion__body',
		};
		this._config = Object.assign(defaultConfig, config);
		this.addEventListener();
	}
	addEventListener() {
		this._el.addEventListener('click', (e) => {
			const elHeader = e.target.closest('.' + this._config.headerClass);

			if (!elHeader) {
				return;
			}
			if (!this._config.alwaysOpen) {
				const elOpenItem = this._el.querySelector('.show');
				if (elOpenItem) {
					elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
				}
			}
			this.toggle(elHeader.parentElement);
		});
	}
	show(el) {
		const elBody = el.querySelector('.' + this._config.bodyClass);
		if (elBody.classList.contains('collapsing') || el.classList.contains('show')) {
			return;
		}
		elBody.style.display = 'block';
		const height = elBody.offsetHeight;
		elBody.style.height = 0;
		elBody.style.overflow = 'hidden';
		elBody.style.transition = `height ${this._config.duration}ms ease`;
		elBody.classList.add('collapsing');
		el.classList.add('slidedown');
		elBody.offsetHeight;
		elBody.style.height = `${height}px`;
		window.setTimeout(() => {
			elBody.classList.remove('collapsing');
			el.classList.remove('slidedown');
			elBody.classList.add('collapse');
			el.classList.add('show');
			elBody.style.display = '';
			elBody.style.height = '';
			elBody.style.transition = '';
			elBody.style.overflow = '';
		}, this._config.duration);
	}
	hide(el) {
		const elBody = el.querySelector('.' + this._config.bodyClass);
		if (elBody.classList.contains('collapsing') || !el.classList.contains('show')) {
			return;
		}
		elBody.style.height = `${elBody.offsetHeight}px`;
		elBody.offsetHeight;
		elBody.style.display = 'block';
		elBody.style.height = 0;
		elBody.style.overflow = 'hidden';
		elBody.style.transition = `height ${this._config.duration}ms ease`;
		elBody.classList.remove('collapse');
		el.classList.remove('show');
		elBody.classList.add('collapsing');
		window.setTimeout(() => {
			elBody.classList.remove('collapsing');
			elBody.classList.add('collapse');
			elBody.style.display = '';
			elBody.style.height = '';
			elBody.style.transition = '';
			elBody.style.overflow = '';
		}, this._config.duration);
	}
	toggle(el) {
		el.classList.contains('show') ? this.hide(el) : this.show(el);
	}
}

class Modal {
	constructor(props) {
		const defaultConfig = {
			backscroll: true,
			linkAttrName: 'data-modal',
			closeOnOverlay: true,
			closeOnEsc: true,
			closeBtnAttrName: 'data-modal-close',
			catchFocus: true,
			fixedSelectors: '*[data-fixed]',
			formData: {},
			beforeOpen: () => { },
			afterClose: () => { },
		};
		this.config = Object.assign(defaultConfig, props);
		if (defaultConfig.formData instanceof Object && Object.keys(defaultConfig.formData).length > 0) {
			this.config.formData = Object.assign({}, props.formData);
		}
		if (this.config.linkAttrName) {
			this.init();
		}
		this._closeAfterTransition = this._closeAfterTransition.bind(this);
	}

	init() {
		this.isOpened = false;
		this.openedWindow = false;
		this.starter = false;
		this._nextWindows = false;
		this._scrollPosition = 0;
		this._reopenTrigger = false;
		this._overlayChecker = false;
		this._isMoved = false;
		this._form = null;
		this._focusElements = [
			'a[href]',
			'area[href]',
			'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
			'select:not([disabled]):not([aria-hidden])',
			'textarea:not([disabled]):not([aria-hidden])',
			'button:not([disabled]):not([aria-hidden])',
			'iframe',
			'object',
			'embed',
			'[contenteditable]',
			'[tabindex]:not([tabindex^="-"])',
		];
		// this._modalBlock = false;

		//тень
		// const existingShadow = document.querySelector('.modal__overlay');
		// if (existingShadow) {
		// 	this.shadow = existingShadow;
		// } else {
		// 	this.shadow = document.createElement('div');
		// 	this.shadow.classList.add('modal__overlay');
		// 	document.body.appendChild(this.shadow);
		// }
		this.eventsFeeler();
	}

	eventsFeeler() {
		document.addEventListener('click', (e) => {
			const clickedlink = e.target.closest(`[${this.config.linkAttrName}]`);
			if (!this._isMoved && clickedlink) {
				e.preventDefault();
				this.starter = clickedlink;
				const targetSelector = this.starter.getAttribute(this.config.linkAttrName);
				this._nextWindows = document.querySelector("#" + targetSelector);
				this.open();
				return;
			}
			if (e.target.closest(`[${this.config.closeBtnAttrName}]`)) {
				this.close();
			}
		});

		if (this.config.closeOnOverlay) {
			document.addEventListener('mousedown', (e) => {
				if (!this._isMoved && (e.target instanceof Element) && !e.target.classList.contains('modal__wrapper')) return;
				this._overlayChecker = true;
			});

			document.addEventListener('mouseup', (e) => {
				if (!this._isMoved && (e.target instanceof Element) && this._overlayChecker && e.target.classList.contains('modal__wrapper')) {
					e.preventDefault();
					this._overlayChecker = !this._overlayChecker;
					this.close();
					return;
				}
				this._overlayChecker = false;
			});
		}

		window.addEventListener('keydown', (e) => {
			if (!this._isMoved && this.config.closeOnEsc && e.which === 27 && this.isOpened) {
				e.preventDefault();
				this.close();
				return;
			}
			if (!this._isMoved && this.config.catchFocus && e.which === 9 && this.isOpened) {
				this.focusCatcher(e);
			}
		});
	}

	open(selector) {
		if (selector) {
			if (typeof (selector) === 'string') {
				this._nextWindows = document.querySelector(selector);
			} else {
				this._nextWindows = selector;
			}
		}
		if (!this._nextWindows) {
			console.log('Warning: Modal selector is not found');
			return;
		}
		if (this.isOpened) {
			this._reopenTrigger = true;
			this.close();
			return;
		}
		this.openedWindow = this._nextWindows;

		this._form = this.openedWindow.querySelector('form');

		// this._modalBlock = this.openedWindow.querySelector('.modal__container');
		this.config.beforeOpen(this);
		this._bodyScrollControl();
		// this.shadow.classList.add('modal__overlay--show');

		if (this._form instanceof HTMLElement && Object.keys(this.config.formData).length > 0) {
			for (const key in this.config.formData) {
				let input = document.createElement('input');
				input.type = 'hidden';
				input.name = key;
				input.value = this.config.formData[key];
				input.setAttribute('data-form-data', 'data-form-data');
				this._form.appendChild(input);
			}
		}

		this.openedWindow.classList.add('modal--active');
		this.openedWindow.setAttribute('aria-hidden', 'false');
		if (this.config.catchFocus) this.focusControl();
		this.isOpened = true;
	}

	close() {
		if (!this.isOpened) {
			return;
		}

		let hiddenInputs = this._form.querySelectorAll('input[data-form-data]');
		hiddenInputs.forEach(input => {
			this._form.removeChild(input);
		});

		this.openedWindow.classList.add('modal--moved');
		this._isMoved = true;
		this.openedWindow.addEventListener('transitionend', this._closeAfterTransition);
		this.openedWindow.classList.remove('modal--active');
	}

	_closeAfterTransition() {
		this.openedWindow.classList.remove('modal--moved');
		this.openedWindow.removeEventListener('transitionend', this._closeAfterTransition);
		this._isMoved = false;
		// this.shadow.classList.remove('modal__overlay--show');
		this.openedWindow.setAttribute('aria-hidden', 'true');

		if (this.config.catchFocus) this.focusControl();
		this._bodyScrollControl();
		this.isOpened = false;
		this.openedWindow.scrollTop = 0;
		this.config.afterClose(this);

		if (this._reopenTrigger) {
			this._reopenTrigger = false;
			this.open();
		}
	}

	focusControl() {
		const nodes = this.openedWindow.querySelectorAll(this._focusElements);
		if (this.isOpened && this.starter) {
			this.starter.focus();
		} else if (nodes.length) nodes[0].focus();
	}

	focusCatcher(e) {
		const nodes = this.openedWindow.querySelectorAll(this._focusElements);
		const nodesArray = Array.prototype.slice.call(nodes);
		if (!this.openedWindow.contains(document.activeElement)) {
			nodesArray[0].focus();
			e.preventDefault();
		} else {
			const focusedItemIndex = nodesArray.indexOf(document.activeElement);
			if (e.shiftKey && focusedItemIndex === 0) {
				nodesArray[nodesArray.length - 1].focus();
				e.preventDefault();
			}
			if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
				nodesArray[0].focus();
				e.preventDefault();
			}
		}
	}

	_bodyScrollControl() {
		if (!this.config.backscroll) return;

		// collect fixed selectors to array
		const fixedSelectorsElems = document.querySelectorAll(this.config.fixedSelectors);
		const fixedSelectors = Array.prototype.slice.call(fixedSelectorsElems);

		const html = document.documentElement;
		if (this.isOpened === true) {
			html.classList.remove('modal-opened');
			html.style.marginRight = '';
			fixedSelectors.forEach((el) => {
				el.style.paddingRight = '';
			});
			window.scrollTo(0, this._scrollPosition);
			html.style.top = '';
			return;
		}
		this._scrollPosition = window.pageYOffset;
		const marginSize = window.innerWidth - html.clientWidth;
		html.style.top = `${-this._scrollPosition}px`;

		if (marginSize) {
			html.style.marginRight = `${marginSize}px`;
			fixedSelectors.forEach((el) => {
				el.style.paddingRight = `${parseInt(getComputedStyle(el).paddingRight, 10) + marginSize}px`;
			});
		}
		html.classList.add('modal-opened');
	}
}

document.addEventListener("DOMContentLoaded", function (domLoadedEvent) {

	let raf = function (callback) {
		window.requestAnimationFrame(function () {
			callback();
		});
	};


	/**
	 * Modals
	 */

	let modals = new Modal();


	/**
	 * Input mask
	 */

	let phoneInputs = document.querySelectorAll('input[name=phone]');
	let nameInputs = document.querySelectorAll('input[name=name]');

	phoneInputs.forEach(input => {
		let patternMask = new IMask(input, {
			mask: '+{7} (000) 000-00-00',
			lazy: true,
			placeholderChar: '_'
		});

		input.addEventListener('focus', function () {
			patternMask.updateOptions({ lazy: false });
		}, true);

		input.addEventListener('blur', function () {
			patternMask.updateOptions({ lazy: true });
			if (!patternMask.masked.rawInputValue) {
				patternMask.value = '';
			}
		}, true);
	});
	nameInputs.forEach(input => {
		let patternMask = new IMask(input, {
			mask: /^\W+$/,
			lazy: true
		});

		input.addEventListener('focus', function () {
			patternMask.updateOptions({ lazy: false });
		}, true);

		input.addEventListener('blur', function () {
			patternMask.updateOptions({ lazy: true });
			if (!patternMask.masked.rawInputValue) {
				patternMask.value = '';
			}
		}, true);
	});
	/**
	 * Header open mobile menu
	 */

	let header = document.querySelector('.header');
	let headerTop = document.querySelector('.header__top');
	let headerOpenBtn = header.querySelector('.header__menu-open-btn');
	let isHeaderActive = false;
	const html = document.documentElement;
	let _scrollPosition = 0;

	headerOpenBtn.addEventListener('click', function (e) {
		isHeaderActive = !isHeaderActive;

		header.classList.toggle('header--active');

		if (!isHeaderActive) {

			html.classList.remove('modal-opened');
			html.style.marginRight = '';
			headerTop.style.paddingRight = '';
			window.scrollTo(0, _scrollPosition);
			html.style.top = '';
		} else {
			_scrollPosition = window.pageYOffset;
			const marginSize = window.innerWidth - html.clientWidth;
			html.style.top = `${-_scrollPosition}px`;

			if (marginSize) {
				html.style.marginRight = `${marginSize}px`;
				headerTop.style.paddingRight = `${parseInt(getComputedStyle(el).paddingRight, 10) + marginSize}px`;
			}
			html.classList.add('modal-opened');
		}
	});


	/**
	 * Inner menu
	 */

	let innerMenues = document.querySelectorAll('.nav__inner-menu');

	innerMenues.forEach(menu => {
		let parent = menu.closest('.nav__item');

		let showInnerMenu = function () {
			menu.classList.add('nav__inner-menu--showed');

			raf(() => {
				menu.style.opacity = 1;

				document.addEventListener('click', (e) => {
					if (window.innerWidth > 992) {
						let target = e.target;
						let itsMenu = target == parent || parent.contains(target);

						if (!itsMenu) {
							hideInnerMenu();
						}
					}
				}, { once: true });
			});
		}
		let hideInnerMenu = function () {
			menu.style.opacity = 0;

			menu.addEventListener('transitionend', function () {
				menu.classList.remove('nav__inner-menu--showed');
			}, { once: true });
		}

		parent.addEventListener('click', function (e) {
			if (menu.classList.contains('nav__inner-menu--showed') && !e.target.contains(menu)) {
				hideInnerMenu();
			} else {
				showInnerMenu();
			}
		});

		// parent.addEventListener('mouseenter', function (e) {
		// 	parent.removeEventListener('mouseleave', hideInnerMenu);

		// 	menu.classList.add('nav__inner-menu--showed');

		// 	parent.addEventListener('mouseleave', hideInnerMenu);
		// });

		// function hideInnerMenu() {
		// 	setTimeout(function () {
		// 		menu.classList.remove('nav__inner-menu--showed');
		// 	}, 500);
		// }
	});


	/**
	 * Map
	 */

	let radioDistricts = document.querySelectorAll('.departure__districts-item input');
	let mapDistricts = document.querySelectorAll('.departure__map svg path');

	let changeDistrict = function (radio) {
		let district = document.querySelector('#' + radio.value);

		document.querySelector('.departure__map svg path.active').classList.remove('active');
		district.classList.add('active');

		let modal = new Modal({
			formData: {
				[radio.name]: radio.value,
			}
		});
		modal.open('#modal-feedback');
	};

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

					changeDistrict(radio);
				});
			}
		}
	});

	radioDistricts.forEach(radio => {
		let value = radio.value;

		if (value && value !== '') {
			let target = document.querySelector('#' + value);

			if (target && target !== '') {

				radio.parentElement.addEventListener('mouseenter', function (e) {
					target.classList.add('hover');
				});

				radio.parentElement.addEventListener('mouseleave', function (e) {
					target.classList.remove('hover');
				});

				radio.addEventListener('click', function (e) {
					changeDistrict(radio);
				});
			}
		}
	});


	/**
	 * Quiz
	 */

	let step = 1;
	let maxStep = 3;
	let quizPrevBtn = document.querySelector('.quiz__step-btn.arrow-btn--prev');
	let quizNextBtn = document.querySelector('.quiz__step-btn.arrow-btn--next');
	let quizBodies = document.querySelectorAll('.quiz__step');
	let stepsCount = document.querySelector('.quiz__steps-count b');

	quizNextBtn.addEventListener('click', function (e) {
		if (step >= maxStep) return;

		step++;

		if (step >= maxStep) {
			quizNextBtn.classList.add('arrow-btn--disabled');
			quizNextBtn.setAttribute('disabled', true);
		}
		quizPrevBtn.classList.remove('arrow-btn--disabled');
		quizPrevBtn.removeAttribute('disabled');

		quizBodies.forEach(body => {
			if (+body.dataset.quizId === step) {
				body.classList.add('active');

			} else {
				body.classList.remove('active');
			}

		});

		stepsCount.textContent = 'шаг ' + step;
	});

	quizPrevBtn.addEventListener('click', function (e) {
		if (step <= 1) return;

		step--;

		if (step <= 1) {
			quizPrevBtn.classList.add('arrow-btn--disabled');
			quizPrevBtn.setAttribute('disabled', true);
		}
		quizNextBtn.classList.remove('arrow-btn--disabled');
		quizNextBtn.removeAttribute('disabled');

		quizBodies.forEach(body => {
			body.classList.remove('active');

			if (+body.dataset.quizId === step) {
				body.classList.add('active');
			}
		});

		stepsCount.textContent = 'шаг ' + step;
	});


	/**
	 * Accordion
	 */

	new Accordion('.reasons__list', {
		alwaysOpen: false,
		duration: 350,
		itemClass: 'reason',
		headerClass: 'reason__head',
		bodyClass: 'reason__body',
	});


	/**
	 * Slider
	 */

	let mastersSlider = new Swiper('.masters__slider', {
		modules: [Navigation, Pagination],
		spaceBetween: 30,
		wrapperClass: 'masters__list',
		slideClass: 'masters__item',
		loop: true,
		slidesPerView: 1,

		navigation: {
			nextEl: ".masters__arrows .arrow-btn--next",
			prevEl: ".masters__arrows .arrow-btn--prev",
			disabledClass: 'arrow-btn--disabled',
		},

		pagination: {
			el: ".masters__pagination",
			bulletClass: "pagination__bullet",
			bulletActiveClass: "pagination__bullet--active",
			clickable: true,
		},

		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			// 992: {
			// 	slidesPerView: 2,
			// },
			1200: {
				spaceBetween: 30,
				slidesPerView: 4,
			},
		},
	});



	/**
	 * Form
	 */

	let forms = document.querySelectorAll('.form');

	let showErr = function (input, msg) {
		let msgEl = document.createElement('div');
		let parent = input.parentElement;

		input.classList.add('form__input--fault');

		msgEl.textContent = msg;
		msgEl.classList.add('form__message');
		parent.appendChild(msgEl);
		msgEl.style.opacity = 1;

		setTimeout(() => {
			input.classList.remove('form__input--fault');
			msgEl.style.opacity = null;

			msgEl.addEventListener('transitionend', function () {
				parent.removeChild(msgEl);
			});
		}, 3000);
	};

	let createThxPage = function (form) {
		let thx = document.createElement('div');
		let icon = document.createElement('div');
		let title = document.createElement('div');
		let subtitle = document.createElement('div');

		thx.classList.add('thx');
		icon.classList.add('thx__icon');
		title.classList.add('thx__title', 'title');
		subtitle.classList.add('thx__subtitle');

		title.textContent = 'Спасибо';
		subtitle.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit cursus nisi vel fermentum.';

		thx.appendChild(icon);
		thx.appendChild(title);
		thx.appendChild(subtitle);

		form.style.opacity = 0;
		form.addEventListener('transitionend', function () {
			this.style.display = 'none';

			thx.style.opacity = 0;
			this.parentElement.appendChild(thx);

			raf(() => {
				thx.style.opacity = 1;
			});
		});
	}

	let send = function (form) {
		let formData = new FormData(form);
		let request = new XMLHttpRequest();
		let btn = form.querySelector('[type="submit"]');
		request.open('POST', 'form.php', true);
		request.setRequestHeader('accept', 'application/json');

		let statusMessage = form.querySelector('.form__status');

		if (!statusMessage) {
			statusMessage = document.createElement('div');
			statusMessage.classList.add('form__status');
			form.appendChild(statusMessage);
		}

		formData.append('page', document.title);

		btn.disabled = true;

		request.send(formData);

		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				switch (request.status) {
					case 200:
						// let reqJSON = JSON.parse(request.responseText);

						// if (reqJSON.success) {
						createThxPage(form);
						// }

						break;

					case 404:
						statusMessage.innerHTML = "Сервер недоступен";
						btn.disabled = false;

						raf(() => {
							statusMessage.classList.add('form__status--showed');
						});

						break;

					default:
						statusMessage.innerHTML = request.responseText;
						btn.disabled = false;

						raf(() => {
							statusMessage.classList.add('form__status--showed');
						});

						break;
				}
			}
		}
	};

	forms.forEach(form => {
		form.addEventListener('submit', function (e) {
			e.preventDefault();

			let inputs = this.querySelectorAll('input');
			let err = false;

			inputs.forEach(input => {
				switch (input.getAttribute('name')) {
					case 'phone':
						if (input.value.length < 18) {
							err = true;
							showErr(input, 'Введите правильный номер телефона!');
						}

						break;

					case 'name':
					default:
						if (input.value.langth < 2) {
							err = true;
							showErr(input, 'Имя слишком короткое!');
						}
						break;
				}
			});

			if (!err) {
				// send
				send(e.target);
			}
		});
	});

});

/***/ })
/******/ ]);