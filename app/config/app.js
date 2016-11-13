'use strict';
		
var directives = angular.module('directives', []);
var components = angular.module('components', []);

var dkwSite = angular.module('DKWSite', 
									  ['ngMaterial',
										'ngAnimate',
										'ui.router',
										'directives',
										'components']);


