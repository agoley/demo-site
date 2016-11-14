'use strict';

var routes = angular.module('routes', ['ui.router']);
var directives = angular.module('directives', []);
var components = angular.module('components', []);

var dkwSite = angular.module('DKWSite',
									  ['ngMaterial',
										'ngAnimate',
										'ui.router',
										'directives',
										'components',
										'routes']);

dkwSite.config(function ($mdThemingProvider) {
	
	// working pallete for dkw
   $mdThemingProvider.definePalette('dkwPallete', {
    '50': '113d71', // color from existing site
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': 'f44336',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    

    'contrastDarkColors': ['50', '100', 
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    
  });
	
  $mdThemingProvider
    .theme('default')
    .primaryPalette('dkwPallete', {
      'default': '50',
    })
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('blue-grey');
});
dkwSite.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state('app', {
        url: "/",
        views: {
          'content':{
            //templateUrl: 'views/pageTemplates/home.html'
            component: 'home'
          }
        }
      })
      .state('app.about', {
        abstract: true,
        url: "about",
        views: {}
      })
      .state('app.about.messageFromPresident', {
        url: "/message-from-the-president",
        views: {
          'content@': {
            //templateUrl: 'views/pageTemplates/solutions/net-centric-solutions.html'
            component: 'messageFromPresident'
          }
        }
      })
      .state('app.solutions', {
        abstract: true,
        url: "solutions",
        views: {}
      })
      .state('app.solutions.netCentricSolutions', {
        url: "/net-centric-solutions",
        views: {
          'content@': {
            //templateUrl: 'views/pageTemplates/solutions/net-centric-solutions.html'
            component: 'netCentricSolutions'
          }
        }
      });

      $urlRouterProvider.otherwise('/');
      //$locationProvider.html5Mode(true);
    }]);

// root component: all other components will be under this component
// objects: view - this will store the state and other high level objects
components.component('all', {
   bindings: {},
	controller: function () {
      var ctrl = this;
		ctrl.view = {};
   },
   templateUrl: 'views/all.html'
});

// footer component for DKWSite
components.component('dkwFooter', {
   bindings: {},
	controller: function () {
      var ctrl = this;
   },
   templateUrl: 'views/dkw_footer.html'
});

// header component for DKWSite
components.component('dkwHeader', {
   bindings: {},
	controller: function () {
      var ctrl = this;
		
		// set header logo to mobile
		var configHeaderForMobile = function () {
			document.getElementById("header-logo")
				.src="images/dkw-logo-mobile.png";
		}
		
		// set header logo to desktop
		var configHeaderForDesktop = function () {
			document.getElementById("header-logo")
				.src="images/dkw-logo.png";
		}
		
		// logic to configure the header for mobile oe desktop
		var configHeader = function () {
			if (window.innerWidth < 715) {
				configHeaderForMobile();
			} else {
				configHeaderForDesktop();
			}
		}
		
		configHeader();
		
		window.onresize = function(){
    		configHeader();
		};
		
   },
   templateUrl: 'views/dkw_header.html'
});

// footer component for DKWSite
components.component('home', {
   bindings: {},
	controller: function () {
      var ctrl = this;
   },
   templateUrl: 'views/pageTemplates/home.html'
});

// footer component for DKWSite
components.component('netCentricSolutions', {
   bindings: {},
	controller: function () {
      var ctrl = this;
   },
   templateUrl: 'views/pageTemplates/solutions/net-centric-solutions.html'
});

// footer component for DKWSite
components.component('messageFromPresident', {
   bindings: {},
	controller: function () {
      var ctrl = this;
   },
   templateUrl: 'views/pageTemplates/about/message-from-the-president.html'
});

(function(){
   "use strict";

    angular.module('directives').directive('randomMotion', ['$timeout', function($timeout) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {
          //console.log("Start Motion");
          // Randomly Set Postion & Velocity
          var maxVelocity = 100;
          var posX = Math.min(0, Math.max(20, (Math.random() * 0)));
          var posY = Math.min(0, Math.max(20, (Math.random() * 10)));
          var velX = (Math.random() * maxVelocity);
          var velY = (Math.random() * maxVelocity);
          var timestamp = null;

          var parentContainer = element[0].offsetParent;

          // Move Object
          (function tick() {
            var now = new Date().getTime();
            var borderX = parentContainer.clientWidth *.20;
            var borderY = parentContainer.clientHeight *.20;

            var maxX = parentContainer.clientWidth - borderX;
            var maxY = parentContainer.clientHeight - borderY;

            var elapsed = (timestamp || now) - now;
            timestamp = now;
            posX += elapsed * velX / 1000;
            posY += elapsed * velY / 1000;

            if (posX > maxX) {
                posX = 2 * maxX - posX;
                velX *= -1;
            }
            if (posX < 10) {
                posX = 10;
                velX *= -1;
            }
            if (posY > maxY) {
                posY = 2 * maxY - posY;
                velY *= -1;
            }
            if (posY < 10) {
                posY = 10;
                velY *= -1;
            }
            element.css({ "top": posY, "left": posX });
            // Set Position to $element top and left
            // Loop to Move object
            $timeout(tick, 30);
          })();
        }
      }
    }]);

})();
