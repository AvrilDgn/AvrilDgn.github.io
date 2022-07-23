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

$(document).ready(function () {
	/**
	 * Input mask
	 */

	$("input[name='phone']").mask("+7 (999) 999-99-99", { placeholder: "_" });


	/**
	 * Menu fixation
	 */

	let headerFixation = function () {
		let header = $(".header");

		if ($(window).scrollTop() > 10) {
			header.addClass("header--fixed");
		} else {
			if (!$('html').hasClass('modal-opened')) {
				header.removeClass("header--fixed");
			}
		}
	}

	headerFixation();
	$(window).on("scroll", headerFixation);


	/**
	 * Anchor scroll
	 */

	$(document).on("click", 'a[href^="#"]', function (e) {
		if ($(this).attr('href').length <= 1) return;

		e.preventDefault();

		$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top
		}, 500);
	});


	/**
	 * Accrual numbers
	 */

	let numbersWrap = $(".indicators");
	let numbersStatus = true;

	function accrual() {
		let scrollEvent = ($(window).scrollTop() > (numbersWrap.offset().top - $(window).height())
			&& $(window).scrollTop() < (numbersWrap.offset().top));

		if (scrollEvent && numbersStatus) {
			numbersStatus = false;

			$(".indicators__value[data-count]").each(function (i, el) {
				$({ numberValue: 0 }).animate({ numberValue: parseInt($(this).text(), 10) }, {
					duration: 3000,
					easing: "linear",
					step: function (val) {
						$(el).html(Math.ceil(val) + '+');
					}
				});
			});
		}
	}
	accrual();
	$(window).scroll(accrual);


	/**
	 * Cycles tabs
	 */

	let cycleIndex = 0;
	let cyclesLength = $('.cycles__navigation-item').length;
	let navPosition = 0;
	let navWidth = $('.cycles__navigation').width();
	let navWidthDiff = $('.cycles__navigation-wrap').width() - navWidth;

	$(window).resize(function () {
		navWidth = $('.cycles__navigation').width();
		navWidthDiff = $('.cycles__navigation-wrap').width() - navWidth;
		navPosition = 0;
		moveNav();
	});

	function moveNav() {
		if (navPosition > 0) {
			navPosition = 0;
		}
		if (navPosition < -navWidthDiff) {
			navPosition = -navWidthDiff;
		}
		$('.cycles__navigation-wrap').css('transform', `translateX(${navPosition}px)`);
	}

	let changeCycle = function (index) {
		let tabEl = $('.cycles__navigation-item').eq(index);

		if (tabEl.hasClass('cycles__navigation-item--active')) {
			return;
		}

		$('.cycles__navigation-item--active').removeClass('cycles__navigation-item--active');
		tabEl.addClass('cycles__navigation-item--active');

		navPosition = (navWidth / 2) - (tabEl.position().left + tabEl.width() / 2);
		moveNav();


		$('.cycles__tab-wrapper').fadeOut("fast", function () {
			$('.cycles__stage').html('Этап ' + (index + 1)),
				$('.cycles__item--active').css('transform', 'translateX(0)').removeClass('cycles__item--active'),
				$('.cycles__item').eq(index).css('transform', 'translateX(-' + index + '00%)').addClass('cycles__item--active'),
				$('.cycles__image').css('background-image', 'url(' + $('.cycles__item').eq(index).attr('data-image') + ')'),
				$('.cycles__stages').html('<b>' + ("0" + (index + 1)).slice(-2) + '</b>/10'),
				$('.cycles__arrow').prop('disabled', false);

			if (index <= 0) {
				$('.cycles__arrow--prev').prop('disabled', true);
			}
			if (index >= cyclesLength - 1) {
				$('.cycles__arrow--next').prop('disabled', true);
			}
		}).fadeIn('fast');
	}


	$('.cycles__navigation-item').each(function (i) {
		$(this).on("click", function () {
			cycleIndex = i;
			changeCycle(i);
		});
	});

	let touchPos = null;

	$('.cycles__image').on("touchstart", function (e) {
		touchPos = e.originalEvent.touches[0].pageX;
	});
	$('.cycles__image').on("touchmove", function (e) {
		if (touchPos == null) return;

		let pos = e.originalEvent.touches[0].pageX;

		if (touchPos < pos && cycleIndex > 0) {
			cycleIndex--;
			changeCycle(cycleIndex);
			touchPos = null;
		}
		if (touchPos > pos && cycleIndex < cyclesLength - 1) {
			cycleIndex++;
			changeCycle(cycleIndex);
			touchPos = null;
		}
	});
	$('.cycles__image').on("touchend", function () {
		touchPos = null;
	});

	$('.cycles__arrow--next').on("click", function () {
		if (cycleIndex < cyclesLength - 1) {
			cycleIndex++;
			changeCycle(cycleIndex);
		}
	});
	$('.cycles__arrow--prev').on("click", function () {
		if (cycleIndex > 0) {
			cycleIndex--;
			changeCycle(cycleIndex);
		}
	});

	//navigation scroll

	let toutchOldPos = null;
	let navTransition;

	$('.cycles__navigation').on("mousedown", function (e) {
		if ($(this).width() < $('.cycles__navigation-wrap').width()) {
			toutchOldPos = e.pageX;
			navTransition = $('.cycles__navigation-wrap').css('transition');
			$('.cycles__navigation-wrap').css('transition', 'initial');
		}
	});
	$('.cycles__navigation').on("touchstart", function (e) {
		if ($(this).width() < $('.cycles__navigation-wrap').width()) {
			toutchOldPos = e.touches[0].clientX;
			navTransition = $('.cycles__navigation-wrap').css('transition');
			$('.cycles__navigation-wrap').css('transition', 'initial');
		}
	});
	$('.cycles__navigation').on("mousemove", function (e) {
		if (toutchOldPos === null) return;

		navPosition = navPosition - (toutchOldPos - e.pageX);
		toutchOldPos = e.pageX;
		moveNav();
	});
	$('.cycles__navigation').on("touchmove", function (e) {
		if (toutchOldPos == null) return;

		navPosition = navPosition - (toutchOldPos - e.touches[0].clientX);
		toutchOldPos = e.touches[0].clientX;
		moveNav();
	});
	$('.cycles__navigation').on("mouseup mouseleave touchend", function (e) {
		if (toutchOldPos == null) return;

		e.stopPropagation();
		toutchOldPos = null;
		$('.cycles__navigation-wrap').css('transition', navTransition);
	});



	/**
	 * Facades tabs
	 */

	$('.facades__navigation-item').on("click", function () {
		let target = $(this).attr('data-target');

		$('.facades__navigation-item--active').removeClass('facades__navigation-item--active'),
			$(this).addClass('facades__navigation-item--active');
		$('.facades__tab-wrapper').fadeOut("fast", function () {
			$('.facades__content--active').removeClass('facades__content--active'),
				$('.facades__content[data-id="' + target + '"]').addClass('facades__content--active');
		}).fadeIn('fast');
	});


	/**
	 * Variants tabs
	 */

	let variantsSlider = $(".range-slider__wrap").slider({
		classes: {
			"ui-slider": "range-slider__wrap",
			"ui-slider-range": "range-slider__range",
			"ui-slider-handle": "range-slider__handle",
		},
		value: 50000,
		min: 50000,
		max: 300000,
		orientation: "horizontal",
		animate: "fast",
		range: "min",
		step: 100,
		isStart: false,
		// slide: function (event, ui) {
		// },
		start: function (event, ui) {
			this.isStart = true;
		},
		change: function (event, ui) {
			if (this.isStart) {
				this.isStart = false;
				changeVariant(ui.value);
			}
		},
	});

	$(".variants__prices-item").on("click", function () {
		changeVariant($(this).attr('data-price'));
	});

	let priceValues = $('.variants__prices-item').map(function () {
		return $(this).attr('data-price');
	}).get();

	function changeVariant(value) {
		let appropriateValue = null;

		$.each(priceValues, function () {
			if (this <= value && (appropriateValue == null || (value - this) < (value - appropriateValue))) {
				appropriateValue = this;
			}
		});

		let targetPrice = $(`.variants__prices-item[data-price="${appropriateValue}"]`);

		$('.variants__prices-item--active').removeClass('variants__prices-item--active'),
			targetPrice.addClass('variants__prices-item--active');

		variantsSlider.slider("value", value);

		$('.variants__tab-wrapper').fadeOut("fast", function () {
			$('.variants__content--active').removeClass('variants__content--active'),
				$(`.variants__content[data-value="${appropriateValue}"]`).addClass('variants__content--active');
		}).fadeIn('fast');
	}


	/**
	 * Modal
	 */

	let modals = new Modal();


	/**
	 * Map
	 */

	function init() {
		let logoPath = $('#map').attr('data-logo');

		let myMap = new ymaps.Map("map", { center: [60.929385, 76.528641], behaviors: ["default"], zoom: 17, controls: ["zoomControl", "fullscreenControl"] })
		myMap.behaviors.disable(["rightMouseButtonMagnifier", "scrollZoom"]);

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			myMap.behaviors.disable('drag');
		};

		myIconLayout = ymaps.templateLayoutFactory.createClass([
			`<svg width="98" height="106" viewBox="0 0 98 106" style="position: absolute; top: -136px; left: -49px;">'
			<path fill-rule="evenodd" clip-rule="evenodd" d="M57.9795 97.1791C80.753 92.9613 98 72.9948 98 49C98 21.938 76.062 0 49 0C21.938 0 0 21.938 0 49C0 73.4008 17.8357 93.6359 41.1813 97.3796L48.4344 105.292C49.2594 106.192 50.6911 106.149 51.461 105.202L57.9795 97.1791Z" fill="#21222B"/>'
			<image href="${logoPath}" height="30" width="77" transform="translate(10 33)"/>'
			</svg>`
		].join(''));

		myPlacemark = new ymaps.Placemark(
			[60.929385, 76.528641], {}, {
			iconLayout: myIconLayout,
		}), myMap.geoObjects.add(myPlacemark);
	}
	ymaps.ready(init);
});