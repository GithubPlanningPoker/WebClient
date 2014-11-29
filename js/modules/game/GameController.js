App.module("Game", function(Game, App, Backbone, Marionette, $, _) {
  Game.Controller = Backbone.Marionette.Controller.extend({
    preferences: null,

    initialize: function() {
      this.preferences = App.Shared.Models.Preferences.instance;
    },

    showGame: function() {
    	var layout = new App.Game.Views.GameLayout();
      App.container.show(layout);
    }
  });
});
