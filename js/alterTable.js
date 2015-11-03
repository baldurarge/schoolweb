(function(){
    var alterTable = function(){

        var removeAfangar = function(afangaGroup) {
            var afangarToChangeBack = [];
            var tempSelected = {"main":[],"second":[]};
            for(key in afangaGroup){
                for(var i = 0; i<afangaGroup[key].length;i++){
                    if (afangaGroup[key][i].selectedInTable) {
                        afangarToChangeBack.push(afangaGroup[key][i]);
                        delete afangaGroup[key][i];
                    }
                    if (afangaGroup[key][i] != undefined){
                        tempSelected[key].push(afangaGroup[key][i]);
                    }
                }
            }
            var returner = [tempSelected,afangarToChangeBack];
            return returner;
        };


        var moveAfangar = function(afangaGroup){

            var tempSelected = {"main":[],"second":[]};
            for(key in afangaGroup){
                for(var i = 0; i<afangaGroup[key].length;i++){
                    if(afangaGroup[key][i].selectedInTable == true){
                        //allir áfangar sem eiga að færast
                        if(key == "main"){
                            tempSelected.second.push(afangaGroup[key][i]);
                            delete afangaGroup[key][i];
                        }else if(key =="second"){
                            tempSelected.main.push(afangaGroup[key][i]);
                            delete afangaGroup[key][i];
                        }

                    }
                }
            }


            for(key in afangaGroup){
                for(var i = 0; i<afangaGroup[key].length;i++){
                    if (afangaGroup[key][i] != undefined){
                        tempSelected[key].push(afangaGroup[key][i]);

                    }
                }
            }

            for(key in tempSelected){
                for(var i = 0; i<tempSelected[key].length;i++){
                    tempSelected[key][i].selectedInTable = false;
                }
            }
            return tempSelected;
        };

        var removeAndAddSelect = function(number,afangi,afangiGroup){
            var tempSelected = {"main":[],"second":[]};
            if(number == 1){
                for(key in afangiGroup) {
                    //lengdina í mein, lendina í second
                    for (var i = 0; i < afangiGroup[key].length; i++) {
                        //ef nafn þessar afanga er ekki sama og í afanganum þá set ég inn í arrayinn
                        if (afangiGroup[key][i].name === afangi.name) {
                            delete afangiGroup[key][i];
                        }
                        if (afangiGroup[key][i] != undefined){
                            tempSelected[key].push(afangiGroup[key][i]);
                        }
                    }
                }

                afangiGroup = tempSelected;

            }else{
                var found = false;
                for(key in afangiGroup){
                    for(key2 in afangiGroup[key]){
                        if(afangiGroup[key][key2].name == afangi.name){
                            found = true;
                        }
                    }
                }
                if(!found)
                    afangiGroup.main.push(afangi);
            }


            for(key in afangiGroup) {
                //lengdina í mein, lendina í second
                for (var i = 0; i < afangiGroup[key].length; i++) {
                    //ef nafn þessar afanga er ekki sama og í afanganum þá set ég inn í arrayinn
                    afangiGroup[key][i].selectedInTable = false;
                }
            }

            return afangiGroup;
        };


        var vistaAfanga = function(afangiGroup,afangiVal){
            var notNull= true;
           for(var i =0; i<afangiVal.length;i++){
               if(afangiVal[i].data<=0){
                   afangiVal[i].data = afangiGroup;
               }
           }
            var name = afangiVal.length+1;
            afangiVal.push({"name":name,"data":[],"einingar":0});
            return afangiVal;
        };












        return{
            removeAfangar:removeAfangar,
            removeAndAddSelect:removeAndAddSelect,
            moveAfangar:moveAfangar,
            vistaAfanga:vistaAfanga
        };

    };



    var module = angular.module("myApp");
    module.factory("alterTable",alterTable);

}());