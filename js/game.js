var startUpdate = function (func) {
  func();
  return setInterval(func, 500);
};

var stopUpdate = function (func) {
  clearInterval(func);
}

var titleUpdater = function () {
  $.ajax({
    type: "GET",
    url: ajaxUrl + "game/" + gameId + "/title",
    dataType: "json",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
    $("div#description div.title p").text(data.title === null || data.title == "" ? "[No title]" : data.title);
  })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });
};

var descriptionUpdater = function () {
  $.ajax({
    type: "GET",
    url: ajaxUrl + "game/" + gameId + "/description",
    dataType: "json",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
      $("div#description div.description p").text( data.description === null || data.description == "" ? "[No description]" : data.description );
    })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });
};

var voteUpdater = function () {
  $.ajax({
    type: "GET",
    url: ajaxUrl + "game/" + gameId + "/user",
    dataType: "json",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
    $("div#votes").empty();
    $.each(data.users, function (i, x) {
      var vote = $('<div class="vote"></div>');
      if (username == x.username)
        vote.addClass("user");
      var card = $('<div class="poker-card"></div>');
      card.html(getCardHtml(x.vote));
      vote.html(card);
      vote.append($('<span class="username">' + x.username + '</span>'));
      $("div#votes").append(vote);
    });
  })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });
};

var changeDescription = function (description) {
  var obj = {};
  obj.description = description;

  $.ajax({
    type: "PUT",
    url: ajaxUrl + "game/" + gameId + "/description",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
    var div = $("div#description div.description");
    div.find("div.btn-group").remove();
    div.find("textarea").remove();
    div.append($('<p class="form-control-static">' + description + '</p>'));

    descriptionInterval = startUpdate(descriptionUpdater);
  })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });
}

var changeTitle = function (title) {
  var obj = {};
  obj.title = title;

  $.ajax({
    type: "PUT",
    url: ajaxUrl + "game/" + gameId + "/title",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
    console.log("whaddap");
    var div = $("div#description div.title");
    div.find("div.btn-group").remove();
    div.find("input").remove();
    div.append($('<p class="form-control-static">' + title + '</p>'));

    titleInterval = startUpdate(titleUpdater);
  })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });
}

var changeVote = function (vote) {
  var obj = {};
  obj.vote = vote;
  obj.userId = userId;

  $.ajax({
    type: "PUT",
    url: ajaxUrl + "game/" + gameId + "/user/" + username,
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
    })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });
}

var clearDescription = function () {
  var obj = {};
  obj.title = "";
  obj.description = "";

  $.ajax({
    type: "PUT",
    url: ajaxUrl + "game/" + gameId + "/description",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
  })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });

  $.ajax({
    type: "PUT",
    url: ajaxUrl + "game/" + gameId + "/title",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
  })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
  });
}

var clearVotes = function () {
  var obj = {};
  obj.userId = userId;

  $.ajax({
    type: "PUT",
    url: ajaxUrl + "game/" + gameId + "/user",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
    })
  .fail(function (jqxhr, textStatus, errorThrown) {
    var message = "";
    if (jqxhr.responseJSON !== undefined)
      message = jqxhr.responseJSON.Message;
    else
      message = jqxhr.responseText;
    $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>'));
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