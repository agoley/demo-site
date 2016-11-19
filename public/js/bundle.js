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
		
		ctrl.ourCompanyMenu = {
			title: 'Our Company',
			backMenuTitle: 'Main', 
			sections: [
			{
				name:'Company History',
				state:'app'
			},
			{
				name:'Message from the President',
				state:'app.about.messageFromPresident'
			},
			{name:'Senior Managment Team',
				state:'app'},
			{name:'Carol Inman Glover – Dedication',
				state:'app'}]
		};
		
		ctrl.enterpriseNetCentricSolutionsMenu = {
			title: 'Enterprise Net-Centric Solutions',
			backMenuTitle: 'Our Solutions', 
			sections: [
				{
					name:'About Enterprise Net-Centric Solutions',
					state:'app.solutions.netCentricSolutions'
				},
				{name:'IT Service Management',
				state:'app'},
				{name:'Mobile Solutions',
				state:'app'},
				{name:'Application Development',
				state:'app'},
				{name:'Operations and Maintenance',
				state:'app'},
				{name:'IV&V',
				state:'app'},
				{name:'Service Desk',
				state:'app'},
				{name:'CSISR',
				state:'app'},
				{name:'Disabilty Accomodations',
				state:'app'},
				{name:'Systems Engineering',
				state:'app'},
				{name:'Healthcare IT',
				state:'app'},
				{name:'Datacenter Support',
				state:'app'}
			]
		};
		
		ctrl.contractVehiclesMenu = {
			title: 'Contract Vehicles',
			backMenuTitle: 'Main', 
			sections: [
				{
					name:'SeaPort-E',
					type: 'submenu',
					submenu: "seaPortEMenu"
				},
				{name:'Alliant Small Business Governmentwide Acquisition Contract (GWAC)',
				state:'app'},
				{name:'8(a) STARS II Governmentwide Acquisition Contract (GWAC)',
				state:'app'},
				{name:'DHS EAGLE II INDEFINITE-DELIVERY, INDEFINITE-QUANTITY (IDIQ) HSHQDC-13-D-E2064',
				state:'app'},
				{name:'Operations and Maintenance',
				state:'app'},
				{name:'GSA IT Schedule70 GS-35F-0704N',
				state:'app'},
				{name:'IRS TIPSS-4 SB Cyber and MBOSS',
				state:'app'},
				{name:'SPAWAR PILLARS (BFS, ICO, TCI)',
				state:'app'},
				{name:'NAVSEA Seaport-e Zone 1-7',
				state:'app'},
				{name:'FAA eFAST DTFAWA10A-00025',
				state:'app'},
				{name:'OPM IT Services BPA (OPM-32-12-A-0036)',
				state:'app'}
			]
		}
		
		ctrl.cyberSecurityIntelligenceServiceMenu = {
			title: 'Cyber Security and Intelligence Service',
			backMenuTitle: 'Our Solutions', 
			sections: [
				{name:'Compliance and C&A',
				state:'app'},
				{name:'COOP/Disaster Recovery',
				state:'app'},
				{name:'Identity Access Management',
				state:'app'},
				{name:'Information Assurance',
				state:'app'}
			]
		};
		
		ctrl.managementConsultingMenu = {
			title: 'Management Consulting',
			backMenuTitle: 'Our Solutions', 
			sections: [
				{name:'Acquisition Support',
				state:'app'},
				{name:'Business Process Reengineering',
				state:'app'},
				{name:'Change Management',
				state:'app'},
				{name:'IElectronic Records Management',
				state:'app'},
				{name:'Human Resources',
				state:'app'},
				{name:'Information Management',
				state:'app'},
				{name:"Program Management",
				state:'app'}
			]
		}
		
		ctrl.seaPortEMenu = {
			title: 'SeaPort-E',
			backMenuTitle: 'Contract Vehicles', 
			sections: [
				{name:'About SeaPort-E & DKW',
				state:'app'},
				{name:'Points Of Contact',
				state:'app'},
				{name:'Team Members',
				state:'app'},
				{name:'Task Orders',
				state:'app'},
				{name:'Bids & Awards',
				state:'app'},
				{name:'Active RFPs',
				state:'app'},
				{name:'Quality Assurance',
				state:'app'},
				{name:'Functional Areas',
				state:'app'}
			]
		}
		
		ctrl.ourSolutionsMenu = {
			title: 'Our Solutions',
			backMenuTitle: 'Main', 
			sections: [
				{
					name:'Enterprise Net-Centric Solutions',
					type: 'submenu',
					submenu: "enterpriseNetCentricSolutionsMenu"
				},
				{	
					name:'Cyber Security and Intelligence Service',
					type: 'submenu',
					submenu: 'cyberSecurityIntelligenceServiceMenu'
				},
				{
					name:'Management Consulting',
					type: 'submenu',
					submenu: 'managementConsultingMenu'
				},
			]
		};
		
		ctrl.newsMenu = {
			title: 'News',
			backMenuTitle: 'Main', 
			sections: [
				{name:'Recent Activity',
				state:'app'},
				{name:'Community',
				state:'app'},
				{name:'Awards',
				state:'app'}
			]
		};
		
		ctrl.careersMenu = {
			title: 'Careers',
			backMenuTitle: 'Main', 
			sections: [
				{name:'About DKW',
				state:'app'},
				{name:'Job Oppertunities',
				state:'app'}
			]
		};
		
		ctrl.contactMenu = {
			title: 'Contact',
			backMenuTitle: 'Main', 
			sections: [
				{name:'Contact Us',
				state:'app'},
				{name:'E-Verify',
				state:'app'}
			]
		};
		
		ctrl.mainMenu = {
			title: 'Main',
			sections: [
			{
				name: 'Home',
				state: 'app'
			},
			{
				name: 'Our Company',
				type: 'submenu',
				submenu: "ourCompanyMenu"
			},
			{
				name:'Our Solutions',
				type: 'submenu',
				submenu: "ourSolutionsMenu"
			},
			{name:'Qaulity Managment',
				state:'app'},
			{
				name:'Contract Vehicles',
				type: 'submenu',
				submenu: "contractVehiclesMenu"
			},
			{
				name:'News',
				type:'submenu',
				submenu: 'newsMenu'
			},
			{
				name:'Careers',
				type:'submenu',
				submenu: 'careersMenu'
			},
			{
				name:'Contact',
				type:'submenu',
				submenu: 'contactMenu'
			}]
		};
		
		ctrl.menu = ctrl.mainMenu;
		
		ctrl.onMenuBackClick = function () {
			switch (ctrl.menu.backMenuTitle) {
				case 'Our Solutions':
					ctrl.menu = ctrl.ourSolutionsMenu;
					break;
				case 'Contract Vehicles':
					ctrl.menu = ctrl.contractVehiclesMenu;
					break;
				default:
					ctrl.menu = ctrl.mainMenu;
					break;
			}
		}
		ctrl.onMenuItemClick = function (item) {
			if (item.type === 'submenu') {
				switch (item.submenu) {
					case 'ourCompanyMenu':
						ctrl.menu = ctrl.ourCompanyMenu;
						break;
					case 'ourSolutionsMenu':
						ctrl.menu = ctrl.ourSolutionsMenu;
						break;
					case 'enterpriseNetCentricSolutionsMenu':
						ctrl.menu = ctrl.enterpriseNetCentricSolutionsMenu;
						break;
					case 'cyberSecurityIntelligenceServiceMenu':
						ctrl.menu = ctrl.cyberSecurityIntelligenceServiceMenu;
						break;
					case 'managementConsultingMenu':
						ctrl.menu = ctrl.managementConsultingMenu;
						break;
					case 'contractVehiclesMenu':
						ctrl.menu = ctrl.contractVehiclesMenu;
						break;
					case 'seaPortEMenu':
						ctrl.menu = ctrl.seaPortEMenu;
						break;
					case 'newsMenu':
						ctrl.menu = ctrl.newsMenu;
						break;
					case 'careersMenu':
						ctrl.menu = ctrl.careersMenu;
						break;
					case 'contactMenu':
						ctrl.menu = ctrl.contactMenu;
						break;
					default:
						ctrl.menu = ctrl.mainMenu;
						break;
				}
			}
		}
		
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
        {"title":"Enterprise Net-Centric Solutions", "image":"images/teamwork.jpg", "content":"DKW designs, engineers, deploys, and maintains a full range of software, database, and web information systems through a structured, disciplined set of proven systems and application software engineering practices and life cycle maintenance techniques. These practices encompass the full life cycle development process from project analysis to project closeout for projects requiring the development or modification of systems and software. Our approach to defining the systems and software engineering practices is based on the Software Engineering Institute’s (SEI) Capability Maturity Model Integration (CMMI) Level 2 best practices, which have been assessed at Capability Maturity Model Integration (CMMI) Level 3."},
        {"title":"Cyber Security and Intelligence Service", "image":"images/cybersecurity.jpg", "content":"DKW’s Cyber Security Solutions are designed to assist national level organizations and cyber security operation centers (CSOCs) in detecting and thwarting cyber attacks. Our portfolio includes DKW’s Network Security Solutions and additional secure Services. DKW’s Network Security Solutions feature a rich product portfolio designed to help national organizations and CSOCs detect and thwart cyber attacks."},
        {"title":"Management Consulting", "image":"images/management.jpg", "content":"Your mission success is our priority. For more than a decade, our customers have relied on DKW’s professional and quick response capabilities. Whether analyzing and reengineering current business processes or assisting you in meeting ever-changing regulations and standards, DKW partners with you to ensure mission success."}
        ];

      ctrl.selectedSolution = ctrl.solutions[0];

      ctrl.image1 = "images/software1.jpg";
      ctrl.image2 = "images/businessMeeting.jpg";

      ctrl.keyClients = [
        {"title":"Defense Information Systems Agency","image":"images/keyClients/image001.jpg","url":"http://www.disa.mil/"},
        {"title":"Capability Maturity Model Integration","image":"images/keyClients/image01.jpg","url":""},
        {"title":"The U.S. Department of the Treasury","image":"images/keyClients/image003.png","url":"https://www.treasury.gov/Pages/default.aspx"},
        {"title":"The U.S. Department of Homeland Security","image":"images/keyClients/image005.jpg","url":"https://www.dhs.gov/"},
        {"title":"","image":"images/keyClients/image007.jpg","url":""},
        {"title":"","image":"images/keyClients/image009.jpg","url":""},
        {"title":"","image":"images/keyClients/image011.jpg","url":""},
        {"title":"","image":"images/keyClients/image013.jpg","url":""},
        {"title":"","image":"images/keyClients/image015.jpg","url":""},
        {"title":"","image":"images/keyClients/image019.jpg","url":""},
        {"title":"","image":"images/keyClients/image021.jpg","url":""},
        {"title":"","image":"images/keyClients/image023.jpg","url":""},
        {"title":"","image":"images/keyClients/image025.jpg","url":""},
        {"title":"","image":"images/keyClients/image027.jpg","url":""},
        {"title":"","image":"images/keyClients/image031.jpg","url":""},
        {"title":"","image":"images/keyClients/image033.jpg","url":""}
      ];
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

directives.directive('randomMotion', ['$timeout', '$window', function($timeout, $window) {
  return {
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      //console.log("Start Motion");
      // Randomly Set Postion & Velocity
      var maxVelocity = 50;
      var parentContainer = element[0].offsetParent;

      var maxX = parentContainer.clientWidth - 100;
      var maxY = parentContainer.clientHeight - 75;

      //var posX = Math.min(0, Math.max(20, (Math.random() * 0)));
      //var posY = Math.min(0, Math.max(20, (Math.random() * 10)));

      var posX = ((Math.random() * maxX) + 1);
      var posY = ((Math.random() * maxY) + 1);

      var velX = (Math.random() * maxVelocity);
      var velY = (Math.random() * maxVelocity);
      var timestamp = null;

      if($window.outerWidth > 640){
        // Move Object
        (function tick() {
          var now = new Date().getTime();
          var borderX = element[0].clientWidth + 5;
          var borderY = element[0].clientHeight + 5;

          maxX = parentContainer.clientWidth - borderX;
          maxY = parentContainer.clientHeight - borderY;

          var elapsed = (timestamp || now) - now;
          timestamp = now;
          posX += elapsed * velX / 1000;
          posY += elapsed * velY / 1000;

          if (posX > maxX) {
              posX = 2 * maxX - posX;
              velX *= -1;
          }
          if (posX < 1) {
              posX = 10;
              velX *= -1;
          }
          if (posY > maxY) {
              posY = 2 * maxY - posY;
              velY *= -1;
          }
          if (posY < 1) {
              posY = 10;
              velY *= -1;
          }
          // Set Position to $element top and left
          element.css({ "top": posY, "left": posX });          
          // Loop to Move object
          $timeout(tick, 30);
        })();
      }
    }
  }
}]);
