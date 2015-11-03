(function() {
		
		var app = angular.module('myApp', ['ngRoute']);

		app.config(function($routeProvider){
			$routeProvider
				.when('/',{
					templateUrl: 'views/frontpage.html',
					controller: 'frontpageController'

				})
				.when('/brautir',{
					templateUrl:'views/brautir.html',
					controller: 'brautirController'
				})
				.when('/afangar',{
					templateUrl:'views/afangar.html',
					controller:'afangarController'
				})
				.when('/braut/:brautname',{
					templateUrl:'views/braut.html',
					controller:'brautController'
				})
				.otherwise({
					redirectTo: '/'
				});
		});


}());

