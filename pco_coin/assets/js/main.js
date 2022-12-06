class Modal {
	constructor(props) {
		const defaultConfig = {
			backscroll: true,
			linkAttrName: 'data-modal',
			closeOnOverlay: true,
			closeOnEsc: true,
			closeBtnAttrName: 'data-modal-close',
			catchFocus: false,
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
	 * Header mobile
	 */

	let html = document.documentElement;
	let header = document.querySelector('.header');
	let headerOpenBtn = header.querySelector('.header__open-btn');
	let headerCloseBtn = header.querySelector('.header__close-btn');
	let headerOverlay = header.querySelector('.header__overlay');
	let _scrollPosition = 0;
	let isHeaderMenu = false;
	const mediaQueryMenu = window.matchMedia('(min-width: 992px)');

	headerOpenBtn.addEventListener('click', function () {
		headerOpen();
	});
	headerCloseBtn.addEventListener('click', function () {
		headerClose();
	});
	headerOverlay.addEventListener('click', function () {
		headerClose();
	});

	function headerClose() {
		html.classList.remove('modal-opened');
		html.style.marginRight = '';
		header.style.paddingRight = '';
		window.scrollTo(0, _scrollPosition);
		html.style.top = '';
		header.classList.remove('header--showed');
		isHeaderMenu = false;
	}

	function headerOpen() {
		_scrollPosition = window.pageYOffset;
		const marginSize = window.innerWidth - html.clientWidth;
		html.style.top = `${-_scrollPosition}px`;

		if (marginSize) {
			html.style.marginRight = `${marginSize}px`;
			header.style.paddingRight = `${parseInt(getComputedStyle(header).paddingRight, 10) + marginSize}px`;
		}
		html.classList.add('modal-opened');
		header.classList.add('header--showed');
		isHeaderMenu = true;
	}

	function closeMenu(e) {
		if (e.matches && isHeaderMenu) {
			headerClose();
		}
	}
	mediaQueryMenu.addEventListener('change', closeMenu);
	closeMenu(mediaQueryMenu);


	/**
	 * Smooth scrolling of anchor
	 */

	let anchorLinks = document.querySelectorAll('.anchor');

	anchorLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			let blockID = link.hash;
			let target;

			if (!blockID) {
				target = document.body;
			} else {
				target = document.querySelector(blockID);
			}

			if (!target) {
				return;
			}

			if (isHeaderMenu) {
				headerClose();
			}

			window.scrollTo({
				behavior: 'smooth',
				top: target.getBoundingClientRect().top + pageYOffset - header.offsetHeight,
			})
		})
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
	let calcZloty = Number(calcResultZloty.dataset.zloty);

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

		calcResultCoin.textContent = value + ' monet';
		calcResultZloty.textContent = (value * calcZloty).toFixed(2) + ' zł';
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
	 * Diagram
	 */

	let diagram = document.querySelector('.diagram');
	let diagramTypeView = diagram.querySelector('.diagram__title');
	let diagramValView = diagram.querySelector('.diagram__subtitle');
	let diagramPieces = diagram.querySelectorAll('.diagram__piece');

	diagramPieces.forEach(piece => {
		piece.addEventListener('click', function () {
			changeDiagramPiece(this);
		});
		piece.addEventListener('mouseenter', function () {
			changeDiagramTitle(this);
		});
		piece.addEventListener('toutchstart', function () {
			changeDiagramTitle(this);
		});
	});

	function changeDiagramPiece(newEl) {
		let active = diagram.querySelector('.diagram__piece--active');
		let activeD = active.getAttribute('d');
		let activePath = active.dataset.path;

		active.setAttribute('d', activePath);
		active.dataset.path = activeD;
		active.classList.remove('diagram__piece--active');

		let newD = newEl.getAttribute('d');
		let newPath = newEl.dataset.path;

		newEl.setAttribute('d', newPath);
		newEl.dataset.path = newD;
		newEl.classList.add('diagram__piece--active');
	}

	function changeDiagramTitle(newEl) {
		diagramTypeView.textContent = newEl.dataset.type;
		diagramValView.textContent = newEl.dataset.value;
	}


	/**
	 * Timers
	 */

	let timers = document.querySelectorAll('.timer');


	// timers.forEach(timer => {
	// 	let nearDays = timer.dataset.nearDays;
	// 	let nextDays = timer.dataset.nextDays;
	// 	let nearDateView = timer.querySelector('.timer__near-date');
	// 	let nextDateView = timer.querySelector('.timer__next-date');

	// 	let date = new Date();
	// 	date.setHours(0);
	// 	date.setMinutes(0);
	// 	date.setSeconds(0);

	// 	let nearDate = new Date(date.getTime());
	// 	let nextDate = new Date(date.getTime());

	// 	nearDate.setDate(nearDate.getDate() + parseInt(nearDays));
	// 	nextDate.setDate(nextDate.getDate() + parseInt(nextDays));

	// 	nearDateView.textContent = nearDate.toLocaleDateString();
	// 	nextDateView.textContent = nextDate.toLocaleDateString();


	// 	// id таймера
	// 	let timerId = null;
	// 	// склонение числительных
	// 	function declensionNum(num, words) {
	// 		return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
	// 	}
	// 	// вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
	// 	function countdownTimer() {
	// 		const diff = nearDate - new Date();
	// 		if (diff <= 0) {
	// 			clearInterval(timerId);
	// 		}
	// 		const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
	// 		const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
	// 		const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
	// 		const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
	// 		$days.textContent = days < 10 ? '0' + days : days;
	// 		$hours.textContent = hours < 10 ? '0' + hours : hours;
	// 		$minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
	// 		$seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
	// 		$days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
	// 		$hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
	// 		$minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
	// 		$seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
	// 	}
	// 	// получаем элементы, содержащие компоненты даты
	// 	const $days = timer.querySelector('.timer__day');
	// 	const $hours = timer.querySelector('.timer__hour');
	// 	const $minutes = timer.querySelector('.timer__minute');
	// 	const $seconds = timer.querySelector('.timer__second');
	// 	// вызываем функцию countdownTimer
	// 	countdownTimer();
	// 	// вызываем функцию countdownTimer каждую секунду
	// 	timerId = setInterval(countdownTimer, 1000);
	// });


	timers.forEach(timer => {
		let items = timer.querySelectorAll('.timer__item');
		let complitedText = timer.dataset.complitedText;
		let dateList = [];
		let daysList = [];

		items.forEach(item => {
			let daysBefore = item.dataset.daysBefore;

			let date = new Date();
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);

			let nextDate = new Date(date.getTime());
			nextDate.setDate(nextDate.getDate() + parseInt(daysBefore));

			daysList.push(daysBefore);
			dateList.push(nextDate);
		});

		let activeEl = false;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			let dateView = item.querySelector('.timer__date');
			let timerView = item.querySelector('.timer__readiness');

			if (dateView) {
				dateView.textContent = dateList[i].toLocaleDateString();
			}

			if (daysList[i+1] <= 0) {
				timerView.textContent = complitedText;
			} else {
				if (activeEl) {
					timerView.textContent = dateList[i].toLocaleDateString();
					timerView.textContent = `Zaplanowano na ${dateList[i].toLocaleDateString()}`;
				} else {
					activeEl = true;
					let timerInterval = null;

					timerView.textContent = countdownTimer(dateList[i + 1], timerInterval);
					timerInterval = setInterval(function() {
						timerView.textContent = countdownTimer(dateList[i + 1], timerInterval);
					}, 1000);
				}
			}
		}
	});

	function countdownTimer(diffDate, interval) {
		const diff = diffDate - new Date();

		if (diff <= 0) {
			clearInterval(interval);
		}

		const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
		const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
		const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
		const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
		const $days = days < 10 ? '0' + days : days;
		const $hours = hours < 10 ? '0' + hours : hours;
		const $minutes = minutes < 10 ? '0' + minutes : minutes;
		const $seconds = seconds < 10 ? '0' + seconds : seconds;
		
		return `Do końca: ${$days}d ${$hours}g ${$minutes}m ${$seconds}s`;
	}


	/**
	 * Sliders
	 */

	//mob sliders
	let roadmapSlider = document.querySelector(".roadmap__wrap");

	new Swiper(roadmapSlider, {
		spaceBetween: 20,
		freeMode: true,
		slidesPerView: 1,
		navigation: {
			nextEl: roadmapSlider.querySelector(".slider__arrow--next"),
			prevEl: roadmapSlider.querySelector(".slider__arrow--prev"),
			disabledClass: 'disabled',
		},
		breakpoints: {
			576: {
				freeMode: true,
				slidesPerView: "auto",
			},
			1200: {
				freeMode: true,
				// allowTouchMove: false,
				slidesPerView: 4,
			}
		},
	});

	let mediaQueryRoadmap = window.matchMedia('(max-width: 576px)');
	function changeRoadmapSlider(e) {
		if (e.matches) {
			roadmapSlider.swiper.slideTo(1, false, false);
		} else {
			roadmapSlider.swiper.slideTo(0, false, false);
		}
	}
	mediaQueryRoadmap.addEventListener('change', changeRoadmapSlider);
	changeRoadmapSlider(mediaQueryRoadmap);


	let teamSlider = document.querySelector('.team__wrap');

	new Swiper(teamSlider, {
		freeMode: true,
		spaceBetween: 20,
		slidesPerView: 1,
		navigation: {
			nextEl: teamSlider.querySelector(".slider__arrow--next"),
			prevEl: teamSlider.querySelector(".slider__arrow--prev"),
			disabledClass: 'disabled',
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			}
		},
	});


	//update sliders
	function updateSliders() {
		roadmapSlider.swiper.update();
		teamSlider.swiper.update();
	}
	window.addEventListener('resize', updateSliders);


	//partners
	let sliderPartners = new Swiper(".partners__wrap", {
		loop: true,
		allowTouchMove: false,
		// duration: 1000,
		speed: 10000,
		slidesPerView: 2,
		// autoplay: true,

		breakpoints: {
			576: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 5,
			},
			1200: {
				freeMode: false,
				slidesPerView: 6,
			},
		},
	});

	(function infinite() {
		sliderPartners.slideTo(sliderPartners.slides.length);
		sliderPartners.once('transitionEnd', function () {
			sliderPartners.slideTo(sliderPartners.params.slidesPerView, 0, false);
			setTimeout(function () {
				infinite();
			}, 0);
		});
	})();


	/**
	 * Phone validation
	 */

	let phoneInputs = document.querySelectorAll('input[type=tel]');

	phoneInputs.forEach(input => {
		let patternMask = new IMask(input, {
			mask: '+{48} 000-000-000',
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
	 * Form
	 */

	let forms = document.querySelectorAll('.form');

	forms.forEach(form => {
		let inputs = form.querySelectorAll('input');

		inputs.forEach(input => {
			input.addEventListener('blur', function () {
				let err = false;

				if (input.value <= 1) {
					showErr(input, 'Uzupełnij pole');
					return;
				}

				switch (input.getAttribute('name')) {
					case 'your-phone':
						if (input.value.length < 15) {
							err = true;
							showErr(input, 'Pole wypełnione niepoprawnie');
						}

						break;

					case 'your-mail':

						let regexp = /^[\w\d%$:.-]+@\w+\.\w{2,5}$/;

						if (!regexp.test(input.value)) {
							err = true;
							showErr(input, 'Niepoprawny format adresu email');
						}

						break;


					case 'your-name':
					case 'your-surname':
						if (input.value.replace(/[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+/g, '').length > 0) {
							err = true;
							showErr(input, 'Wartość pola jest nieprawidłowa');
						}

						break;

					default:
						break;
				}

				if (!err) {
					hideErr(input);
				}
			});
		});

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			let err = false;

			inputs.forEach(input => {
				if (input.value <= 1) {
					showErr(input, 'Uzupełnij pole');
					err = true;
					return;
				}

				switch (input.getAttribute('name')) {
					case 'your-phone':
						if (input.value.length < 15) {
							err = true;
							showErr(input, 'Pole wypełnione niepoprawnie');
						}

						break;

					case 'your-mail':

						let regexp = /^[\w\d%$:.-]+@\w+\.\w{2,5}$/;

						if (!regexp.test(input.value)) {
							err = true;
							showErr(input, 'Niepoprawny format adresu email');
						}

						break;


					case 'your-name':
					case 'your-surname':
						if (input.value.replace(/[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+/g, '').length > 0) {
							err = true;
							showErr(input, 'Wartość pola jest nieprawidłowa');
						}

						break;

					default:
						break;
				}
			});

			if (!err) {
				location.href = this.getAttribute('action');
			}
		});
	});

	function showErr(input, msg) {
		let msgEl = input.parentElement.querySelector('.form__message');

		if (msgEl == null) {
			msgEl = document.createElement('div');
			msgEl.classList.add('form__message');
			input.parentElement.appendChild(msgEl);
		}

		input.classList.add('form__input--fault');

		msgEl.textContent = msg;
		msgEl.style.opacity = 0;

		window.requestAnimationFrame(function () {
			window.requestAnimationFrame(function () {
				msgEl.style.opacity = 1;
			});
		});
	};

	function hideErr(input) {
		let msgEl = input.parentElement.querySelector('.form__message');

		input.classList.remove('form__input--fault');

		if (msgEl) {
			msgEl.style.opacity = 0;

			msgEl.addEventListener('transitionend', function () {
				input.parentElement.removeChild(msgEl);
			}, { once: true });
		}
	}
});