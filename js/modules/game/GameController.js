App.module("Game", function(Game, App, Backbone, Marionette, $, _) {
  Game.Controller = {
    preferences: null,

    show: function(){
      this.preferences = App.Shared.Models.Preferences.instance;
      App.container.show(new App.Game.Views.GameLayout());
    }
  };
});
