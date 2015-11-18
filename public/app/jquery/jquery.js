$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  $('#scrollHide').css(
    {'opacity': ((1000 - (scroll * 2)) / 1000)}
  );
});
