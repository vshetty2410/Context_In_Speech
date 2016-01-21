var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('8d8df49b10feb56f7e6965864b632146214d30b1');

exports.alchemyNER = function(sentence,callback) {
	
	alchemy.entities(sentence, {}, function(err, response) {
	  if (err) throw err;
	var message = {};
	var location ='';
	var entities = response.entities;
	console.log("Inside Alchemy API");
	if(entities){
    entities.forEach(function(entity){
        if(entity.type == 'Person'){
            message["Name"] = entity.text;
        }


        if(entity.type == 'City'){
            location = entity.text; 
            message["Loc"] = location;
        }


        if(entity.type == 'Country'){
            location = location + ', '+ entity.text; 

            message["Loc"] = location;
        }
        if(entity.type == 'Continent'){

            location = location + ', '+ entity.text; 

            message["Loc"] = location;
        }     

    });
	}
    if(message){
        callback(JSON.stringify(message));
    }
    else{
        console.log("Alchemy wasn't able to extract entities");
    }


	});
}
