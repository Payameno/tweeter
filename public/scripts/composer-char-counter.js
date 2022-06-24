$(document).ready(function() {
  const counter = $(".counter");
  $("#tweet-text").on('keyup', function() {
    let tweetLength = $("#tweet-text").val().length;
    let difference = 140 - tweetLength;
    counter.html(difference);

    if (difference < 20) {
      counter.css("color", "#FF0000")
    } else {
      counter.css("color", "#545149")
    }
  })
});