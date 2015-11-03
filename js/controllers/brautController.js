(function() {

	var app = angular.module('myApp');


	app.controller('brautController',function($scope, filterFilter, alterTable, getApi,splitAndGetInfo,checkIfAccepted, $routeParams){
		$scope.brautNafn = $routeParams.brautname;
		$scope.clickedAfangi = null;
		$scope.einingarHeild = 0;
		$scope.selectedAfangar = [];
		$scope.selectedAfangarFinal = {"main":[],"second":[]};
		$scope.afangaVal = [{"name":1 ,"data":[]}];
		$scope.myFilter = 2;




		var getSelectedEiningar = function(){
			var einingar = 0;
			for(var i = 0; i< $scope.selectedAfangar.length;i++){
				einingar += parseInt($scope.selectedAfangar[i].info.einingar);
			}
			return einingar;
		};

		var onBrautComplete = function(data){
			$scope.braut = data;
			$scope.einingarTilUtskriftar = $scope.braut.EiningarTilUtskriftar;

		};



		var onAfangarComplete = function(data){
			$scope.allirAfangar = data;

			$scope.afangar = splitAndGetInfo.getTheRightAfangar($scope.allirAfangar,$scope.braut);


		};
		
		var onOtherConplete = function() {
			$scope.groups = [];
			for(key in $scope.afangar){
				for(var i = 0; i<$scope.afangar[key].length;i++){
					$scope.groups = splitAndGetInfo.getGroups($scope.afangar[key][i]["info"]["group"],$scope.groups);
				}
			}
		};

		$scope.checkIfInGroup = function(afangar,group){
			var found = false;
			for(var i =0; i<afangar.length;i++){
				if(afangar[i].info.group == group){
					found =true;
				}
			}
			return found;
		};

		$scope.getName = function(data){
			for(var i = 0; i<$scope.braut.holls.length;i++){
				for(key in $scope.braut.holls[i]){
					if(data == key){
						return $scope.braut.holls[i].name;
					}
				}
			}
		};


		$scope.afangiStyle = function(afangi){
			if(afangi.info.done == true)
			//Done
				return {'color':'rgba(0,0,0,0.2)','text-decoration':'line-through'};

			else if(checker(afangi))
				//clicked
				if(afangi.selected)
					return{'color':'rgba(51,255,51,1)'};
				else
					//clickable
					return {'color':'white'};
			else
				//ekki clickable
				return {'color':'rgba(0,0,0,0.3)'};
		};

		$scope.tableAfangiStyle = function(afangi){
			if(afangi != undefined)
				if(afangi.selectedInTable)
					return{'color':'white','background-color':'orange'};
				else
					return{'color':'black'};
		};


		$scope.checkeiningar = function (afangi) {
			if(afangi.info.einingar != 0){
				return true;
			}
			else{
				return false;
			}
		};

		var checker = function(afangi){
			return checkIfAccepted.check(afangi,$scope.afangar, $scope.braut);
		};



		$scope.checkFilter = function(afangi){
			if($scope.myFilter == 1){

			} else if($scope.myFilter == 2){
				if(afangi.selected == true){
					return false;
				}else{
					return checkIfAccepted.check(afangi,$scope.afangar,$scope.braut);
				}
			}else{
				return true;
			}
		};

		$scope.einingarKomnar = function(){
			var einingar = 0;
			for(key in $scope.afangar){
				for(var i = 0; i<$scope.afangar[key].length;i++){
					if($scope.afangar[key].info.done){
						einingar += $scope.afangar[key].info.einingar;

					}
				}
			}
			return einingar;
		};

		var removeAndAddSelected = function(number,afangi){

			$scope.selectedAfangarFinal = alterTable.removeAndAddSelect(number,afangi,$scope.selectedAfangarFinal);

		};

		$scope.isValDataEmpty = function(val){
			var returner = true;
			for(key in val.data){
				if(val.data[key].length <=0){
					returner = false;
				}
			}
			return returner;


		};

		$scope.isAfangiEmpty = function(afangi){
			if(afangi == undefined)
				return false;
			else
				return true;
		};

		$scope.vistaAfanga = function(){
			$scope.afangaVal = alterTable.vistaAfanga($scope.selectedAfangarFinal,$scope.afangaVal);

			for(key in $scope.afangar){
				for(var i = 0; i<$scope.afangar[key].length;i++){
					for(key2 in $scope.selectedAfangarFinal){
						for(var x = 0; x<$scope.selectedAfangarFinal[key2].length;x++){
							if($scope.afangar[key][i].name == $scope.selectedAfangarFinal[key2][x].name)
								$scope.afangar[key][i].info.done = true;
						}
					}

				}
			}

			$scope.selectedAfangarFinal = {'main':[],'second':[]};


		};




		$scope.afangiClickedOnce = function(afangi){
			if(afangi.info.done == false) {
				if (checker(afangi)) {

					if (afangi.selected == true) {
						afangi.selected = false;
						removeAndAddSelected(1, afangi);
					}
					else if(afangi.selected == false){
						afangi.selected = true;
						removeAndAddSelected(0, afangi);
					}
				}
			}

		};

		$scope.afangiInTableClicked = function(afangi){
			if (afangi.selectedInTable == true) {
				afangi.selectedInTable = false;

			}
			else if(afangi.selectedInTable == false){
				afangi.selectedInTable = true;

			}
		};

		$scope.moveAfangar = function(){
			$scope.selectedAfangarFinal = alterTable.moveAfangar($scope.selectedAfangarFinal);
		};

		$scope.removeAfangar = function(){
			var returned = alterTable.removeAfangar($scope.selectedAfangarFinal);
			$scope.selectedAfangarFinal = returned[0];
			var afangarToChangeBack = returned[1];
			for(key in $scope.afangar){
				for(var i = 0; i< $scope.afangar[key].length;i++){
					for(var x = 0; x<afangarToChangeBack.length;x++){
						if($scope.afangar[key][i].name == afangarToChangeBack[x].name)
							$scope.afangar[key][i].selected = false;
					}

				}
			}

		};



		getApi.getBraut($scope.brautNafn).then(onBrautComplete);
		getApi.getAfangar().then(onAfangarComplete).then(onOtherConplete);


			
	});


}());