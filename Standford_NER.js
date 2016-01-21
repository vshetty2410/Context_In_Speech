var node_ner = require('node-ner');
var ner = new node_ner({
	install_path:	'./stanford-ner-2014-10-26/'
});
var fs = require('fs');


exports.stanfordNER = function(sentence,callback) {

	console.log("In Stanford parser");
	fs.writeFile("./stanford_ner.txt", sentence, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	});

	ner.fromFile('./stanford_ner.txt', function(entities) {
		console.log("Inside Standford NER function");
		console.log(entities);
		message ={};
		location = '';
		if(typeof(entities) != "undefined"){
		if(entities.PERSON){
			name = entities.PERSON[0];
			message["Name"] = name;
		}
		if(entities.CITY){
			location = entities.CITY[0];
			//console.log(location);
			message["Loc"] = location;
				if(entities.ORGANIZATION){
					location = location +', ' + entities.ORGANIZATION[0];
					//console.log(location);
					message["Loc"] = location;
				}
		}
		}

		if(message){
			callback(JSON.stringify(message));
		}
		else{
			console.log("Standford Parser came back with no results")
		}
	});

}

