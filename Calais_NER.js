var Calais = require('calais-entity-extractor').Calais;
var calais = new Calais('pFRR2BzTvaExG36ndZY9wkgJZWDgIt9n');

message = {};
location = '';

exports.calaisNER = function(sentence,callback) {
//this.sentence = sentence;

calais.set('content', sentence);
calais.extractFromText(function(result, err) {     //perform the request
    if (err) {
        console.log('Uh oh, we got an error! : ' + err);
        return;
    }
    //Take a look at the results!
    var util = require('util');
    //'entities' contains a list of the detected entities, and gives basic info & confidence
    console.log('Entities: ' + util.inspect(result.entities, false, null));

    console.log(result.entities[0]);
    entities = result.entities[0];

    for(var i in result.entities){

        if(entities){

            console.log(entities.type);
            if(entities.type == 'Person'){
                message["Name"] = entities.name;
                message["Name_Confidence"] = entities.confidence;
            }

            if(entities.type == 'Company'){
                if(location){
                 location = location + ', '+ entities.fullName; 
                }else location = entities.fullName;

                message["Loc"] = location;
                message["Loc_Confidence"] = entities.confidence;
            }

            if(entities.type == 'City'){
                if(location){
                 location = location + ', '+ entities.fullName; 
                }else location = entities.fullName;

                message["Loc"] = location;
                message["Loc_Confidence"] = entities.confidence;
            }
            if(entities.type == 'Country'){
                if(location){
                 location = location + ', '+ entities.fullName; 
                }else location = entities.fullName;

                message["Loc"] = location;
                message["Loc_Confidence"] = entities.confidence;
            }
        }

    }

    if(message){
        callback(JSON.stringify(message));
    }
    else{
        console.log("Open Calais wasn't able to extract entities");
    }

});

}