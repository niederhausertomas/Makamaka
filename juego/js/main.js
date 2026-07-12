// $( window ).scroll(function() {
//      if($(window).scrollTop() > 200){
//        $('.logo').css({'height': '50'}); 
//      }else{
//          $('.logo').css({'height': '100'}); 
//      }
    
// });


$('.js-tilt').tilt({
	scale: 1.1,
	glare: true,
  maxGlare: 0.3,
  perspective: 500
});


// var $logo = $('#logo-scroll');
// $(document).scroll(function() {
//     $logo.css({display: $(this).scrollTop() > 100? "block":"none"});
// });