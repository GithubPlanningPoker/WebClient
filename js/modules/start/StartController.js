App.module("Start", function(Start, App, Backbone, Marionette, $, _) {
  Start.Controller = {
    preferences: null,

    show: function(){
      this.preferences = App.Shared.Models.Preferences.instance;
      App.container.show(new App.Start.Views.StartLayout({ model: this.preferences }));
    },

    newGame: function(username) {
      
    },

    joinGame: function(gameId, username) {
      App.trigger("game:show", gameId);
    }
  };
});
