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

$(document).ready(function () {

	/**
	 * Menu fixation
	 */

	let headerFixation = function () {
		let header = $(".header");

		if ($(window).scrollTop() > 100) {
			header.addClass("header--fixed");
		} else {
			if (!$('.main').hasClass('modal-opened')) {
				header.removeClass("header--fixed");
			}
		}
	}

	headerFixation();
	$(window).on("scroll", headerFixation);


	/**
	 * Open mobile menu
	 */

	const html = document.querySelector('.main');
	let _scrollPosition = 0;
	let isMenuShowed = false;

	$('.header__open-menu-btn').on('click', function () {
		$('.header').addClass('header--showed');
		_scrollPosition = window.pageYOffset;
		const marginSize = window.innerWidth - html.clientWidth;
		html.style.top = `${-_scrollPosition}px`;

		if (marginSize) {
			html.style.paddingRight = `${marginSize}px`;
		}
		html.classList.add('modal-opened');
		isMenuShowed = true;
	});

	$('.header__close-menu-btn').on('click', closeMenu);
	$(window).on("resize", closeMenu);
	$(document).on('keyup', closeMenu);
	$(document).mouseup(function (e) {
		var div = $('.header__nav');
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			closeMenu();
		}
	});

	function closeMenu() {
		if (!isMenuShowed) return;

		$('.header').removeClass('header--showed');
		html.classList.remove('modal-opened');
		html.style.paddingRight = '';
		window.scrollTo(0, _scrollPosition);
		html.style.top = '';
		isMenuShowed = false;
	}


	/**
	 * Anchor scroll
	 */

	$(document).on("click", 'a[href*="#"]', function (e) {
		let href = $(this).attr('href');
		href = href.substring(href.lastIndexOf('#'));

		if (href.length > 1 && $(href).length > 0) {
			e.preventDefault();

			let headerHeight = $('.header').height();

			closeMenu();

			$("html, body").animate({
				scrollTop: $(href).offset().top - headerHeight
			}, 500);
		}
		// else if (href.length <= 1) {
		// 	e.preventDefault();

		// 	closeMenu();

		// 	$("html, body").animate({
		// 		scrollTop: $('body').offset().top
		// 	}, 500);
		// }
	});

	$('.scroll-up__btn').on("click", function (e) {
		e.preventDefault();
		closeMenu();

		$("html, body").animate({
			scrollTop: $('body').offset().top
		}, 500);
	});

	let showScrollUp = function () {
		let el = $('.scroll-up');

		if ($(window).scrollTop() > 600) {
			el.addClass("show");
		} else {
			if (!$('.main').hasClass('modal-opened')) {
				el.removeClass("show");
			}
		}
	}

	showScrollUp();
	$(window).on("scroll", showScrollUp);


	/**
	 * Sliders
	 */

	$('.projects__slider').slick({
		infinite: true,
		speed: 300,
		swipeToSlide: true,
		slidesToShow: 4,
		dots: true,
		appendDots: $('.projects__slider-nav'),
		// autoplay: true,
		// autoplaySpeed: 3000,
		prevArrow: $('.projects__slider-nav').find('.projects__arrow--prev'),
		nextArrow: $('.projects__slider-nav').find('.projects__arrow--next'),

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});

	$('.projects__slider-nav .slick-dots button').each(function () {
		let btnNumber = $(this).text();
		if (btnNumber.length <= 1) {
			$(this).text('0' + btnNumber);
		}
	});


	/**
	 * Modal
	 */

	let modals = new Modal();


	/**
	 * Input mask
	 */

	$("input[name='your-phone']").mask("+7 (999) 999-99-99");

});