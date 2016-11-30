'use strict';

var routes = angular.module('routes', ['ui.router']);
var directives = angular.module('directives', []);
var components = angular.module('components', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);

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
        url: "/net-centric-solutions/:Id",
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
		ctrl.view.isMobile = false;
		ctrl.view.isSsearching = false;
		
		// set mobile to true
		var configForMobile = function () {
			ctrl.view.isMobile = true;
		}
		
		// set mobile to false
		var configForDesktop = function () {
			ctrl.view.isMobile = false;
		}
		
		// logic to configure the site for mobile oe desktop
		var configView = function () {
			if (window.innerWidth < 715) {
				configForMobile();
			} else {
				configForDesktop();
			}
		}
		
		configView();
		
		window.onresize = function(){
    		setTimeout(function(){
				configView(); 
			}, 500);
		};
   },
   templateUrl: 'views/all.html'
});

// footer component for DKWSite
components.component('dkwFooter', {
   bindings: {},
	require: {
      parent: '^all'
    },
	controller: function () {
      var ctrl = this;
   },
   templateUrl: 'views/dkw_footer.html'
});



// header component for DKWSite
components.component('dkwHeader', {
   bindings: {},
	require: {
      parent: '^all'
    },
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
			{
				name:'Senior Managment Team',
				state:'app'
			},
			{
				name:'Carol Inman Glover – Dedication',
				state:'app'
			}]
		};

		ctrl.enterpriseNetCentricSolutionsMenu = {
			title: 'Enterprise Net-Centric Solutions',
			backMenuTitle: 'Our Solutions',
			sections: [
				{
					name:'About Enterprise Net-Centric Solutions',
					state:'app.solutions.netCentricSolutions({Id:""})'
				},
				{
					name:'IT Service Management',
					state:'app.solutions.netCentricSolutions({Id: "it-service-management" })'
				},
				{
					name:'Mobile Solutions',
					state:'app.solutions.netCentricSolutions({Id: "mobile-solutions" })'
				},
				{
					name:'Application Development',
					state:'app.solutions.netCentricSolutions({Id: "application-development" })'
				},
				{
					name:'Operations and Maintenance',
					state:'app.solutions.netCentricSolutions({Id: "operations-and-maintenance" })'
				},
				{
					name:'IV&V',
					state:'app.solutions.netCentricSolutions({Id: "iv&v" })'
				},
				{
					name:'Service Desk',
					state:'app.solutions.netCentricSolutions({Id: "service-desk" })'
				},
				{
					name:'C5ISR',
					state:'app.solutions.netCentricSolutions({Id: "c5isr" })'
				},
				{
					name:'Disabilty Accommodations',
					state:'app.solutions.netCentricSolutions({Id: "disability-accommodations" })'
				},
				{
					name:'Systems Engineering',
					state:'app.solutions.netCentricSolutions({Id: "systems-engineering" })'
				},
				{
					name:'Healthcare IT',
					state:'app.solutions.netCentricSolutions({Id: "healthcare-it" })'
				},
				{
					name:'Datacenter Support',
					state:'app.solutions.netCentricSolutions({Id: "datacenter-support" })'
				}
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
				{
					name:'Alliant Small Business Governmentwide Acquisition Contract (GWAC)',
					state:'app'
				},
				{
					name:'8(a) STARS II Governmentwide Acquisition Contract (GWAC)',
					state:'app'
				},
				{
					name:'DHS EAGLE II INDEFINITE-DELIVERY, INDEFINITE-QUANTITY (IDIQ) HSHQDC-13-D-E2064',
					state:'app'
				},
				{
					name:'Operations and Maintenance',
					state:'app'}
				,
				{
					name:'GSA IT Schedule70 GS-35F-0704N',
					state:'app'
				},
				{
					name:'IRS TIPSS-4 SB Cyber and MBOSS',
					state:'app'
				},
				{
					name:'SPAWAR PILLARS (BFS, ICO, TCI)',
					state:'app'
				},
				{
					name:'NAVSEA Seaport-e Zone 1-7',
					state:'app'
				},
				{
					name:'FAA eFAST DTFAWA10A-00025',
					state:'app'
				},
				{
					name:'OPM IT Services BPA (OPM-32-12-A-0036)',
					state:'app'
				}
			]
		}

		ctrl.cyberSecurityIntelligenceServiceMenu = {
			title: 'Cyber Security and Intelligence Service',
			backMenuTitle: 'Our Solutions',
			sections: [
				{
					name:'Compliance and C&A',
					state:'app'
				},
				{
					name:'COOP/Disaster Recovery',
					state:'app'
				},
				{
					name:'Identity Access Management',
					state:'app'
				},
				{
					name:'Information Assurance',
					state:'app'
				}
			]
		};

		ctrl.managementConsultingMenu = {
			title: 'Management Consulting',
			backMenuTitle: 'Our Solutions',
			sections: [
				{
					name:'Acquisition Support',
					state:'app'
				},
				{
					name:'Business Process Reengineering',
					state:'app'
				},
				{
					name:'Change Management',
					state:'app'
				},
				{
					name:'IElectronic Records Management',
					state:'app'
				},
				{
					name:'Human Resources',
					state:'app'
				},
				{
					name:'Information Management',
					state:'app'
				},
				{
					name:"Program Management",
					state:'app'
				}
			]
		}

		ctrl.seaPortEMenu = {
			title: 'SeaPort-E',
			backMenuTitle: 'Contract Vehicles',
			sections: [
				{
					name:'About SeaPort-E & DKW',
					state:'app'
				},
				{
					name:'Points Of Contact',
					state:'app'
				},
				{
					name:'Team Members',
					state:'app'
				},
				{
					name:'Task Orders',
					state:'app'
				},
				{
					name:'Bids & Awards',
					state:'app'
				},
				{
					name:'Active RFPs',
					state:'app'
				},
				{
					name:'Quality Assurance',
					state:'app'
				},
				{
					name:'Functional Areas',
					state:'app'
				}
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
					//$log.debug("toggle " + navID + " is done");
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
            	//$log.debug("toggle " + navID + " is done");
          	});
      	}
		}

		ctrl.close = function () {
      	// Component lookup should always be
			// available since we are not using `ng-if`
      	$mdSidenav('right').close()
				.then(function () {
					//$log.debug("close RIGHT is done");
        	});
    	};

		ctrl.toggleIsSearching = function () {
			$("#searchInput").slideToggle( "fast");
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
        {"title":"Enterprise Net-Centric Solutions", "state":'app.solutions.netCentricSolutions({Id:""})',"image":"images/teamwork.jpg", "content":"DKW designs, engineers, deploys, and maintains a full range of software, database, and web information systems through a structured, disciplined set of proven systems and application software engineering practices and life cycle maintenance techniques. These practices encompass the full life cycle development process from project analysis to project closeout for projects requiring the development or modification of systems and software. Our approach to defining the systems and software engineering practices is based on the Software Engineering Institute’s (SEI) Capability Maturity Model Integration (CMMI) Level 2 best practices, which have been assessed at Capability Maturity Model Integration (CMMI) Level 3."},
        {"title":"Cyber Security and Intelligence Service", "state":'',"image":"images/cybersecurity.jpg", "content":"DKW’s Cyber Security Solutions are designed to assist national level organizations and cyber security operation centers (CSOCs) in detecting and thwarting cyber attacks. Our portfolio includes DKW’s Network Security Solutions and additional secure Services. DKW’s Network Security Solutions feature a rich product portfolio designed to help national organizations and CSOCs detect and thwart cyber attacks."},
        {"title":"Management Consulting", "state":'',"image":"images/management.jpg", "content":"Your mission success is our priority. For more than a decade, our customers have relied on DKW’s professional and quick response capabilities. Whether analyzing and reengineering current business processes or assisting you in meeting ever-changing regulations and standards, DKW partners with you to ensure mission success."}
        ];

      ctrl.selectedSolution = ctrl.solutions[0];

      ctrl.image1 = "images/software1.jpg";
      ctrl.image2 = "images/businessMeeting.jpg";


      ctrl.keyClients = [
        {"id":0, "title":"Defense Information Systems Agency","image":"images/keyClients/image001.jpg","url":"http://www.disa.mil/"},
        {"id":1, "title":"Capability Maturity Model Integration","image":"images/keyClients/image01.jpg","url":""},
        {"id":2, "title":"The U.S. Department of the Treasury","image":"images/keyClients/image003.png","url":"https://www.treasury.gov/Pages/default.aspx"},
        {"id":3, "title":"The U.S. Department of Homeland Security","image":"images/keyClients/image005.jpg","url":"https://www.dhs.gov/"},
        {"id":4, "title":"","image":"images/keyClients/image007.jpg","url":""},
        {"id":5, "title":"","image":"images/keyClients/image009.jpg","url":""},
        {"id":6, "title":"","image":"images/keyClients/image011.jpg","url":""},
        {"id":7, "title":"","image":"images/keyClients/image013.jpg","url":""},
        {"id":8, "title":"","image":"images/keyClients/image015.jpg","url":""},
        {"id":9, "title":"","image":"images/keyClients/image019.jpg","url":""},
        {"id":10, "title":"","image":"images/keyClients/image021.jpg","url":""},
        {"id":11, "title":"","image":"images/keyClients/image023.jpg","url":""},
        {"id":12, "title":"","image":"images/keyClients/image025.jpg","url":""},
        {"id":13, "title":"","image":"images/keyClients/image027.jpg","url":""},
        {"id":14, "title":"","image":"images/keyClients/image031.jpg","url":""},
        {"id":15, "title":"","image":"images/keyClients/image033.jpg","url":""}
      ];


		ctrl.news = {};
		ctrl.minStory = true;
		ctrl.news.interiorTextSmall = "The U.S. Department of Interior, Office of Natural Resources Revenue (ONRR) recently selected DKW Communications, Inc. to support its IT operations at its Denver Federal Center in Lakewood, Colorado. ONRR is responsible for the management of revenues associated with Federal offshore and Federal and American Indian onshore mineral leases, as well as revenues received as...";
		ctrl.news.interiorTextAll = "The U.S. Department of Interior, Office of Natural Resources Revenue (ONRR) recently selected DKW Communications, Inc. to support its IT operations at its Denver Federal Center in Lakewood, Colorado. ONRR is responsible for the management of revenues associated with Federal offshore and Federal and American Indian onshore mineral leases, as well as revenues received as a result of offshore renewable energy efforts. ONRR also ensures that the nation’s Federal and American Indian natural resources revenues are accurately reported and paid in compliance with laws, regulations, and lease terms. DKW will provide applications development and Documentum support, IT helpdesk support, and database administration.";

		ctrl.news.interiorText = ctrl.news.interiorTextSmall;

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

		ctrl.moreNews= function() {
			ctrl.news.interiorText = ctrl.news.interiorTextAll;
			ctrl.minStory = false;
		}

		ctrl.lessNews= function() {
			ctrl.news.interiorText = ctrl.news.interiorTextSmall;
			ctrl.minStory = true;
		}
    /* Key Clients*/
    ctrl.clientCtrl = function(direction) {
      if(direction == "left"){
        // Move Left to Right
        $('.client-container').animate({ scrollLeft: "-=200px"}, "slow");
      }
      else if(direction == "right"){
        // Move Right to Left
        $('.client-container').animate({ scrollLeft: "+=200px"}, "slow");
      }
    }
    ctrl.checkCtrlActive = function(direction){
      if(direction == "left"){
        return ($('.client-container')[0].scrollLeft == 0);
      }
      else if(direction == "right"){
        return (($('.client-container')[0].scrollLeft * 2) > $('.client-container')[0].scrollWidth);
      }
    }
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
	controller: function ($stateParams, $sce, $location, $anchorScroll) {
      var ctrl = this;
      ctrl.pageInfo = {
        "sectionTitle":"Enterprise Net-Centric Solutions",
        "image":"images/teamwork.jpg",
        "state":'app.solutions.netCentricSolutions({Id:""})',
        "content":[
          {"type":"text", "content":"DKW designs, engineers, deploys, and maintains a full range of software, database, and web information systems through a structured, disciplined set of proven systems and application software engineering practices and life cycle maintenance techniques. These practices encompass the full life cycle development process from project analysis to project closeout for projects requiring the development or modification of systems and software. Our approach to defining the systems and software engineering practices is based on the Software Engineering Institute’s (SEI) Capability Maturity Model Integration (CMMI) Level 2 best practices, which have been assessed at Capability Maturity Model Integration (CMMI) Level 3."},
          {"type":"list", "content":["Since 2006, DKW has supported SPAWAR Atlantic in the application of sound software development, software engineering, and programming support, based our end-customers’ System Development Lifecycle (SDLC). Our team of software architects, engineers, developers, quality assurance testers, and technical writers have applied engineering, security, and scientific disciplines for a variety of financial management, medical, administrative, and logistics management applications, developing these applications using the classic waterfall or Agile development approach as best fit the client’s requirements.","DKW has been a significant contributor to the transformation of the Public Health Information System (PHIS), a critical USDA system used to protect our Nation’s food sources. This complex system consists of 800 database tables and 5.8 million lines of code."]},
          {"type":"text","content":"Since 2010, DKW has been providing CMMI DEV L3-appraised Information Technology Services (ITS) and Software Maintenance Support (SMS) for the PHIS application, which is a comprehensive, data-driven inspection system comprised of multiple applications that was developed to collect, mine and analyze inspection, surveillance and investigative data; predict hazards and vulnerabilities; communicate or report analysis results; and target resources to prevent or mitigate the risk of food borne illness and threats to the nation’s food supply. DKW has been the key enabler for USDA in implementing required enhancements to FSIS through waterfall, agile, and hybrid software development methodologies, and we have transitioned 11 USDA legacy systems in the process."},
          {"type":"text","content":"DKW has worked closely with FSIS as it implemented a phased approach to the continual development and maintenance of PHIS to ensure that FSIS employees and other users of PHIS could accomplish their primary objectives without interruption of business operations. This phased approach sought to stabilize, optimize, and then transform PHIS."},
          {"type":"list","content":["DKW is prime contractor in support of the Global Information Grid (GIG) Technical Guidance Federation (GTG-F), which is a suite of software applications on the NIPRNet and SIPRNet that provide technical guidance across the DISA Enterprise to achieve net-ready, interoperable, and supportable GIG systems. The GTG-F assists program managers, portfolio managers, engineers, and others in answering two questions critical to any IT or National Security Systems (NSS): (1) Where does the IT or NSS fit, as both a provider and consumer, into the GIG with regard to End-to-End technical performance, access to data and services, and interoperability?; and (2) What must an IT system or NSS do to ensure technical interoperability with the GIG? Several of the GIG Technical Guidance business processes have joined together as a single Web destination that has provided several advantages to our clients, such as ease of use, reduced hosting costs, and increasing data availability to the DoD community. DKW architects, designs, develops, implements, and provides maintenance for the GTG Federated Tools Suite. It is the authoritative source for ISP assessment data, GTPs with implementation guidance, and compliance. The GTG Federated Tools Suite program is a key enabler of the ongoing DISA-led IT enterprise transformation.","DKW modernized the Navy Fleet’s Sensitive Compartmented Information (SCI) Network Operations Center (NOC), which was formerly an antiquated network with an overly complex footprint that was difficult to manage. DKW analyzed the system architecture, the CONOPS, and the security environment to identify which areas needed to be improved and which vulnerabilities needed to be addressed. DKW discovered that the hardware and software were in some cases at end-of-life, a situation which the Navy deemed an unacceptable level of risk."]},
          {"type":"text","content":"DKW provided the Fleet SCI NOC with solutions that mitigated the risks, including replacement of older Cisco routers and Catalyst switches with upgraded components, reducing the overall footprint and complexity and increasing overall efficiency as well as virtualizing the hardware using VMware."}
        ]
      };
      ctrl.items = [
        {"title":"Application Development", "state":'app.solutions.netCentricSolutions({Id: "application-development" })', "image":"images/appdev2.jpg", "content":[{"type":"text", "content":"DKW’s Application Development service offerings provide application consulting, custom application development, testing, and quality assurance. We develop high quality business applications that increase operational efficiency and sustain your competitive advantage. DKW’s Applications Development allow your organization to take advantage of emerging technologies while offering a substantial reduction in capital expenditure, improved responsiveness to business demands, increased agility, and a faster time to market. We combine deep industry experience, highly skilled resources, and proven processes to deliver software solutions that fully support your goals. In addition, DKW’s cloud-based development platform allows us to develop and deliver applications across a multitude of platforms and technologies." }]},
        {"title":"C5ISR", "state":'app.solutions.netCentricSolutions({Id: "c5isr" })',"image":"images/c5sir1.jpg", "content":[{"type":"text", "content":"DKW’s C5ISR professionals have experience in the design, installation, configuration, testing, and/or going support of a wide range of systems, such as: Messaging & Communications Systems, Tactical Systems, Enterprise IT Infrastructure, Cyber Defense Systems, and Intelligence Systems. DKW is capable of supporting virtually any C5ISR support requirement, from the Enterprise-level engineering to end-user desktop support, both on GENSER and SCI platforms. Our mission-focused team is experienced in working around operational, technical, and administrative challenges to deliver our customers exceptional support. DKW’s services are highly customized to meet the unique needs and expectations of our customers." }]},
        {"title":"Datacenter Support", "state":'app.solutions.netCentricSolutions({Id: "datacenter-support" })',"image":"images/datacenter1.jpg", "content":[{"type":"text", "content":"DKW delivers scalable, reliable, and secure Data Center Support solutions to help maximize your existing technology investments and better meet your current and future technology needs. DKW offers some of the most reliable and affordable data center services in the industry. Our experienced staff of certified engineers are available at all hours of the day or night to provide the data center services you need to keep your business running. Our data centers offer various options for power, space, managed IT and hosting, virtual solutions, and cloud solutions. With years of experience managing, maintaining, and operating data center facilities, you can be assured that your critical data assets are secure and available." }]},
        {"title":"Healthcare IT", "state":'app.solutions.netCentricSolutions({Id: "healthcare-it" })',"image":"images/healthIT1.jpg", "content":[{"type":"text", "content":"DKW delivers a wide range of Healthcare IT solutions—from addressing back office functions and electronic medical records to clinical transformation and consumer engagement. DKW can assess your readiness from a technological perspective, build a Healthcare IT solutions roadmap, and bring your systems up to standard to support HIPAA requirements for patient data protection and support. Our commitment to value begins at architecture and extends to installation, monitoring, and maintenance. At DKW, we employ our cross-industry experts to bring the IT expertise in areas such as server consolidation, virtualization, remote access, high availability services, effective data communications architecture, wireless deployments, centralized vendor management, and proactive systems monitoring and management to healthcare. <br> Your medical practice can benefit from partnering with DKW for your technology support needs. We can help you make sense of technology and manage it efficiently and effectively so you can focus on your primary concern: patient care."}]},
        {"title":"IT Service Management", "state":'app.solutions.netCentricSolutions({Id: "it-service-management" })',"image":"images/itman2.jpg", "content":[{"type":"text", "content":"DKW’s IT Service Management solutions enable you to implement repeatable, measurable processes for defining, transitioning, delivering, and supporting services and assets throughout their life cycles. By integrating and automating Information Technology Infrastructure Library (ITIL) processes, you can utilize resources and control changes more efficiently, while streamlining the workload for your IT staff. With our comprehensive management capabilities, we can improve the quality of your services, prevent interruptions, and lower costs—all of which helps to ensure that your services stay aligned with your business requirements." }]},
        {"title":"IV&V", "state":'app.solutions.netCentricSolutions({Id: "iv&v" })',"image":"images/ivv2.png", "content":[{"type":"text", "content":"DKW’s Independent Verification and Validation (IV&V) processes provide an objective assessment of software products and processes throughout the software life cycle in an environment organizationally free from the influence, guidance, and control of the development effort. Our IV&V methodology is consistent with the latest systems engineering and process improvement models, and it has been assessed by the Capability Maturity Model Integration (CMMI)." }]},
        {"title":"Mobile Solutions", "state":'app.solutions.netCentricSolutions({Id: "mobile-solutions" })',"image":"images/mobilesolutions1.jpg", "content":[{"type":"text", "content":"DKW is a global provider of mobile solutions software for businesses of all sizes. By using our industry-leading experience, we develop easy-to-use, feature-rich mobile applications that extend the reach of your organization and employees. Our mobile experts are well equipped to help you extend existing technology solutions or develop new investments in cloud infrastructure to increase connectivity, collaboration, and productivity across your entire business." }]},
        {"title":"Operations and Maintenance", "state":'app.solutions.netCentricSolutions({Id: "operations-and-maintenance" })',"image":"images/itmain1.jpg", "content":[{"type":"text", "content":"DKW provides a broad range of IT operations support and maintenance services for a number of Federal civilian and DoD customers; we assist over 20,000 users located across the U.S. and around the world. The expansion, diversity, and increased sophistication of technology combined with our customers’ broad multi-site install-base requires that DKW be able to provide integrated service support and service delivery in all areas of communications, problem resolution, configuration management, and hardware and software operations and maintenance." }]},
        {"title":"Service Desk", "state":'app.solutions.netCentricSolutions({Id: "service-desk" })',"image":"images/serviceDesk1.jpg", "content":[{"type":"text", "content":"DKW’s Service Desk operations are delivered through a consistent set of tools and processes, using an ITIL based approach to IT Service Delivery. DKW has diverse experience in transitioning customers from multiple Helpdesks to a centralized Service Desk, which also leads to standardization across enterprise operations." }]},
        {"title":"Systems Engineering", "state":'app.solutions.netCentricSolutions({Id: "systems-engineering" })',"image":"images/systemseng1.jpg", "content":[{"type":"text", "content":"DKW’s proven ability to deliver quality products, while also meeting budget and schedule requirements is what makes us the premier service provider in the industry. DKW’s comprehensive and accurate requirements management process ensures that systems with well-designed hardware and software features meet exactly what users want and need. Our experience is essential as we work closely with clients, partners, and end-users to clearly define user needs and system requirements, and we deliver value at each step in the process. DKW’s systems engineers integrate all engineering disciplines into an efficient, streamlined process that smoothly takes the project from concept to production to operation, in order to meet our customer’s business and technical goals." }]},
        {"title":"Disability Accommodations", "state":'app.solutions.netCentricSolutions({Id: "disability-accommodations" })',"image":"images/disability1.jpg", "content":[{"type":"text", "content":"DKW is committed to providing equal employment opportunity to all job seekers. If you are an individual with a disability who is unable to use our online tools to search and or apply for jobs, please send an email to disability-accommodations@199.230.117.121/dkwcomm and indicate the specifics of the assistance you need, or please contact the Disability Accommodations Office at 202-355-7400. This option is reserved only for individuals who are unable to use the online tools due to a disability or medical issue. It is not intended for other purposes or inquiries."}]}
      ];

      ctrl.selectedItem = {};
      ctrl.scrollToNav = function(title){
        var navLoc = title.replace(/ /gi, '-');
        //$location.hash(navLoc);
        //$anchorScroll();
      }

      ctrl.setID = function(title){
        return title.replace(/ /gi, '-');
      }

      ctrl.getItem = function(searchId){
        var results = $.grep(ctrl.items, function(e){ return e.title.toLowerCase() == searchId.toLowerCase()});
        var object = null;
        if (results.length == 0) {
          // not found
        } else if (results.length == 1) {
          object = results[0];
        } else {
          // multiple items found
        }
        ctrl.selectedItem = object;
        var tst =0;
      }
      ctrl.linkIsActive = function(title){
        return (title == ctrl.selectedItem.title);
      }

      var paramID = $stateParams.Id;
      if(paramID != undefined && paramID != ""){
        ctrl.Id = paramID.replace(/-/gi, ' ');
        ctrl.getItem(ctrl.Id);
        // Set anchor
        ctrl.scrollToNav(ctrl.selectedItem.title);
      }
      else {
        ctrl.selectedItem = ctrl.pageInfo;
      }

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
