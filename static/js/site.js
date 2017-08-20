$(
  function(){
    $("table").addClass("table table-condensed table-bordered table-striped");
  }
);
  $('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});
