import { useState } from "react";
import { AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer } from "microsoft-cognitiveservices-speech-sdk";
import { getTokenOrRefresh } from "./token_util";

function App() {
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [displayText, setDisplayText] = useState('start speaking...');
  const [isLoading, setIsLoading] = useState(false);


  if (isRecording) {
    sttFromMic();
  }


  async function sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    // setDisplayText('speak into your microphone...');

    recognizer.recognizeOnceAsync(result => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        setDisplayText((prevText) => prevText + '\n' + result.text);
      } else {
        setDisplayText('ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.');
      }
    });

  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Real-Time Meeting Transcription</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <button
              id="toggleRecording"
              className={`bg-${isRecording ? "red" : "blue"}-500 text-blue-400 px-4 py-2 cursor-pointer rounded hover:bg-${isRecording ? "red" : "blue"
                }-600`}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? "Stop Listening" : "Start Listening"}
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="languageSelect" className="block text-sm font-medium text-gray-700">Select Language</label>
            <select id="languageSelect" className="mt-1 block w-full p-2 border rounded">
              <option value="en-US">English (US)</option>
              <option value="si-LK">Sinhala (සිංහල)</option>
            </select>
          </div>
          <div id="transcriptionOutput" className="bg-gray-50 p-4 rounded h-64 overflow-y-auto border">
            {displayText}
          </div>
          <div id="summaryOutput" className="bg-gray-50 p-4 rounded mt-4 border hidden">

          </div>
        </div>
      </div>
    </>
  )
}

export default App
