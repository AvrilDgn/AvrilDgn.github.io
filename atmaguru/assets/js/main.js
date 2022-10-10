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

				//feedback
				let locationInput = this._nextWindows.querySelector('input[name="location"]');
				if (locationInput) {
					let location = this.starter.getAttribute("data-location");
					locationInput.value = location;
				}

				//employee
				let employeeName = this._nextWindows.querySelector('.modal__name');
				let employeePosition = this._nextWindows.querySelector('.modal__position');
				let employeeDescription = this._nextWindows.querySelector('.modal__description');

				if (employeeName && employeePosition && employeeDescription) {
					let name = this.starter.querySelector(".employee-card__name");
					let position = this.starter.querySelector(".employee-card__position");
					let description = this.starter.querySelector(".employee-card__description");
					employeeName.innerHTML = name.innerHTML;
					employeePosition.innerHTML = position.innerHTML;
					employeeDescription.innerHTML = description.innerHTML;
				}

				//life
				let lifeTitle = this._nextWindows.querySelector('.modal__life-title');
				let lifeText = this._nextWindows.querySelector('.modal__life-text');

				if (lifeText && lifeTitle) {
					let title = this.starter.parentElement.querySelector(".life__block-title");
					let text = this.starter.parentElement.querySelector(".life__text-block");
					lifeTitle.innerHTML = title.innerHTML;
					lifeText.innerHTML = text.innerHTML;
				}

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
			duration: 350,
			itemClass: 'accordion__item',
			headerClass: 'accordion__header',
			bodyClass: 'accordion__body',
		};
		this._config = Object.assign(defaultConfig, config);
		this.addEventListener();
	}
	addEventListener() {
		if (this._el) {
			this._el.addEventListener('click', (e) => {
				const target = e.target.classList.contains('.' + this._config.itemClass) ? e.target : e.target.closest('.' + this._config.itemClass);
				const elOpenItem = this._el.querySelector('.show');

				this.show(target);

				if (elOpenItem) {
					elOpenItem !== target ? this.toggle(elOpenItem) : null;
				}
			});
		}
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
		var div = $('.header__menu');
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
		href = href.substring(href.lastIndexOf('#') + 1);

		if ($('[data-anchor=' + href + ']').length > 0) {
			e.preventDefault();


			let headerHeight = $('.header').height();

			closeMenu();

			$("html, body").animate({
				scrollTop: $('[data-anchor=' + href + ']').offset().top - headerHeight
			}, 500);
		}
	});


	/**
	 * Modal
	 */

	let modals = new Modal();


	/**
	 * Input mask
	 */

	// $("input[name='your-phone']").mask("+7 (999) 999-99-99", { placeholder: "+7 (___) ___-__-__" });
	$("input[name='your-phone']").mask("+7 (999) 999-99-99");


	/**
	 * Accordion
	 */

	let funcLists = document.querySelectorAll('.functional__list');

	funcLists.forEach(list => {
		new Accordion(list, {
			duration: 350,
			itemClass: 'func-card',
			headerClass: 'func-card__title',
			bodyClass: 'func-card__body',
		});
	});
});