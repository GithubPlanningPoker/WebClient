var startUpdate = function (func) {
  func();
  return setInterval(func, 500);
};

var stopUpdate = function (func) {
  clearInterval(func);
}

var descriptionUpdater = function () {
  $.ajax({
    type: "GET",
    url: ajaxUrl + "game/" + gameId + "/description",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {
      $("div#description div.description p").html( data.description == "" ? "[No description]" : data.description );
    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
    else
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + 'Shit went haywire!' + '</div>'));
  });
};

var voteUpdater = function () {
  $.ajax({
    type: "GET",
    url: ajaxUrl + "game/" + gameId + "/vote",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {
      $("div#votes").empty();
      $.each(data.votes, function (i, x) {
        var vote = $('<div class="vote"></div>');
        if (userName == x.name)
          vote.addClass("user");
        var card = $('<div class="poker-card"></div>');
        card.html(getCardHtml(x.vote));
        vote.html(card);
        vote.append($('<span class="username">' + x.name + '</span>'));
        $("div#votes").append(vote);
      });
    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
    else
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + 'Shit went haywire!' + '</div>'));
  });
};

var changeDescription = function (description) {
  var obj = {};
  obj.description = description;
  obj.userid = userId;

  $.ajax({
    type: "POST",
    url: ajaxUrl + "game/" + gameId + "/description/",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {
      var div = $("div#description div.description");
      div.find("div.btn-group").remove();
      div.find("textarea").remove();
      div.append($('<p class="form-control-static">' + description + '</p>'));

      descriptionInterval = startUpdate(descriptionUpdater);
    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
    else
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + 'Shit went haywire!' + '</div>'));
  });
}

var changeVote = function (vote) {
  var obj = {};
  obj.vote = vote;

  $.ajax({
    type: "POST",
    url: ajaxUrl + "game/" + gameId + "/vote/" + userId,
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {

    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
    else
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + 'Shit went haywire!' + '</div>'));
  });
}

var clearDescription = function () {
  $.ajax({
    type: "DELETE",
    url: ajaxUrl + "game/" + gameId + "/description",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {

    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
    else
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + 'Shit went haywire!' + '</div>'));
  });
}

var clearVotes = function () {
  var obj = {};
  obj.userid = userId;

  $.ajax({
    type: "DELETE",
    url: ajaxUrl + "game/" + gameId + "/vote",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {

    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
    else
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + 'Shit went haywire!' + '</div>'));
  });
}

var getCardHtml = function (vote) {
  switch (vote) {
    case null:
      return "-";
    case "half":
      return "&frac12;";
    case "inf":
      return "&infin;";
    case "break":
      return '<span class="glyphicon glyphicon-time"></span>';
    default:
      return vote;
  }
}