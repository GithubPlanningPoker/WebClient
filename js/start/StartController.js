App.module("Start", function(Start, App, Backbone, Marionette, $, _){
  Start.Controller = {
    show: function(){
      App.container.show(new App.Start.Views.StartLayout());
    }
  };
});
