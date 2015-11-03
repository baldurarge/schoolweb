(function(){
var app = angular.module("myApp");

app.controller('afangarController',function($scope, getApi){

	var onAfagnarComplete = function(data){
		$scope.afangar = data;
	}
	


	getApi.getAfangar().then(onAfagnarComplete);





});


}());