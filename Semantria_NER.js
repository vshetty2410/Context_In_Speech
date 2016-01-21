
require('./node_modules/semantria/SemantriaJavaScriptSDK/SemantriaJavaScriptSDK.js');
var Semantria = require('semantria-node');

function processResponse(analyticData,callback) {
	for(var i=0, data;data=analyticData[i];i++) {
		var response = [];
		if (data['entities']) {
			for(var j=0, entity; entity=data['entities'][j]; j++) {
				//console.log(data['entities'][j]);
				response.push({entity_type : data['entities'][j].entity_type ,name : data['entities'][j].title});

			}

					
			if(response){
				callback(response);
			}
		} else {
			console.log("No text extracted");
		}
	}
}

function receiveResponse(entitiesCount,callback) {
	var analyticData = [];
	var timeout = setInterval(function() {
		console.log("Retrieving your processed results...");
		var processedDocuments = SemantriaActiveSession.getProcessedDocuments();

		if (processedDocuments && processedDocuments.length) {
			analyticData = analyticData.concat(processedDocuments);
		}

		if(analyticData.length == entitiesCount) {
			clearInterval(timeout);
			processResponse(analyticData,function(result){
		
			if(result){
				callback(result);
			}
		});

		} 
	}, 2000);
}

exports.semantriaNER = function(sentence,callback) {

	
	SemantriaActiveSession = new Semantria.Session('3a525161-0d0c-43ea-adbb-68fd12730d56', '8c0fac7b-e9c9-4a25-94a7-d99c89fc77d5', 'Speech_app');
	
	message = {};
		var id = Math.floor(Math.random() * 10000000);
		id = id +"";
		var status = SemantriaActiveSession.queueDocument({
			id: id,
			text: sentence
		}); 
		console.log(status);
		// Check status from Semantria service
		if (status == 202) {
			console.log("Document# " + id + " queued successfully");
		}
		else
		{
			console.log("Service at semantria is currently down");
			callback(message);
		}

	receiveResponse(initialTexts.length,function(response){
	//console.log(response);
		response.forEach(function(entity){

			console.log(entity.entity_type);
			if(entity.entity_type == 'Person'){
	            message["Name"] = entity.name;
	        }
	        if(entity.entity_type == 'Place'){
	            location = entity.name;
	            message["Loc"] = location;
	        }
		});

	//console.log(message);
    if(message){
        callback(JSON.stringify(message));
    }
    else{
        console.log("Semantria wasn't able to extract entities");
    }
	});
}