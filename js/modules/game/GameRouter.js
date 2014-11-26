App.module("Game", function(Game, App, Backbone, Marionette, $, _) {

  Game.Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "game/:gameId": "showGame"
    }
  });

  var API = {
    showGame: function(gameId) {
      App.Game.Controller.show();
    }
  }

  App.on("game:show", function(gameId) {
    Backbone.history.navigate("game/" + gameId, {trigger: true});
  });

  App.addInitializer(function() {
    new Game.Router({
      controller: API
    })
  });
});