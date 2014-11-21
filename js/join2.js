var join2 = function () {
  var username = $("div#panel-join2 input.display-name").val();

  var obj = {};
  obj.username = username;

  $.ajax({
    type: "POST",
    url: ajaxUrl + "game/" + gameId + "/user",
    processData: false,
    data: JSON.stringify(obj),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false
  })
  .done(function (data, textStatus, jqxhr) {
    sessionStorage.gameId = gameId;
    sessionStorage.userId = data.userId;
    localStorage.username = username;
    window.location.reload();
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