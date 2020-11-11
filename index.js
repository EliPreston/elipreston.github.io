$(document).ready(function () {
    // $(".fixed-action-btn").on("click", function () {
    //   window.scroll(0, 0);
    // });
    $(".sidenav").sidenav();
    $(".dropdown-trigger").dropdown();
    $(".materialboxed").materialbox();
    $(".parallax").parallax();
    $(".tabs").tabs();
    $(".datepicker").datepicker({
      disableWeekends: true
    });
    $(".tooltipped").tooltip();
    $(".scrollspy").scrollSpy();
    
  });



$(window).scroll(function() { // when the page is scrolled run this
  if($(this).scrollTop() != 0) { // if you're NOT at the top
      $('#top').fadeIn("slow"); // fade in
  } else { // else
      $('#top').fadeOut("slow"); // fade out
  }
});

$('#top').click(function() { // when the button is clicked
  $('body,html').animate({scrollTop:0},1000); // return to the top with a nice animation
});