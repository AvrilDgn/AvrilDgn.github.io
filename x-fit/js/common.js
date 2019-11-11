$('document').ready(function() {

	if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
		$('.contacts__phone').attr("href", "#");
	}

	/*var location = window.location.href,
    	cur_url = '/' + location.split('/').pop();
 
    $('.navbar-nav li').each(function () {
        var link = $(this).find('a'),
        	linkAddr = link.attr('href');

 
        if (cur_url == linkAddr || cur_url == '/' + linkAddr) {
            link.addClass('active');
        }
    });*/

    var cellYoga = $(".table-cell__title_yoga").parent();
    var cellRun = $(".table-cell__title_run").parent();
    var cellBox = $(".table-cell__title_box").parent();
    var cellPilates = $(".table-cell__title_pilates").parent();
    var cellMeditation = $(".table-cell__title_meditation").parent();
    var hoverCell = null;

    $('.table-cell').hover(function(){
    	if (this.querySelector(".table-cell__title_yoga")) {
			hoverCell = cellYoga;
			cellYoga.addClass("hoverCell");
		}
    	if (this.querySelector(".table-cell__title_run")) {
			hoverCell = cellRun;
			cellRun.addClass("hoverCell");
		}
    	if (this.querySelector(".table-cell__title_box")) {
			hoverCell = cellBox;
			cellBox.addClass("hoverCell");
		}
    	if (this.querySelector(".table-cell__title_meditation")) {
			hoverCell = cellMeditation;
			cellMeditation.addClass("hoverCell");
		}
    	if (this.querySelector(".table-cell__title_pilates")) {
			hoverCell = cellPilates;
			cellPilates.addClass("hoverCell");
		}
	}, function(){
		hoverCell.removeClass("hoverCell");
	});

	//map
	(function() {
		var coordinates = {lat: 47.212325, lng: 38.933663},
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 15,
				center: coordinates,
				scrollwheel: false,
       			disableDefaultUI: true,
			}),
			marker = new google.maps.Marker({
				position: uluru,
				map: map
			});
	})();
});
