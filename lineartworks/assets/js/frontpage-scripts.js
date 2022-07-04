;(function($) {

	$(function() {

		$('.custom-select').each(function(){
			var $this = $(this), numberOfOptions = $(this).children('option').length;

			$this.addClass('select-hidden'); 
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');

			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option').eq(0).text());

			var $list = $('<ul />', {
				'class': 'select-options'
			}).insertAfter($styledSelect);

			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val()
				}).appendTo($list);
			}

			var $listItems = $list.children('li');

			$styledSelect.click(function(e) {
				e.stopPropagation();
				$('div.select-styled.active').not(this).each(function(){
					$(this).removeClass('active').next('ul.select-options').hide();
				});
				$(this).toggleClass('active').next('ul.select-options').toggle();
			});

			$listItems.click(function(e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				$list.hide();
    });

			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});

		});

		$('#preloader_home_main').removeClass('active');
		$('body').removeClass('overflow_hidden');
		// $('#pl_page_1').waitForImages(function() {
		// });

		// $('body').on('mouseenter mouseleave', '.video-block__iframe', function() {

		// 	var currentMousePos;

		// });
		
		var container, 
		videoBlock,
		videoID,
		videoBG,
		closeVideo,
		videoBlockCorner;

		container = $('.front-about__video-block.home-page');
		videoBlockCorner = container.find('.front-about__video-block-corner');
		videoBlock = container.find('.video-block');
		videoID = container.data('video-id');
		videoBG =  container.parent().find('.front-about__video-block').data('video-bg');
		closeVideo = $('.front-about__close-video');

		container.on('click', function() {

			container.removeClass('play').addClass('preload');
			videoBlockCorner.animate({'left': '-100px'}, 500);

			container.animate({
				width: '100%', 
			}, 500, function() {

				container.css({
					'background-color': '#000', 
					'background-image': 'none'
				})
				

				closeVideo
				.css('display', 'block')
				.animate({
					top: '30px',
					opacity: 1
				}, 500);

				$('<iframe>')
				.addClass('video-block__iframe')
				.attr({
					src: 'https://www.youtube.com/embed/' + videoID + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0&mute=1',
					width: '100%',
					height: '100%',
					frameborder: '0',
					allow: 'autoplay; encrypted-media',
					allowfullscreen: '',
				})
				.appendTo(videoBlock)
				.on('load', function() {
					container.removeClass('preload');
				});
			});
		});

		closeVideo.on('click', function() {

			var _th = $(this);

			_th.animate({
				// top: '0',
				opacity: 0
			}, 500, function() {
				_th.css({
					'display': 'none',
					'top': '0'
				})
			});

			container.animate({
				width: '300px', 
			}, 500, function() {
				container.css({
					'background-color': 'transparent',
					'background-image': 'url(' + videoBG + ')'
				})
			})

			videoBlockCorner.animate({'left': '0'}, 500);
			videoBlock.find('.video-block__iframe').remove();
			container.addClass('play');

		});


		$(window).on('scroll', function() {

			if($('body').hasClass('home')) {
				if ( $(window).scrollTop() > Math.round($('.front-about').position().top + $('.front-about').height()) ) {

					closeVideo.animate({
						// top: '0',
						opacity: 0
					}, 500, function() {
						closeVideo.css({
							'display': 'none',
							'top': '0'
						})
					});

					container.animate({
						width: '300px', 
					}, 500, function() {
						container.css({
							'background-color': 'transparent',
							'background-image': 'url(' + videoBG + ')'
						})
					})

					videoBlockCorner.animate({'left': '0'}, 500);
					videoBlock.find('.video-block__iframe').remove();
					container.addClass('play');

				}
			}

		});


		$('.project-slider__inner').slick({
			fade: true,
			arrow: true,
			dots: true,
			prevArrow: '<button class="project-slider__arrow project-slider__arrow-prev"></button>',
			nextArrow: '<button class="project-slider__arrow project-slider__arrow-next"></button>'
		});

		var pageCounter = 2;

		$('.project-slider__inner').on('beforeChange', function(event, slick, currentSlide, nextSlide) {

			var row,
			nextSlideTag,
			sendObj

			pageCounter = 2;
			row = $('<div>');
			nextSlideTag = $('.project-slider__slide').eq(nextSlide).data('slide-tag');
			sendObj = {};

			sendObj.action = 'load-projects';
			sendObj.nonce = frontPageSlider.nonce;
			sendObj.tagID = nextSlideTag;
			sendObj.paged = false;

			row.addClass('project-container__row preload')
			$('.project-container__inner').html(row);

			if ( !$('.project-container__item').length < 12 ) {
				$('.project-container__load-more').fadeIn('fast');
			}

			$.ajax({
				url: frontPageSlider.ajaxurl,
				type: 'post',
				data: sendObj,
			})
			.done(function(data) {
				row.removeClass('preload');
				row.html(data);
				row.animate( { opacity: 1 }, 500 );
			})
			.fail(function() {
				console.log('fail');
			})
			.always(function() {
			});
			
		});

		$('.project-container__load-more').on('click', function() {

			var row,
			nextSlideTag,
			sendObj;

			row = $('<div>');
			nextSlideTag = $('.project-slider__slide').eq($('.project-slider__inner').slick('slickCurrentSlide')).data('slide-tag');
			sendObj = {};

			sendObj.action = 'load-projects';
			sendObj.nonce = frontPageSlider.nonce;
			sendObj.tagID = nextSlideTag;
			sendObj.paged = true;
			sendObj.page = pageCounter;

			row.addClass('project-container__row preload')
			$('.project-container__inner').append(row);

			$.ajax({
				url: frontPageSlider.ajaxurl,
				type: 'post',
				data: sendObj,
			})
			.done(function(data) {
				row.removeClass('preload');
				row.html(data);

				if ( row.find('.project-container__item').length < 12 ) {
					$('.project-container__load-more').fadeOut('fast');
				}

				pageCounter += 1;
			})
			.fail(function() {
				console.log('fail');
			})
			.always(function() {
			});
		});

	});

})(jQuery);