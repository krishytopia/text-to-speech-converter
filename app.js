let speech = new SpeechSynthesisUtterance();


let voices = [];

let voiceSelect = document.querySelector("select")

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)))
};

voiceSelect.addEventListener("change", () =>{
    speech.voice = voices[voiceSelect.value]
});

document.querySelector("button").addEventListener("click", () =>{
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech)
});


  // Function to handle button click event
  document.getElementById('downloadButton').addEventListener('click', function() {
    // Your code to trigger the download action
    const chunks = [];

    // Mock speech output for demonstration
    const speechOutput = new SpeechSynthesisUtterance("This is a test speech output.");

    // Start recording speech output
    const mediaRecorder = new MediaRecorder(speechOutput);
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'speech.mp3';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
    // When speech synthesis is complete, stop recording
    speechOutput.onend = function() {
        mediaRecorder.stop();
    };
  });
