App.module("Start", function(Start, App, Backbone, Marionette, $, _){
  Start.Controller = {
    show: function(){
      App.container.show(new App.Start.Views.StartLayout());
    },

    newGame: function(username) {
    	console.log("Creating game with: " + username);
    },

    joinGame: function(gameId, username) {
    	console.log("Joining: " + gameId + " as: " + username);
    }
  };
});
