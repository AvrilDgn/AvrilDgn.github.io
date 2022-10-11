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