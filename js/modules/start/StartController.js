App.module("Start", function(Start, App, Backbone, Marionette, $, _) {
  Start.Controller = {
    preferences: null,

    show: function(){
      this.preferences = App.Shared.Models.Preferences.instance;
      App.container.show(new App.Start.Views.StartLayout({ model: this.preferences }));
    },

    newGame: function(username) {
    	console.log("Creating game with: " + username);
    },

    joinGame: function(gameId, username) {
    	console.log("Joining: " + gameId + " as: " + username);
      App.trigger("game:show", gameId);
    }
  };
});
