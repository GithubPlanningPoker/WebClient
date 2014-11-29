App.module("Start", function(Start, App, Backbone, Marionette, $, _) {
  Start.Controller = Backbone.Marionette.Controller.extend ({
    preferences: null,
    session: null,

    initialize: function(){
      this.preferences = App.Shared.Models.Preferences.instance;
      this.session = App.Shared.Models.Session.instance;
    },

    showStart: function(){
      App.container.show(new App.Start.Views.StartLayout({ model: this.preferences }));
    },

    newGame: function(username) {
      var self = this;
      var host = self.preferences.get("host");
      var obj = {
        username: username
      };

      $.ajax({
        method: "POST",
        url: host + "/game",
        processData: false,
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json",
        cache: false,
        timeout: 2000
      })
      .success(function(data, textStatus, jqXHR) {
        var gameId = data.gameId;
        var userId = data.userId;

        self.session.set("gameId", gameId);
        self.session.set("userId", userId);
        self.session.save();
        App.trigger("game:show", gameId);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        if (textStatus === "timeout")
          App.alert.show(new App.Shared.Views.Alert({ message: "Timed out trying to reach: " + host, alertClass: "alert-danger"}));
      });
    },

    joinGame: function(gameId, username) {
      App.trigger("game:show", gameId);
    }
  });
});
