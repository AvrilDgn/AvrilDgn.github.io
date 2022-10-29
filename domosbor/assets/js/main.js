// import noUiSlider from 'nouislider';

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
			beforeOpen: () => { },
			afterClose: () => { },
		};
		this.config = Object.assign(defaultConfig, props);
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

		this.config.beforeOpen(this);
		this._bodyScrollControl();

		this.openedWindow.classList.add('modal--active');
		this.openedWindow.setAttribute('aria-hidden', 'false');
		if (this.config.catchFocus) this.focusControl();
		this.isOpened = true;
	}

	close() {
		if (!this.isOpened) {
			return;
		}

		if (this._form) {
			let hiddenInputs = this._form.querySelectorAll('input[data-form-data]');
			hiddenInputs.forEach(input => {
				this._form.removeChild(input);
			});
		}

		this.openedWindow.classList.add('modal--moved');
		this._isMoved = true;
		this.openedWindow.addEventListener('transitionend', this._closeAfterTransition);
		this.openedWindow.classList.remove('modal--active');
	}

	_closeAfterTransition() {
		this.openedWindow.classList.remove('modal--moved');
		this.openedWindow.removeEventListener('transitionend', this._closeAfterTransition);
		this._isMoved = false;
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

		const fixedSelectorsElems = document.querySelectorAll(this.config.fixedSelectors);
		const fixedSelectors = Array.prototype.slice.call(fixedSelectorsElems);

		const html = document.querySelector('.main');
		if (this.isOpened === true) {
			html.classList.remove('modal-opened');
			html.style.paddingRight = '';
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
			html.style.paddingRight = `${marginSize}px`;
			fixedSelectors.forEach((el) => {
				el.style.paddingRight = `${parseInt(getComputedStyle(el).paddingRight, 10) + marginSize}px`;
			});
		}
		html.classList.add('modal-opened');
	}
}

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

	// let phoneInputs = document.querySelectorAll('input[name=phone]');
	// let nameInputs = document.querySelectorAll('input[name=name]');

	// phoneInputs.forEach(input => {
	// 	let patternMask = new IMask(input, {
	// 		mask: '+{7} (000) 000-00-00',
	// 		lazy: true,
	// 		placeholderChar: '_'
	// 	});

	// 	input.addEventListener('focus', function () {
	// 		patternMask.updateOptions({ lazy: false });
	// 	}, true);

	// 	input.addEventListener('blur', function () {
	// 		patternMask.updateOptions({ lazy: true });
	// 		if (!patternMask.masked.rawInputValue) {
	// 			patternMask.value = '';
	// 		}
	// 	}, true);
	// });
	// nameInputs.forEach(input => {
	// 	let patternMask = new IMask(input, {
	// 		mask: /^\W+$/,
	// 		lazy: true
	// 	});

	// 	input.addEventListener('focus', function () {
	// 		patternMask.updateOptions({ lazy: false });
	// 	}, true);

	// 	input.addEventListener('blur', function () {
	// 		patternMask.updateOptions({ lazy: true });
	// 		if (!patternMask.masked.rawInputValue) {
	// 			patternMask.value = '';
	// 		}
	// 	}, true);
	// });


	/**
	 * Header open mobile menu
	 */

	let header = document.querySelector('.header');
	let headerOpenBtn = header.querySelector('.header__open-menu');
	let isHeaderActive = false;
	const html = document.documentElement;
	let _scrollPosition = 0;

	headerOpenBtn.addEventListener('click', function (e) {
		isHeaderActive = !isHeaderActive;

		header.classList.toggle('header--menu-opened');

		if (!isHeaderActive) {
			html.classList.remove('modal-opened');
			html.style.marginRight = '';
			header.style.paddingRight = '';
			window.scrollTo(0, _scrollPosition);
			html.style.top = '';
		} else {
			_scrollPosition = window.pageYOffset;
			const marginSize = window.innerWidth - html.clientWidth;
			html.style.top = `${-_scrollPosition}px`;

			if (marginSize) {
				html.style.marginRight = `${marginSize}px`;
				header.style.paddingRight = `${parseInt(getComputedStyle(header).paddingRight, 10) + marginSize}px`;
			}
			html.classList.add('modal-opened');
		}
	}); (function aaa() {
		isHeaderActive = !isHeaderActive;

		header.classList.toggle('header--menu-opened');

		if (!isHeaderActive) {
			html.classList.remove('modal-opened');
			html.style.marginRight = '';
			header.style.paddingRight = '';
			window.scrollTo(0, _scrollPosition);
			html.style.top = '';
		} else {
			_scrollPosition = window.pageYOffset;
			const marginSize = window.innerWidth - html.clientWidth;
			html.style.top = `${-_scrollPosition}px`;

			if (marginSize) {
				html.style.marginRight = `${marginSize}px`;
				header.style.paddingRight = `${parseInt(getComputedStyle(header).paddingRight, 10) + marginSize}px`;
			}
			html.classList.add('modal-opened');
		}
	})();


	/**
	 * Search
	 */

	let search = document.querySelectorAll('.search');

	search.forEach(el => {
		let openBtn = el.querySelector('.search__open-btn');

		openBtn.addEventListener('click', function () {
			el.classList.toggle('active');
		});
	});


	/**
	 * Range Slider
	 */

	var rangeSliders = document.querySelectorAll('.range-slider');

	rangeSliders.forEach(slider => {
		let sliderRange = slider.querySelector('.range-slider__range');
		let min = Number(slider.dataset.min);
		let max = Number(slider.dataset.max);

		noUiSlider.create(sliderRange, {
			start: [min, max],
			connect: true,
			step: 1,
			// tooltips: [wNumb({decimals: 2}), wNumb({decimals: 2})],
			range: {
				'min': min,
				'max': max
			},
			format: {
				from: function (value) {
					return parseInt(value);
				},
				to: function (value) {
					return parseInt(value);
				}
			}
		});

		let snapValues = [
			slider.querySelector('input[name="min"]'),
			slider.querySelector('input[name="max"]')
		];

		sliderRange.noUiSlider.on('update', function (values, handle) {
			snapValues[handle].value = values[handle].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		});

		// snapValues.forEach(val => {
		// 	val.addEventListener('input', function (e) {
		// 		val.value = val.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		// 	});
		// });
	});


	/**
	 * Menu tabs
	 */

	let tabBtns = document.querySelectorAll('.h-menu__tab-btns .button');

	tabBtns.forEach(btn => {
		btn.addEventListener('click', function (e) {
			if (btn.classList.contains('active')) {
				return;
			}

			document.querySelector('.h-menu__tab-btns .button.active').classList.remove('active');
			document.querySelector('.h-menu__content.active').classList.remove('active');

			btn.classList.add('active');
			document.querySelector(`.h-menu__content[data-id="${btn.dataset.target}"]`).classList.add('active');
		})
	});


	/**
	 * Inner menu
	 */

	// let innerMenues = document.querySelectorAll('.nav__inner-menu');

	// innerMenues.forEach(menu => {
	// 	let parent = menu.closest('.nav__item');

	// 	let showInnerMenu = function () {
	// 		menu.classList.add('nav__inner-menu--showed');

	// 		raf(() => {
	// 			menu.style.opacity = 1;

	// 			document.addEventListener('click', (e) => {
	// 				if (window.innerWidth > 992) {
	// 					let target = e.target;
	// 					let itsMenu = target == parent || parent.contains(target);

	// 					if (!itsMenu) {
	// 						hideInnerMenu();
	// 					}
	// 				}
	// 			}, { once: true });
	// 		});
	// 	}
	// 	let hideInnerMenu = function () {
	// 		menu.style.opacity = 0;

	// 		menu.addEventListener('transitionend', function () {
	// 			menu.classList.remove('nav__inner-menu--showed');
	// 		}, { once: true });
	// 	}

	// 	parent.addEventListener('click', function (e) {
	// 		if (menu.classList.contains('nav__inner-menu--showed') && !e.target.contains(menu)) {
	// 			hideInnerMenu();
	// 		} else {
	// 			showInnerMenu();
	// 		}
	// 	});
	// });


	/**
	 * Map
	 */

	// let radioDistricts = document.querySelectorAll('.departure__districts-item input');
	// let mapDistricts = document.querySelectorAll('.departure__map svg path');

	// let changeDistrict = function (radio) {
	// 	let district = document.querySelector(`.departure__map [data-id="${radio.value}"]`);

	// 	document.querySelector('.departure__map svg path.active').classList.remove('active');
	// 	district.classList.add('active');

	// 	let modal = new Modal({
	// 		formData: {
	// 			[radio.name]: radio.value,
	// 		}
	// 	});
	// 	modal.open('#modal-feedback');
	// };

	// mapDistricts.forEach(district => {
	// 	let id = district.dataset.id;

	// 	if (id && id !== '') {
	// 		let radio = document.querySelector('.departure__districts-item input[value="' + id + '"]');

	// 		if (radio && radio !== '') {

	// 			district.addEventListener('mouseenter', function (e) {
	// 				radio.classList.add('hover');
	// 			});

	// 			district.addEventListener('mouseleave', function (e) {
	// 				radio.classList.remove('hover');
	// 			});

	// 			district.addEventListener('click', function (e) {
	// 				radio.checked = true;

	// 				changeDistrict(radio);
	// 			});
	// 		}
	// 	}
	// });

	// radioDistricts.forEach(radio => {
	// 	let value = radio.value;

	// 	if (value && value !== '') {
	// 		let target = document.querySelector(`.departure__map [data-id="${value}"]`);

	// 		if (target && target !== '') {

	// 			radio.parentElement.addEventListener('mouseenter', function (e) {
	// 				target.classList.add('hover');
	// 			});

	// 			radio.parentElement.addEventListener('mouseleave', function (e) {
	// 				target.classList.remove('hover');
	// 			});

	// 			radio.addEventListener('click', function (e) {
	// 				changeDistrict(radio);
	// 			});
	// 		} else {
	// 			radio.addEventListener('click', function (e) {
	// 				let modal = new Modal({
	// 					formData: {
	// 						[radio.name]: radio.value,
	// 					}
	// 				});
	// 				modal.open('#modal-feedback');
	// 			});
	// 		}
	// 	}
	// });


	/**
	 * Accordion
	 */

	new Accordion('.faq__list', {
		alwaysOpen: false,
		duration: 350,
		itemClass: 'faq__item',
		headerClass: 'faq__head',
		bodyClass: 'faq__body',
	});


	/**
	 * Slider
	 */

	let sliders = document.querySelectorAll('.slider');

	sliders.forEach(slider => {
		new Swiper(slider.querySelector(".slider__wrap"), {
			spaceBetween: 14,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			// loop: true,
			slidesPerView: 1,

			navigation: {
				nextEl: slider.querySelector(".slider__arrow--next"),
				prevEl: slider.querySelector(".slider__arrow--prev"),
				disabledClass: 'disabled',
			},

			pagination: {
				el: slider.querySelector(".slider__pagination"),
				bulletClass: "slider__bullet",
				bulletActiveClass: "active",
				clickable: true,
			},

			breakpoints: {
				768: {
					spaceBetween: 20,
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					spaceBetween: 30,
					slidesPerView: 5,
				},
			},
		});
	});


	/**
	 * Form
	 */

	// let forms = document.querySelectorAll('.form');

	// let showErr = function (input, msg) {
	// 	let msgEl = document.createElement('div');
	// 	let parent = input.parentElement;

	// 	input.classList.add('form__input--fault');

	// 	msgEl.textContent = msg;
	// 	msgEl.classList.add('form__message');
	// 	parent.appendChild(msgEl);
	// 	msgEl.style.opacity = 1;

	// 	setTimeout(() => {
	// 		input.classList.remove('form__input--fault');
	// 		msgEl.style.opacity = null;

	// 		msgEl.addEventListener('transitionend', function () {
	// 			parent.removeChild(msgEl);
	// 		});
	// 	}, 3000);
	// };

	// let createThxPage = function (form) {
	// 	let thx = document.createElement('div');
	// 	let icon = document.createElement('div');
	// 	let title = document.createElement('div');
	// 	let subtitle = document.createElement('div');

	// 	thx.classList.add('thx');
	// 	icon.classList.add('thx__icon');
	// 	title.classList.add('thx__title', 'title');
	// 	subtitle.classList.add('thx__subtitle');

	// 	title.textContent = 'Спасибо';
	// 	subtitle.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit cursus nisi vel fermentum.';

	// 	thx.appendChild(icon);
	// 	thx.appendChild(title);
	// 	thx.appendChild(subtitle);

	// 	form.style.opacity = 0;
	// 	form.addEventListener('transitionend', function () {
	// 		this.style.display = 'none';

	// 		thx.style.opacity = 0;
	// 		this.parentElement.appendChild(thx);

	// 		raf(() => {
	// 			thx.style.opacity = 1;
	// 		});
	// 	});
	// }

	// let send = function (form) {
	// 	let formData = new FormData(form);
	// 	let request = new XMLHttpRequest();
	// 	let btn = form.querySelector('[type="submit"]');
	// 	request.open('POST', 'form.php', true);
	// 	request.setRequestHeader('accept', 'application/json');

	// 	let statusMessage = form.querySelector('.form__status');

	// 	if (!statusMessage) {
	// 		statusMessage = document.createElement('div');
	// 		statusMessage.classList.add('form__status');
	// 		form.appendChild(statusMessage);
	// 	}

	// 	formData.append('page', document.title);

	// 	btn.disabled = true;

	// 	request.send(formData);

	// 	request.onreadystatechange = function () {
	// 		if (request.readyState === 4) {
	// 			switch (request.status) {
	// 				case 200:
	// 					createThxPage(form);

	// 					break;

	// 				case 404:
	// 					statusMessage.innerHTML = "Сервер недоступен";
	// 					btn.disabled = false;

	// 					raf(() => {
	// 						statusMessage.classList.add('form__status--showed');
	// 					});

	// 					break;

	// 				default:
	// 					statusMessage.innerHTML = request.responseText;
	// 					btn.disabled = false;

	// 					raf(() => {
	// 						statusMessage.classList.add('form__status--showed');
	// 					});

	// 					break;
	// 			}
	// 		}
	// 	}
	// };

	// forms.forEach(form => {
	// 	form.addEventListener('submit', function (e) {
	// 		e.preventDefault();

	// 		let inputs = this.querySelectorAll('input');
	// 		let err = false;

	// 		inputs.forEach(input => {
	// 			switch (input.getAttribute('name')) {
	// 				case 'phone':
	// 					if (input.value.length < 18) {
	// 						err = true;
	// 						showErr(input, 'Введите правильный номер телефона!');
	// 					}

	// 					break;

	// 				case 'name':
	// 				default:
	// 					break;
	// 			}
	// 		});

	// 		if (!err) {
	// 			// send
	// 			send(e.target);
	// 		}
	// 	});
	// });

});