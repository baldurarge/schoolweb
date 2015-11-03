(function(){

var app = angular.module("myApp");

app.controller('brautirController',function($scope, getApi){

	


	var onBrautComplete = function(data){
		$scope.brautir = data;
		console.log($scope.brautir);
	}


	getApi.getBrautir().then(onBrautComplete);

});

}());