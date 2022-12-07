// new speech recognition object
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

const textarea = document.getElementById("textarea");
const content = document.getElementById("content");
const instructions = document.getElementById("instructions");


// This runs when the speech recognition service starts
recognition.onstart = function() {
    console.log("We are listening. Try speaking into the microphone.");
};

recognition.onspeechend = function() {
    // when user is done speaking
    instructions.innerText = "You were quiet for a while so voice recognition turned itself off.";
    recognition.stop();
}
              
// This runs when the speech recognition service returns result
recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    console.log(transcript, confidence);
    if (textarea.value) {
        textarea.value += " ";
    }
    textarea.value += transcript;
    content.innerHTML = textarea.value;
};

textarea.addEventListener("change", () => {
    content.innerHTML = textarea.value;
});

function startSpeech() {
    recognition.start();
    instructions.innerText = "Voice recognition activated. Try speaking into the microphone.";
}

function pauseSpeech() {
    recognition.stop();
    instructions.innerText = 'Voice recognition paused.';
}