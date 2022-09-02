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

$(document).ready(function () {

	/**
	 * Open mobile menu
	 */

	$('.header__open-menu-btn').on('click', function () {
		$('.header__mobile').addClass('header__mobile--showed');
	});
	$('.header__close-menu-btn').on('click', function () {
		$('.header__mobile').removeClass('header__mobile--showed');
	});
	$(window).on("resize", function () {
		$('.header__mobile').removeClass('header__mobile--showed');
	});


	/**
	 * Anchor scroll
	 */

	$(document).on("click", 'a[href^="#"]', function (e) {
		if ($(this).attr('href').length <= 1) return;

		e.preventDefault();

		$('.header__menu').removeClass('header__menu--showed');

		$("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top
		}, 500);
	});


	/**
	 * Sliders
	 */

	// $('.portfolio__slider-wrap').slick({
	// 	infinite: true,
	// 	speed: 300,
	// 	slidesToShow: 1,
	// 	centerMode: true,
	// 	variableWidth: true,
	// 	infinite: true,
	// 	autoplay: true,
	// 	autoplaySpeed: 3000,
	// 	prevArrow: $('.portfolio__slider').find('.slick__arrow--prev'),
	// 	nextArrow: $('.portfolio__slider').find('.slick__arrow--next'),
	// });

	// $('.promotions__slider-wrap').slick({
	// 	infinite: false,
	// 	speed: 300,
	// 	slidesToShow: 1,
	// 	infinite: true,
	// 	autoplay: true,
	// 	autoplaySpeed: 3000,
	// 	prevArrow: $('.promotions__slider').find('.slick__arrow--prev'),
	// 	nextArrow: $('.promotions__slider').find('.slick__arrow--next'),
	// });

	// $('.reviews__slider-wrap').slick({
	// 	infinite: false,
	// 	speed: 300,
	// 	slidesToShow: 2,
	// 	prevArrow: $('.reviews__slider').find('.slick__arrow--prev'),
	// 	nextArrow: $('.reviews__slider').find('.slick__arrow--next'),
	// 	responsive: [
	// 		{
	// 			breakpoint: 1200,
	// 			settings: {
	// 				slidesToShow: 1,
	// 			}
	// 		},
	// 	]
	// });

	let slider = $('.principles__slider-wrap').slick({
		// centerMode: true,
		infinite: true,
		speed: 300,
		// slidesToShow: 3,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: $('.principles').find('.slick__arrow--prev'),
		nextArrow: $('.principles').find('.slick__arrow--next'),
	});

	$('.slider-progress').each(function (i, el) {
		let sliderId = $(el).data('slider'),
			$slider = $('#' + sliderId),
			$progressInput = $(el).find('.slider-progress__input');

		$progressInput.attr('max', $slider[0].slick.slideCount - 1)

		$slider.on('afterChange', function (event, slick, currentSlide) {
			$progressInput.val(currentSlide);
			console.log(currentSlide)
		});

		$($progressInput).mousedown(function () {
			$slider.slick('slickPause')
		});

		$($progressInput).mouseup(function () {
			$slider.slick('slickPlay')
		})

		$($progressInput).on('input', function () {
			$slider.slick('slickGoTo', $(this).val());
		})
	})


	/**
	 * Accordion
	 */

	new Accordion('.advantages__list', {
		alwaysOpen: false,
		duration: 350,
		itemClass: 'advantage',
		headerClass: 'advantage__head',
		bodyClass: 'advantage__body',
	});


	/**
	 * Modal
	 */

	let modals = new Modal();

	// let wpcf7Elm = document.querySelector( '.wpcf7' );

	// wpcf7Elm.addEventListener( 'wpcf7mailsent', function( event ) {
	// 	 modals.close();
	// }, false );


	/**
	 * Input mask
	 */

	$("input[name='phone']").mask("+7 (999) 999-99-99", { placeholder: "+7 (___) ___-__-__" });


	/**
	 * Map
	 */

	// function init() {
	// 	let logoPath = $('#map').attr('data-logo');
	// 	let coordinates = $('#map').attr('data-coord').split(', ');

	// 	let myMap = new ymaps.Map("map", { center: coordinates, behaviors: ["default"], zoom: 17, controls: ["zoomControl", "fullscreenControl"] })
	// 	myMap.behaviors.disable(["rightMouseButtonMagnifier", "scrollZoom"]);

	// 	myIconLayout = ymaps.templateLayoutFactory.createClass([
	// 		`<svg width="60" height="68" viewBox="0 0 60 68" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: -80px; left: -30px;">
	// 			<path d="M30.7,67.2c0,0.3-0.3,0.6-0.7,0.6c-0.4,0-0.7-0.3-0.7-0.6c-0.2-4.1-2.3-6.8-6.3-8C9.8,56,0,44.2,0,30C0,13.4,13.4,0,30,0s30,13.4,30,30c0,14.2-9.8,26-23,29.2C33,60.4,30.9,63.1,30.7,67.2L30.7,67.2z" fill="#cfadac"/>
	// 			<image href="${logoPath}" height="40" width="40" transform="translate(10 10)"/>
	// 		</svg>`
	// 	].join(''));

	// 	myPlacemark = new ymaps.Placemark(
	// 		coordinates, {}, {
	// 		iconLayout: myIconLayout,
	// 	}), myMap.geoObjects.add(myPlacemark);
	// }
	// ymaps.ready(init);
});