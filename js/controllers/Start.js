App.module("Controller", function(Controller, App, Backbone, Marionette, $, _){
  Controller.Start = {
    show: function(){
      App.container.show(new App.StartLayout());
    }
  };
});
