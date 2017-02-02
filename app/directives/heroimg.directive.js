directives.directive('heroImg', ['$window', function($window) {
  return {
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      //640px
      if($window.outerWidth < 640){
        element.css({'height': ($window.outerHeight - 135) });
      }

      //$window.resize(function resize(){
      angular.element($window).bind('resize', function(){
        if($window.outerWidth < 640){
          element.css({'height': ($window.outerHeight - 135) });
        }
        else {
          element.removeAttr("style");
          //element.style.height = null;
        }
      });

    }
  }
}]);
