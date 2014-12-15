App.module("Game", function(Game, App, Backbone, Marionette, $, _) {

  Game.Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "game/:gameId": "showGame"
    }
  });

  App.on("game:show", function(gameId) {
    App.trigger("alert:dismiss");
    Backbone.history.navigate("game/" + gameId, {trigger: true});
  });

  App.addInitializer(function() {
    new Game.Router({
      controller: new Game.Controller()
    })
  });
});