// header component for DKWSite
components.component('dkwHeader', {
   bindings: {},
	controller: function () {
      var ctrl = this;
		ctrl.isSearching = false;
		
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
