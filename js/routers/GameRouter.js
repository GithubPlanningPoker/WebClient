App.module("Game", function(Game, App, Backbone, Marionette, $, _){

  Game.Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "game/:gameId": "showGame"
    }
  });

  var API = {
    showGame: function(gameId) {
      App.container.show(new App.GameLayout());
    }
  }

  App.on("game:show", function(gameId) {
    API.showGame(gameId);
  });

  App.addInitializer(function() {
    new Game.Router({
      controller: API
    })
  });
});