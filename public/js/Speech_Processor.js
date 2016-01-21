// Test browser support
window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition || null;

if (window.SpeechRecognition === null) {
document.getElementById('ws-unsupported').classList.remove('hidden');
document.getElementById('button-play-ws').setAttribute('disabled', 'disabled');
document.getElementById('button-stop-ws').setAttribute('disabled', 'disabled');
} 
else {
var recognizer = new window.SpeechRecognition();
var transcription = document.getElementById('transcription');
var log = document.getElementById('log');
var nam = document.getElementById('name');
var loc = document.getElementById('location');
var contact = document.getElementById('contact');

// Recogniser doesn't stop listening even if the user pauses
recognizer.continuous = true;
recognizer.lang = "en-IN";

// Start recognising
recognizer.onresult = function(event) {
  transcription.textContent = '';
  nam.value = 'Dummy Value before the magic';
  loc.value = 'Dummy location before the value';
  for (var i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      
      
      var sentence = event.results[i][0].transcript;
      console.log(sentence);

      transcription.textContent = sentence + ' (Confidence: ' + event.results[i][0].confidence + ')';
      if (io !== undefined) {

        var socket = io.connect('http://localhost:8081/');

        socket.on('parse-stream', function(data) {

       // console.log(data);
        result = JSON.parse(data);
       // console.log(result);
        alchem = result.ALCHEMY_NER;

        ner_name = alchem.Name;
        ner_loc = alchem.Loc;
        //console.log(ner_name);
        //console.log(ner_loc);
        
        nam.value = ner_name;
        loc.value = ner_loc;

        log.textContent = data;
        });

      socket.on("connected", function(r) {
        //puts transcribd sentence into the socket pipeline for the backend serve to pick it up
        socket.emit("parse", sentence);

      });
      }

    } else {
      //intermin results only. Please don choose interim. It was a test featuere only. The system would do nothing on it
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