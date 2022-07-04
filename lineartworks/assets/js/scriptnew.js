(function($){
  $(function() {
    $('.menu-icon').on('click', function() {
      $(this).closest('.menu').toggleClass('menu_state_open');
      $('.page-header').toggleClass('page-header_dark');
    });
  });
})(jQuery);


  $(window).scroll(function(){
    // 200px от верха
    if ($(window).scrollTop() > '0'){
      $('#headerscroll').addClass('page-header_darken');
    }
    // 200px от верха
    if ($(window).scrollTop() < '10'){
      $('#headerscroll').removeClass('page-header_darken');
    }
  });

//
//   var popupBackground = document.querySelector(".popupbg");
//
//   //Функция отображения PopUp
//   function PopUpShow(){
//       $("#popup1").fadeIn(800).show();
//       $("#popup").fadeIn(800).show();
//   }
//   //Функция скрытия PopUp
//   function PopUpHide(){
//       $("#popup1").hide();
//   }
//
//
// $(document).ready(function(){
//     //Скрыть PopUp при загрузке страницы
//     PopUpHide();
//
//     $(this).keydown(function(eventObject){
//         if (eventObject.which == 27)
//             $("#popup1").hide();
//     });
// });
//
//     popupBackground.addEventListener("click", function() {
//         $("#popup1").hide();
// });

$('.js-popup-link').magnificPopup({
    type: 'inline',

    fixedContentPos: true,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: false,
    showCloseBtn: false,
    preloader: false,
    focus: 'input[name*="name"]',
    modal: false,

    midClick: true,
    removalDelay: 400,
    mainClass: 'my-mfp-slide-bottom',

    callbacks: {
        open: function() {
            $("body").addClass("popup_open");
        },
        close: function() {
            $("body").removeClass("popup_open");
        }
    }
});


$('.popup__close').on('click', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});

		



