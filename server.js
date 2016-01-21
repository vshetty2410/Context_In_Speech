var Standford_NER = require('./Standford_NER.js');
var Calais_NER = require('./Calais_NER.js');
var Alchemy_NER = require('./Alchemy_NER.js');
var Semantria_NER = require('./Semantria_NER.js');

var express = require('express');
var app = express();
var http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
//Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081);

//Setup routing for app
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
		
		socket.on("parse", function(sentence) {
		//console.log(sentence);
		calais_answer = {};
		stanford_answer = {};
		alchemy_answer = {};
		semantria_answer = {};		
		message = {};
		console.log(message);
		Calais_NER.calaisNER(sentence,function(result_calais){

			console.log("Calais Parser ran");
			if(result_calais){

				calais_answer = JSON.parse(result_calais);

						Standford_NER.stanfordNER(sentence,function(result_stanford){

							console.log("Standford Parser ran");
							if(result_stanford){

								stanford_answer = JSON.parse(result_stanford);
								
										Alchemy_NER.alchemyNER(sentence,function(result_alchemy){
											console.log("Alchemy Parser ran");

											if(result_alchemy){
												
												alchemy_answer = JSON.parse(result_alchemy);
												
													Semantria_NER.semantriaNER(sentence,function(result_semantria){
														console.log("Semantria Parser ran");
		
														if(result_semantria){

																semantria_answer = JSON.parse(result_semantria);
																console.log("Each Answer");
																console.log(calais_answer);
																console.log(stanford_answer);
																console.log(alchemy_answer);
																console.log(semantria_answer);
																message["CALAIS_NER"] = calais_answer;
																message["STANFORD_NER"]  = stanford_answer;
																message["ALCHEMY_NER"] = alchemy_answer;
																message["SEMANTRIA_NER"] = semantria_answer;
																console.log(message);

																var result = JSON.stringify(message);
																console.log(result);
																socket.broadcast.emit("parse-stream", result);
																socket.emit('parse-stream', result);														
														}
														else message["SEMANTRIA_NER"] = "No Value";
														});
					
											}
											else message["ALCHEMY_NER"] = "No Value";
										});

							}
							else message["STANFORD_NER"] = "No Value";
						});			
			}
			else message["CALAIS_NER"] = "No Value";

		});




		});

socket.emit("connected");
});