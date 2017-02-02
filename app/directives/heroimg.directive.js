directives.directive('heroImg', ['$window', function($window) {
  return {
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      //640px
      if($window.outerWidth < 640){
        element.css({'height': ($window.outerHeight - 135) });
      }      
    }
  }
}]);
