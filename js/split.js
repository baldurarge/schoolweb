(function(){

	var splitAndGetInfo = function() {
	
		
		var splitAfangar = function(data,brautSent){
			var afangi = data;
			afangi = afangi.split('');
			var splitData = {"group":"","stage": "","info":"","step":"","school":"", "done":false,"special":null};
			var tempData = [10];
			tempData[0] = afangi[0];
			tempData[1] = afangi[1];
			tempData[2] = afangi[2];
			splitData.group = tempData.join('');
			splitData.stage = afangi[3];
			tempData = [];
			tempData[0] = afangi[4];
			tempData[1] = afangi[5];
			splitData.info = tempData.join('');
			splitData.einingar = afangi[7];
			splitData.step = afangi[8];
			tempData = [];
			tempData[0] = afangi[9];
			tempData[1] = afangi[10];
			splitData.school = tempData.join('');

			if(checkIfSpecial(data,brautSent)){
				splitData.special=checkIfSpecial(data,brautSent);
			};

			if( splitData.einingar <= 0)
				splitData.done = true;
			return splitData;

		}

		var checkIfSpecial = function (afangi,brautSent) {
			for(var key in brautSent.special){
				if(afangi == key){
					return brautSent.special[key];
				}
			}
		};

		var getGroups = function(data,groupsArray){

			if(groupsArray.indexOf(data)<0){
				groupsArray.push(data);
			}
			return groupsArray;


		}

		var getTheRightAfangar = function(allirAfangar,braut){
			var special = false;
			var tempB = {};


			for(var i = 0; i<braut.holls.length;i++){
				for(key in braut.holls[i]){
					if(key != "name"){
						tempB[key] = [];
						for(var x = 0; x< braut.holls[i][key].length;x++){
							for(var y = 0; y<allirAfangar.length;y++){
								if(allirAfangar[y].ID == braut.holls[i][key][x]){

										tempB[key].push({"name": allirAfangar[y].name,"info":splitAfangar(allirAfangar[y].name,braut),"selected":false});

									}
								}
							}
						}
					}
				}


			return tempB;

		};



		return{
			splitAfangar:splitAfangar,
			getGroups:getGroups,
			getTheRightAfangar:getTheRightAfangar
		}

	};

	var module = angular.module("myApp");
	module.factory("splitAndGetInfo",splitAndGetInfo);

}());