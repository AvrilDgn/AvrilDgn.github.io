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

document.addEventListener("DOMContentLoaded", function (domLoadedEvent) {

	// let raf = function (callback) {
	// 	window.requestAnimationFrame(function () {
	// 		callback();
	// 	});
	// };


	/**
	 * Modals
	 */

	let modals = new Modal();


	/**
	 * Input mask
	 */

	let phoneInputs = document.querySelectorAll('input[type=tel]');

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


	/**
	 * Calculator
	 */

	let calc = document.querySelector('.calc');
	let calcDays = calc.querySelectorAll('input[name="calc-day"]');
	let calcPercentView = calc.querySelector('.calc__percent-value');
	let calcInput = document.querySelector('.calc__rate-value input[name="rate"]');
	let calcResultCoin = calc.querySelector('.calc__result-value--coin');
	let calcResultZloty = calc.querySelector('.calc__result-value--zloty');
	let calcPercentValue = 0;
	let calcMounth = 0;
	let calcZloty = 20.81;

	calcDays.forEach(btn => {
		if (btn.checked) {
			ChangePercent.call(btn);
		}

		btn.addEventListener('change', ChangePercent);
	});

	function ChangePercent() {
		calcPercentValue = this.dataset.percent;
		calcMounth = (Math.floor(30 / this.value) > 1 ? 1 / Math.floor(30 / this.value) : this.value / 30);

		calcPercentView.textContent = calcPercentValue + '%';

		CountResult();
	}
	function CountResult() {
		let value = Math.floor(parseInt(calcInput.value.replace(/\s+/g, ''), 10) / 100 * calcPercentValue * calcMounth);

		calcResultCoin.textContent = value;
		calcResultZloty.textContent = (value * calcZloty).toFixed(2);

		console.log(parseInt(calcInput.value.replace(/\s+/g, ''), 10) + ' ' + calcPercentValue + ' ' + calcMounth);
	}


	/**
	 * Range Slider
	 */

	var rangeSlider = document.querySelector('.range-slider');

	let rangeMin = Number(rangeSlider.dataset.min);
	let rangeMax = Number(rangeSlider.dataset.max);
	let rangeStartValue = Number(rangeSlider.dataset.startValue);
	let rangeInput = document.querySelector('#' + rangeSlider.dataset.input);
	let rangeItem = rangeSlider.querySelector('.range-slider__range');
	let rangeChangebtns = rangeSlider.querySelectorAll('.range-slider__change-btn');

	noUiSlider.create(rangeItem, {
		start: rangeStartValue,
		connect: 'lower',
		step: 1,
		range: {
			'min': rangeMin,
			'max': rangeMax
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

	rangeItem.noUiSlider.on('update', function (values, handle) {
		rangeInput.value = values[handle].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		CountResult();
	});

	rangeInput.addEventListener('change', function () {
		rangeItem.noUiSlider.set(this.value);
	});

	rangeChangebtns.forEach(btn => {
		let pressed = false;
		let up = false;

		if (btn.classList.contains('range-slider__change-btn--plus')) {
			up = true;
		}

		let pressOnListeners = [
			'mousedown',
			'touchstart'
		];
		let pressOffListeners = [
			'mouseup',
			'touchend'
		];

		for (const listener of pressOnListeners) {
			btn.addEventListener(listener, function () {
				pressed = true;
			});
		}
		for (const listener of pressOffListeners) {
			btn.addEventListener(listener, function () {
				pressed = false;
			});
		}

		setInterval(() => {
			if (!pressed) return;

			let value = rangeItem.noUiSlider.get();

			if (up) {
				rangeItem.noUiSlider.set((++value).toString());
			} else {
				rangeItem.noUiSlider.set((--value).toString());
			}
		}, 100);
	});


	/**
	 * Sliders
	 */

	//mob sliders
	let sliders = document.querySelectorAll(".slider--lg");

	sliders.forEach(slider => {
		let swiperPagination = document.createElement('div');
		swiperPagination.classList.add('slider__pagination');
		slider.appendChild(swiperPagination);

		new Swiper(slider, {
			freeMode: true,
			slidesPerView: "auto",
			spaceBetween: 30,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			pagination: {
				el: swiperPagination,
				bulletClass: "slider__bullet",
				bulletActiveClass: "active",
				clickable: true,
			},
		});
	});


	/**
	 * Form
	 */

	/*let forms = document.querySelectorAll('.form');

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
						createThxPage(form);

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
						break;
				}
			});

			if (!err) {
				// send
				send(e.target);
			}
		});
	});*/

});