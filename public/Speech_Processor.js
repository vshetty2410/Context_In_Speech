var Standford_NER = require('./Standford_NER.js');
var Calais_NER = require('./Calais_NER.js');
var Alchemy_NER = require('./Alchemy_NER.js');
var Semantria_NER = require('./Semantria_NER.js');


// Test browser support
window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition || null;

if (window.SpeechRecognition === null) {
document.getElementById('ws-unsupported').classList.remove('hidden');
document.getElementById('button-play-ws').setAttribute('disabled', 'disabled');
document.getElementById('button-stop-ws').setAttribute('disabled', 'disabled');
} else {
var recognizer = new window.SpeechRecognition();
var transcription = document.getElementById('transcription');
var log = document.getElementById('log');
var name = document.getElementById('name');
var loc = document.getElementById('loc');
var contact = document.getElementById('contact');

// Recogniser doesn't stop listening even if the user pauses
recognizer.continuous = true;
recognizer.lang = "en-IN";

// Start recognising
recognizer.onresult = function(event) {
  transcription.textContent = '';

  for (var i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
     
      
      var sentence = event.results[i][0].transcript;
      console.log(sentence);
      var stanfordEntities = Standford_NER.stanfordNER(sentence);
      var calaisEntities = Calais_NER.calaisNER(sentence);
      var alchemyNER = Alchemy_NER.alchemyNER(sentence);
      var semantriaNER = Semantria_NER.semantriaNER(sentence);

      console.log("Standford_NER results - ");
      console.log(stanfordEntities);

      console.log("Calais_NER results - ");
      console.log(calaisEntities);

      console.log("Alchemy_NER results - ");
      console.log(alchemyNER);

      console.log("Semantria_NER results - ");
      console.log(semantriaNER);

       transcription.textContent = sentence + ' (Confidence: ' + event.results[i][0].confidence + ')';

    } else {
      transcription.textContent += event.results[i][0].transcript;
    }
  }
};

// Listen for errors
recognizer.onerror = function(event) {
  log.innerHTML = 'Recognition error: ' + event.message + '<br />' + log.innerHTML;
};

document.getElementById('button-play-ws').addEventListener('click', function() {
  // Set if we need interim results
  recognizer.interimResults = document.querySelector('input[name="recognition-type"][value="interim"]').checked;

  try {
    recognizer.start();
    log.innerHTML = 'Recognition started' + '<br />' + log.innerHTML;
  } catch(ex) {
    log.innerHTML = 'Recognition error: ' + ex.message + '<br />' + log.innerHTML;
  }
});

document.getElementById('button-stop-ws').addEventListener('click', function() {
  recognizer.stop();
  log.innerHTML = 'Recognition stopped' + '<br />' + log.innerHTML;
});

document.getElementById('clear-all').addEventListener('click', function() {
  transcription.textContent = '';
  log.textContent = '';
});
}