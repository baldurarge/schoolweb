(function(){
	var getApi = function($http){

		var getAfangar = function(brautID){
		
			return $http.get("js/json/data.json")
				.then(function(response){
					return response.data.result.afangar;
				});
		};

		var getBraut = function(brautNafn){
			return $http.get("js/json/data.json")
				.then(function(response){
					var brautir = response.data.result.brautir;

					for(var i = 0; i<brautir.length;i++){
						if(brautir[i].nafn == brautNafn){
							return brautir[i];

						}
					}

				});
		};

		var getBrautir = function(){
			return $http.get('js/json/data.json').then(function(response){
					return response.data.result.brautir;
				});

		};


		return{
			getAfangar:getAfangar,
			getBraut:getBraut,
			getBrautir:getBrautir
		};

	};

	var module = angular.module("myApp");
	module.factory("getApi",getApi);



}());