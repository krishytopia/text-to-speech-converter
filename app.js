let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById("voiceSelect");

// Populate available voices
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.add(option);
    });
};

// Change voice on selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Speak the text
document.getElementById("speakButton").addEventListener("click", () => {
    speech.text = document.getElementById("textInput").value;
    window.speechSynthesis.speak(speech);
});

// Download Speech (Using Google TTS API)
document.getElementById("downloadButton").addEventListener("click", () => {
    let text = document.getElementById("textInput").value;

    if (!text) {
        alert("Please enter some text to download!");
        return;
    }

    let url = `https://api.voicerss.org/?key=74362d7673704300af7a3633cbfab016&hl=en-us&src=${encodeURIComponent(text)}`;

    // Create a hidden download link
    let a = document.createElement("a");
    a.href = url;
    a.download = "speech.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
