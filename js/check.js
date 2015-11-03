(function(){
	var checkIfAccepted = function(){


		var stage = function(stage){
			var number;
			switch(stage){
				case 'A':
					number = 0;
					break;
				case 'B':
					number = 1;
					break;
				case 'C':
					number = 2;
					break;
				case 'D':
					number = 3;
					break;
				case 'E':
					number = 4;
					break;
				case 'F':
					number = 5;
					break;
				case 'G':
					number = 6;
					break;
				case 'H':
					number = 7;
					break;
				default:
					number = 0;
					break;
			}

			return number;
		};

		var howManyDoneInGroup = function(afangi,allirafangar){
			var number = 0;
			for(key in allirafangar){
				for(var i = 0; i<allirafangar[key].length;i++){
					if(allirafangar[key][i]['info']['group'] == afangi['info']['group']){
						if(allirafangar[key][i]['info']['done'] == true){
							number++;
						}
					}
				}
			}
			return number;
		};

		var checkSpecial = function(afangi,braut){
			var afangar = null;
			for(key in braut.special){
				if(afangi.name == key){
					afangar = braut.special[key];
				}
			}
			return afangar;
		};

		var checkIfSpecialAreDone = function(specialAfangar,allirafangar){
			var returner = true;
				for (key in allirafangar) {
					for (var i = 0; i < allirafangar[key].length; i++) {
						for (var x = 0; x < specialAfangar.length; x++) {
							if (allirafangar[key][i].name == specialAfangar[x]) {
								if (allirafangar[key][i]['info']['done'] != true) {
									returner = false;

								}
							}
						}
					}
				}
				return returner;
		};


		var check = function(afangi,allirafangar,braut) {
			//t.d. STÆ3FV03FTS
			//STÆ- group, 3-stig, - FV- upplysingar??, 03-einingar, F-stage, TS- tækniskólinn

			//hversu margir áfangar eru í undanfara
			var howManyBefore = stage(afangi.info.step);

			//finna hversu margir eru búnir í GROUP
			var howManyDone = howManyDoneInGroup(afangi,allirafangar);

			//finn hvaða áfangar hann hefur í special
			var specialAfangar = checkSpecial(afangi,braut);

			if(specialAfangar != null){
				var specialDone = checkIfSpecialAreDone(specialAfangar,allirafangar);
			}else{
				specialDone = true;
			}


			if(howManyDone >= howManyBefore){
				if(specialDone){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
			
		};

	return{
		check:check
	};

	};

	var module = angular.module("myApp");
	module.factory("checkIfAccepted",checkIfAccepted);

}());