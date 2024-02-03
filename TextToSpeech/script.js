const TextBox = document.getElementById("text-box");
const PlayButton = document.getElementById("play-button");
const PauseButton = document.getElementById("pause-button");
const StopButton = document.getElementById("stop-button");
const VoiceList = document.getElementById("Voices");
let IsPaused = false;
let Voices = [];
let currentCharacter = 0;
let TextToPlay = TextBox.value || "MDN is stupid and so is Google and Apple.";
const EnglishVoices = [];

if ("speechSynthesis" in window) {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = PopulateVoices;
  }

  // Variables

  const Synth = window.speechSynthesis;
  const utterence = new SpeechSynthesisUtterance();
  utterence.text = TextToPlay;

  // Events

  VoiceList.onchange = VoiceChangeEventHandler;

  PlayButton.onclick = PlayEventHandler;

  PauseButton.onclick = PauseButtonEventHandler;

  StopButton.onclick = StopButtonEventHandler;

  TextBox.onchange = () => {
    TextToPlay = TextBox.value || "MDN is stupid and so is Google and Apple.";
    utterence.text = TextToPlay;
  };

  utterence.onend = () => {
    TextBox.disabled = false;
  };

  utterence.onboundary = (e) => {
    currentCharacter = e.charIndex;
  };

  // Event Handlers

  function VoiceChangeEventHandler(e) {
    StopButton.click();
    if (
      VoiceList.selectedIndex < EnglishVoices.length &&
      EnglishVoices[VoiceList.selectedIndex] !== undefined
    ) {
      utterence.voice = EnglishVoices[VoiceList.selectedIndex];
    }
    PlayButton.click();
  }

  function PlayEventHandler(e) {
    TextBox.disabled = true;
    if (IsPaused == true) {
      Synth.resume();
      IsPaused = false;
      return;
    }
    if (Synth.speaking == false) {
      Synth.speak(utterence);
    }
  }

  function PauseButtonEventHandler(e) {
    if (Synth.speaking == true) {
      Synth.pause();
      IsPaused = true;
    }
  }

  function StopButtonEventHandler(e) {
    IsPaused = false;
    TextBox.disabled = false;
    Synth.cancel();
  }

  // utility function

  // this function populate SpeechSynth voices to  HTML <select></select>  Element as <options></options>
  function PopulateVoices() {
    Voices = speechSynthesis.getVoices();
    Voices.forEach((voice) => {
      if (voice.lang.startsWith("en")) {
        EnglishVoices.push(voice);
        const option = document.createElement("option");
        option.value = voice.name;
        option.innerText = `${voice.name} - ${voice.lang}${
          voice.default ? " --[ DEFAULT ]" : ""
        }`;
        VoiceList.append(option);
      }
    });
  }
} else {
  TextBox.value = "Speech Feature not supported";
}
