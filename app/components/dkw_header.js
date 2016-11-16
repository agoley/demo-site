

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
