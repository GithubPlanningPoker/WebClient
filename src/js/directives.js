(function() {
  angular.module('ghpp')

    .directive('ngEnter', function () {
      return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngEnter);
              });

              event.preventDefault();
          }
        });
      };
    })

    .directive('ngEscape', function () {
      return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          if(event.which === 27) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngEscape);
              });

              event.preventDefault();
          }
        });
      };
    })

    .directive('showFocus', ['$timeout', function($timeout) {
      return function(scope, element, attrs) {
        scope.$watch(attrs.showFocus, 
          function (newValue) { 
            $timeout(function() {
                if (newValue)
                  element[0].focus();
            });
          }, true);
      };    
    }])

    .directive('enterSubmit', function () {
      return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
         
          elem.bind('keydown', function(event) {
            var code = event.keyCode || event.which;
                    
            if (code === 13) {
              if (!event.shiftKey) {
                event.preventDefault();
                scope.$apply(attrs.enterSubmit);
              }
            }
          });
        }
      };
    });
    
})();