var create = function () {
  var userName = $("div#panel-create input.display-name").val();

  var obj = {};
  obj.name = userName;

  $.ajax({
    type: "POST",
    url: ajaxUrl + "game",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {
      $.cookie("gameid", data.gameid);
      $.cookie("userid", data.userid);
      $.cookie("username", userName);
      window.location.href = "?gameid=" + data.gameid;
    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
  });
};

var join = function () {
  var gameId = $("div#panel-join input.game-id").val();
  var userName = $("div#panel-join input.display-name").val();

  var obj = {};
  obj.name = userName;

  $.ajax({
    type: "POST",
    url: ajaxUrl + "game/" + gameId + "/user",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false
  })
  .done(function (data) {
    if (data.success) {
      $.cookie("gameid", gameId);
      $.cookie("userid", data.userid);
      $.cookie("username", userName);
      window.location.href = "?gameid=" + gameId;
    }
    else if (!data.success)
      $("div#message").html($('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + data.message + '</div>'));
  });
};