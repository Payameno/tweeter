/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escapeTo = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function () {
  $("#tweet-post").submit(function (event) {
    event.preventDefault();
    let tweetData = $("#tweet-text").serialize();
    const textInput = tweetData.slice(5);
    if (!textInput) {
      $("form p").slideDown("slow", function() {
      $("form p").html("No messages found to post!");
      })
    } else if (textInput.length > 140) {
      $("form p").slideDown("slow", function() {
      $("form p").html("Tweets cannot be more than 140 characters!");
      })
    } else {
    $.post( "/tweets", tweetData, () => {
      $("#tweet-text").val("");
      $("form p").hide();
      loadTweets();
      })
    }
    });

  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    })
  }

  const renderTweets = function(tweets) {
    let tweetElement;
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend(tweetElement);
    }
  };

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
    <header class="tweetHeader">
      <div class="tweetUser">
        <img src="${tweet.user.avatars}" alt="Profile Picture">
        <p>${tweet.user.name}</p>
      </div>
      <p class="tweetHandle">${tweet.user.handle}</p>
    </header>
    <div class="tweetMessage"><h1>${escapeTo(tweet.content.text)}</h1></div>
    <footer class="tweetFooter">
      <p class="date">${timeago.format(tweet.created_at)}</p>
      <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
     </article>`;
    return $tweet;
  }
  $("form p").hide();
  loadTweets();
});
