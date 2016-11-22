// footer component for DKWSite
components.component('netCentricSolutions', {
   bindings: {},
	controller: function ($stateParams) {
      var ctrl = this;

      var paramID = $stateParams.Id;
      ctrl.Id = paramID.replace(/-/gi, ' ');
   },
   templateUrl: 'views/pageTemplates/solutions/net-centric-solutions.html'
});
