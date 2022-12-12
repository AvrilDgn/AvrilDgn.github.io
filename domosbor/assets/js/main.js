class Accordion {
	constructor(target, config) {
		this._el = typeof target === 'string' ? document.querySelector(target) : target;
		const defaultConfig = {
			alwaysOpen: true,
			duration: 350,
			itemClass: 'accordion__item',
			headClass: 'accordion__head',
			bodyClass: 'accordion__body',
		};
		this._config = Object.assign(defaultConfig, config);
		this.addEventListener();
	}
	addEventListener() {
		if (this._el == null) {
			return;
		}

		this._el.addEventListener('click', (e) => {
			const elHeader = e.target.closest('.' + this._config.headClass);

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
		const body = el.querySelector('.' + this._config.bodyClass);

		// 	window.requestAnimationFrame(function () {
		// 		callback();
		// 	});
		el.classList.add('show');
		const height = body.offsetHeight;
		body.style.height = 0;
		body.style.overflow = 'hidden';
		body.style.transition = `height ${this._config.duration}ms ease-out`;
		body.classList.add('collapsing');
		body.offsetHeight;
		body.style.height = `${height}px`;

		body.addEventListener('transitionend', function () {
			body.classList.remove('collapsing');
			body.classList.add('collapse');
			body.style.display = '';
			body.style.height = '';
			body.style.transition = '';
			body.style.overflow = '';
		}, { once: true });
	}
	hide(el) {
		const body = el.querySelector('.' + this._config.bodyClass);

		body.style.height = `${body.offsetHeight}px`;
		body.offsetHeight;
		body.style.display = 'block';
		body.style.height = 0;
		body.style.overflow = 'hidden';
		body.style.transition = `height ${this._config.duration}ms ease-out`;
		body.classList.remove('collapse');
		el.classList.remove('show');
		body.classList.add('collapsing');

		body.addEventListener('transitionend', function () {
			body.classList.remove('collapsing');
			body.classList.add('collapse');
			body.style.display = '';
			body.style.height = '';
			body.style.transition = '';
			body.style.overflow = '';
		}, { once: true });
	}
	toggle(el) {
		el.classList.contains('show') ? this.hide(el) : this.show(el);
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

	// let modals = new Modal();


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
	 * Header open mobile menu
	 */

	const html = document.documentElement;
	const header = document.querySelector('.header');
	const headerPopupWrap = header.querySelector('.header__popup-wrap');
	let openMenuBtn = header.querySelector('.header__menu-btn');
	let openPopupBtn = header.querySelectorAll('.open-popup-btn');
	let isPopupShowed = false;
	let isPopupAnimated = false;
	let _scrollPosition = 0;

	openPopupBtn.forEach(btn => {
		let menuBtn = btn.classList.contains('header__menu-btn');
		let targetContent = headerPopupWrap.querySelector('.header__popup-item.' + btn.dataset.popupTarget);

		if (!targetContent) return;

		btn.addEventListener('click', function () {
			if (isPopupAnimated) {
				return;
			}

			if (!isPopupShowed) {
				headerPopupWrap.querySelector('.header__popup-item.active').classList.remove('active');
				targetContent.classList.add('active');
				openPopup();
				changeMenuBtn();
			} else {
				if (menuBtn) {
					closePopup();
					changeMenuBtn();
				} else {
					if (targetContent.classList.contains('active')) return;

					let curPopup = headerPopupWrap.querySelector('.header__popup-item.active');
					curPopup.style.opacity = 0;
					curPopup.addEventListener('transitionend', function () {
						curPopup.classList.remove('active');
						curPopup.style.opacity = null;
						targetContent.classList.add('active');
						targetContent.style.opacity = 0;

						window.requestAnimationFrame(function () {
							window.requestAnimationFrame(function () {
								targetContent.style.opacity = null;
							});
						});
					}, { once: true });
				}
			}
		});
	});

	function openPopup() {
		header.classList.add('header--popup-opened');
		isPopupShowed = true;

		_scrollPosition = window.pageYOffset;
		const marginSize = window.innerWidth - html.clientWidth;
		html.style.top = `${-_scrollPosition}px`;

		if (marginSize) {
			html.style.marginRight = `${marginSize}px`;
			header.style.paddingRight = `${parseInt(getComputedStyle(header).paddingRight, 10) + marginSize}px`;
		}
		html.classList.add('modal-opened');
	}

	function closePopup() {
		header.classList.remove('header--popup-opened');
		isPopupShowed = false;

		html.classList.remove('modal-opened');
		html.style.marginRight = '';
		header.style.paddingRight = '';
		window.scrollTo(0, _scrollPosition);
		html.style.top = '';
	}

	function changeMenuBtn() {
		isPopupAnimated = true;

		if (!openMenuBtn.classList.contains('cross')) {
			openMenuBtn.classList.add('collapse');
			openMenuBtn.addEventListener('transitionend', function () {
				openMenuBtn.classList.add('cross');
				openMenuBtn.addEventListener('transitionend', function () {
					isPopupAnimated = false;
				}, { once: true });
			}, { once: true });
		} else {
			openMenuBtn.classList.remove('cross');
			openMenuBtn.addEventListener('transitionend', function () {
				openMenuBtn.classList.remove('collapse');
				openMenuBtn.addEventListener('transitionend', function () {
					isPopupAnimated = false;
				}, { once: true });
			}, { once: true });
		}
	}


	/**
	 * Menu links
	 */

	let menuCols = document.querySelectorAll('.nav-menu__column, .footer__nav-links');
	let actCol = null;

	menuCols.forEach(col => {
		let title = col.querySelector('.nav-menu__links-title, .footer__links-title');
		let content = col.querySelector('.nav-menu__links-list, .footer__links-list');

		title.addEventListener('click', function (e) {
			if (actCol) {
				if (col.classList.contains('showed')) return;

				let actColContent = actCol.querySelector('.nav-menu__links-list, .footer__links-list');
				// let actColHeight = actColContent.offsetHeight;
				// actColContent.style.height = actColHeight + 'px';

				// window.requestAnimationFrame(function () {
				// 	window.requestAnimationFrame(function () {
				// actColContent.style.height = 0;
				// 	});
				// });

				// actColContent.addEventListener('transitionend', function () {
				actColContent.style.height = null;
				actCol.classList.remove('showed');
				// }, { once: true });
			}

			col.classList.add('showed');
			content.style.height = 'auto';
			let colHeight = content.offsetHeight;
			content.style.height = 0;
			console.log(colHeight);
			actCol = col;

			window.requestAnimationFrame(function () {
				window.requestAnimationFrame(function () {
					content.style.height = colHeight + 'px';
				});
			});
		});
	});



	/**
	 * Search
	 */

	let search = document.querySelectorAll('.search-bar');

	search.forEach(el => {
		let openBtn = el.querySelector('.search-bar__btn');
		let hidden = el.classList.contains('hidden');

		openBtn.addEventListener('click', function (e) {
			if (hidden) {
				e.preventDefault();
				hidden = false;
				el.classList.remove('hidden');
			}
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

		snapValues[0].addEventListener('change', function () {
			sliderRange.noUiSlider.set([this.value, null]);
		});
		snapValues[1].addEventListener('change', function () {
			sliderRange.noUiSlider.set([null, this.value]);
		});
	});


	/**
	 * Tabs
	 */

	let tabWraps = document.querySelectorAll('.tabs');

	tabWraps.forEach(tabWrap => {
		let btns = tabWrap.querySelectorAll('.tabs__buttons .button');
		let placeholder = tabWrap.querySelector('.tabs__placeholder');

		placeholder.addEventListener('click', function () {
			tabWrap.classList.toggle('opened');
		});

		btns.forEach(btn => {
			let btnText = btn.textContent;
			let isAnimated = false;

			btn.addEventListener('click', function (e) {
				if (btn.classList.contains('active') || isAnimated == true) {
					return;
				}

				let activeBtn = tabWrap.querySelector('.tabs__buttons .button.active');
				let activeEl = tabWrap.querySelector('.tabs__content.active');
				let nextEl = document.querySelector(`.tabs__content[data-tab-id="${btn.dataset.tabTarget}"]`);

				isAnimated = true;
				activeBtn.classList.remove('active');
				activeEl.style.opacity = 0;

				activeEl.addEventListener('transitionend', function () {
					activeEl.style.opacity = null;
					activeEl.classList.remove('active');
					btn.classList.add('active');
					placeholder.querySelector('span').textContent = btnText;
					tabWrap.classList.remove('opened');
					nextEl.classList.add('active');
					nextEl.style.opacity = 0;

					window.requestAnimationFrame(function () {
						window.requestAnimationFrame(function () {
							nextEl.style.opacity = null;
							isAnimated = false;
						});
					});
				}, { once: true });
			})
		});
	});


	/**
	 * Type Selection
	 */

	let typeSelections = document.querySelectorAll('.type-selection');

	typeSelections.forEach(wrapper => {
		let head = wrapper.querySelector('.type-selection__selected');
		let headText = wrapper.querySelector('.type-selection__selected-text');
		let inputs = wrapper.querySelectorAll('input');

		head.addEventListener('click', function () {
			wrapper.classList.toggle('show');
		});

		inputs.forEach(input => {
			input.addEventListener('change', function () {
				headText.textContent = this.value;
				wrapper.classList.toggle('show');
			});
		});
	});


	/**
	 * Accordion
	 */

	new Accordion('.faq__list', {
		alwaysOpen: false,
		duration: 350,
		itemClass: 'faq__item',
		headClass: 'faq__head',
		bodyClass: 'faq__body',
	});

	new Accordion('.cooperation__list', {
		alwaysOpen: false,
		duration: 350,
		itemClass: 'cooperation-item',
		headClass: 'cooperation-item__head',
		bodyClass: 'cooperation-item__body',
	});

	new Accordion('.services__list', {
		alwaysOpen: false,
		duration: 350,
		itemClass: 'service-item',
		headClass: 'service-item__head',
		bodyClass: 'service-item__body',
	});


	/**
	 * Selects
	 */

	let selects = document.querySelectorAll('.select');

	selects.forEach(select => {
		new SlimSelect({
			select: select,
			showSearch: false,
		});
	});


	/**
	 * Sliders
	 */

	//projects
	let projectsSlider = document.querySelector('.projects__slider.slider');

	if (projectsSlider !== null) {
		new Swiper(projectsSlider.querySelector(".slider__wrap"), {
			spaceBetween: 30,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			freeMode: true,
			slidesPerView: "auto",

			navigation: {
				nextEl: projectsSlider.querySelector(".slider__arrow--next"),
				prevEl: projectsSlider.querySelector(".slider__arrow--prev"),
				disabledClass: 'disabled',
			},

			pagination: {
				el: projectsSlider.querySelector(".slider__pagination"),
				bulletClass: "slider__bullet",
				bulletActiveClass: "active",
				clickable: true,
			},

			breakpoints: {
				// 768: {
				// },
				// 992: {
				// },
				1200: {
					freeMode: false,
					slidesPerView: 5,
				},
			},
		});
	}

	//project card images
	let projCardSlidersWraps = document.querySelectorAll('.proj-card-full__images-item');

	projCardSlidersWraps.forEach(slidersWrap => {
		let projCardMainSlider = slidersWrap.querySelector('.proj-card-full__main-slider.slider');
		let projCardThumbSlider = slidersWrap.querySelector('.proj-card-full__thumb-slider.slider');

		if (projCardMainSlider == null || projCardThumbSlider == null) {
			return;
		}

		//thumb
		let thumb = new Swiper(projCardThumbSlider.querySelector(".slider__wrap"), {
			spaceBetween: 30,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			slidesPerView: 2,

			freeMode: true,
			watchSlidesProgress: true,

			navigation: {
				nextEl: projCardThumbSlider.querySelector(".slider__arrow--next"),
				prevEl: projCardThumbSlider.querySelector(".slider__arrow--prev"),
				disabledClass: 'disabled',
			},
			pagination: {
				el: projCardThumbSlider.querySelector(".slider__pagination"),
				bulletClass: "slider__bullet",
				bulletActiveClass: "active",
				clickable: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 3,
				},
			},
		});

		//main
		let main = new Swiper(projCardMainSlider.querySelector(".slider__wrap"), {
			spaceBetween: 10,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			slidesPerView: 1,

			thumbs: {
				swiper: thumb,
			},
		});
	});

	//post image slider
	let postImageSliders = document.querySelectorAll('.post__image.slider');

	postImageSliders.forEach(slider => {
		new Swiper(slider.querySelector(".slider__wrap"), {
			spaceBetween: 30,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			freeMode: false,
			slidesPerView: 1,

			pagination: {
				el: slider.querySelector(".slider__pagination"),
				bulletClass: "slider__bullet",
				bulletActiveClass: "active",
				clickable: true,
			},
		});
	});


	//about page description text slider
	let aboutDescSliders = document.querySelectorAll('.about__desc.slider');

	aboutDescSliders.forEach(slider => {
		let counter = slider.querySelector('.about__desc-number');

		let el = new Swiper(slider.querySelector(".slider__wrap"), {
			spaceBetween: 30,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			freeMode: false,
			slidesPerView: 1,

			navigation: {
				nextEl: slider.querySelector(".slider__arrow--next"),
				prevEl: slider.querySelector(".slider__arrow--prev"),
				disabledClass: 'disabled',
			},
		});

		el.on('slideChange', function (e) {
			counter.textContent = '0' + (e.activeIndex + 1);
		})
	});


	//chat slider
	let chatSliders = document.querySelectorAll('.cabinet-chat__messages');

	chatSliders.forEach(slider => {
		let scrollbar = document.createElement('div');
		scrollbar.classList.add('swiper-scrollbar');
		slider.appendChild(scrollbar);

		let swiper = new Swiper(slider, {
			direction: "vertical",
			wrapperClass: 'cabinet-chat__messages-wrap',
			slideClass: 'cabinet-chat__messages-content',
			slidesPerView: "auto",
			freeMode: true,
			scrollbar: {
				el: scrollbar,
			},
			mousewheel: true,
		});

		swiper.scrollbar.setTranslate('translate3d(0px, 300px, 0px)');
	});


	//cabinet obj media slider
	let cabinetMediaSliders = document.querySelectorAll('.cabinet-media.slider');

	cabinetMediaSliders.forEach(slider => {
		let el = new Swiper(slider.querySelector(".slider__wrap"), {
			spaceBetween: 30,
			wrapperClass: 'slider__list',
			slideClass: 'slider__slide',
			freeMode: false,
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
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 5,
				},
			},
		});
	});


	//mob sliders
	let mobileSliders = document.querySelectorAll(".slider--lg");

	mobileSliders.forEach(slider => {
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


	//update sliders
	function updateMobileSliders() {
		mobileSliders.forEach(slider => {
			slider.swiper.update();
		});
	}
	window.addEventListener('resize', updateMobileSliders);


	/**
	 * Project card anim
	 */

	let projCards = document.querySelectorAll('.project-card--second-type');

	projCards.forEach(card => {
		let cardContent = card.querySelector('.project-card__content');

		let showCardContent = function () {
			cardContent.style.height = 'auto';
			let height = cardContent.offsetHeight;
			cardContent.style.height = '0';

			window.requestAnimationFrame(function () {
				window.requestAnimationFrame(function () {
					cardContent.style.height = height + 'px';
				});
			});
		}
		let hideCardContent = function () {
			cardContent.style.height = null;
		}

		card.addEventListener('mouseenter', function (e) {
			showCardContent();
		});
		card.addEventListener('mouseleave', function (e) {
			hideCardContent();
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