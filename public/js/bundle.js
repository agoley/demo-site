'use strict';

var routes = angular.module('routes', ['ui.router']);
var directives = angular.module('directives', []);
var components = angular.module('components', ['ui.bootstrap', 'ngAnimate']);

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
	controller: function ($timeout, $mdSidenav, $log) {
      var ctrl = this;
		ctrl.isSearching = false;
		ctrl.menu;
		var mainMenu = [
			{name:'Our Company'},
			{name:'Our Solutions'},
			{name:'Qaulity Managment'},
			{name:'Contract Vehicles'},
			{name:'News'},
			{name:'Careers'},
			{name:'Contact'}
		];
		ctrl.menu = mainMenu;
		
    	ctrl.toggleRight = buildToggler('right');
    	ctrl.isOpenRight = function(){
      	return $mdSidenav('right').isOpen();
    	};
		
		/**
     	* Supplies a function that will continue to operate until the
     	* time is up.
     	*/
    	function debounce(func, wait, context) {
      	var timer;

      	return function debounced() {
        		var context = this,
            args = Array.prototype.slice.call(arguments);
        		$timeout.cancel(timer);
        		timer = $timeout(function() {
          		timer = undefined;
          		func.apply(context, args);
        		}, wait || 10);
      	};
    	}

    	/**
     	* Build handler to open/close a SideNav; when animation finishes
     	* report completion in console
     	*/
    	function buildDelayedToggler(navID) {
      	return debounce(function() {
        	// Component lookup should always be available 
			// since we are not using `ng-if`
        	$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
          	});
      	}, 200);
    	}

    	function buildToggler(navID) {
      	return function() {
        	// Component lookup should always be available 
			// since we are not using `ng-if`
        	$mdSidenav(navID)
				.toggle()
				.then(function () {
            	$log.debug("toggle " + navID + " is done");
          	});
      	}
		}
		
		ctrl.close = function () {
      	// Component lookup should always be 
			// available since we are not using `ng-if`
      	$mdSidenav('right').close()
				.then(function () {
					$log.debug("close RIGHT is done");
        	});
    	};
		
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
		
		ctrl.toggleIsSearching = function () {
			$("#searchInput").slideToggle( "slow");
		}
		
   },
   templateUrl: 'views/dkw_header.html'
});

// footer component for DKWSite
components.component('home', {
   bindings: {},
	controller: function () {
      var ctrl = this;
      // variables
      ctrl.myInterval = 7000;
      ctrl.active = 0;

      ctrl.slides = [
        {"id":0,"image":"images/carousel/washington-dc7.jpg", "title":"Industry, Innovation, Influence", "text":""},
        {"id":1,"image":"images/carousel/washington-dc2.jpg", "title":"Over a Decade of Experience", "text":"Focusing on enterprise solutions and services for more than 70 Federal Government customers"},
        {"id":2,"image":"images/carousel/washington-dc1.jpg", "title":"The DKW Commitment", "text":"Our Center of Excellence (COEs) ensure that our customers receive the superior knowledge and expertise needed to rapidly launch applications without sacrificing quality"},
        {"id":3,"image":"images/carousel/washington-dc3.jpg", "title":"Our Distinction", "text":"What distinguishes DKW is the call to public service that our people bring to the job, We are motivated to perform at a high level"}];

      ctrl.solutions = [
        {"title":"Enterprise Net-Centric Solutions", "image":"images/networks2.jpg", "content":"DKW designs, engineers, deploys, and maintains a full range of software, database, and web information systems through a structured, disciplined set of proven systems and application software engineering practices and life cycle maintenance techniques. These practices encompass the full life cycle development process from project analysis to project closeout for projects requiring the development or modification of systems and software. Our approach to defining the systems and software engineering practices is based on the Software Engineering Institute’s (SEI) Capability Maturity Model Integration (CMMI) Level 2 best practices, which have been assessed at Capability Maturity Model Integration (CMMI) Level 3."},
        {"title":"Cyber Security and Intelligence Service", "image":"images/cybersecurity.jpg", "content":"DKW’s Cyber Security Solutions are designed to assist national level organizations and cyber security operation centers (CSOCs) in detecting and thwarting cyber attacks. Our portfolio includes DKW’s Network Security Solutions and additional secure Services. DKW’s Network Security Solutions feature a rich product portfolio designed to help national organizations and CSOCs detect and thwart cyber attacks."},
        {"title":"Management Consulting", "image":"images/management2.jpg", "content":"Your mission success is our priority. For more than a decade, our customers have relied on DKW’s professional and quick response capabilities. Whether analyzing and reengineering current business processes or assisting you in meeting ever-changing regulations and standards, DKW partners with you to ensure mission success."}
        ];

      ctrl.selectedSolution = ctrl.solutions[0];

      // functions
      /*Solutions*/
      ctrl.isSelected = function(item){
        return (ctrl.selectedSolution == item);
      }
      ctrl.changeSelected = function(item){
        ctrl.selectedSolution = item;
      }

      /*Carousel*/
      ctrl.toggleInterval = function() {
        ctrl.myInterval = (ctrl.myInterval > 0 ? 0 : 5000);
      }
      ctrl.isInMotion = function() {
        return (ctrl.myInterval > 0);
      };
   },
   templateUrl: 'views/pageTemplates/home/home.html'
});

/*ADD to app/assets/libs/angular-bootstrap/ui-bootstrap-tpls.js line 506*/
/*
$scope.isInMotion = function() {
  return ($scope.interval > 0);
};
$scope.toggleInterval = function() {
  $scope.interval = ($scope.interval > 0 ? 0 : 7000);
  if($scope.interval > 0) { $scope.next(); }
};
*/

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

directives.directive('backImg', ['$window', function($window) {
  return {
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      var url = attrs.backImg;
      element.css({'background-image': 'url(' + url +')'});
    }
  }
}]);

directives.directive('randomMotion', ['$timeout', function($timeout) {
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
