// root component: all other components will be under this component
// objects: view - this will store the state and other high level objects
components.component('all', {
   bindings: {},
	controller: function () {
      var ctrl = this;
		ctrl.view = {};
		ctrl.view.isMobile = false;
		
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
    		configView();
		};
   },
   templateUrl: 'views/all.html'
});
