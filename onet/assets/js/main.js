document.addEventListener("DOMContentLoaded", function (domLoadedEvent) {

	// Changing header depending on the position
	let header = document.querySelector('.header');
	let changeHeaderHandler = (e) => {
		if (window.pageYOffset > 150) {
			header.classList.add('header--not-top');
		} else {
			header.classList.remove('header--not-top');
		}
	};

	changeHeaderHandler();

	window.addEventListener('scroll', changeHeaderHandler);



	//review form

	let reviewSendWrap = document.querySelector('.review-send__wrap');
	let reviewSendForm = reviewSendWrap.querySelector('form');
	let reviewSendModeration = reviewSendWrap.querySelector('.review-send__moderation');

	reviewSendForm.addEventListener('submit', function (e) {
		e.preventDefault();

		reviewSendForm.style.opacity = 0;

		reviewSendForm.addEventListener('transitionend', function() {
			reviewSendForm.style.display = 'none';
			reviewSendModeration.style.position = 'static';
			reviewSendModeration.style.opacity = 1;
		});
	});


	//review like

	let likeIcon = document.querySelectorAll('.review-card__like i');

	likeIcon.forEach(icon => {
		icon.addEventListener('click', function() {
			this.classList.toggle('active');
		});
	});
});