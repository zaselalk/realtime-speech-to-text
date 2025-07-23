import { useEffect, useRef, useState } from "react";
import { AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer } from "microsoft-cognitiveservices-speech-sdk";
import { getTokenOrRefresh } from "./token_util";
import { Header } from "./components/Header";
import { MicroPhone } from "./components/MicroPhone";

function App() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState('');
  const [intermediateText, setIntermediateText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (isRecording) {
      startContinuousRecognition();
    } else {
      stopContinuousRecognition();
    }

    // Cleanup on unmount
    return () => {
      stopContinuousRecognition();
    };
  }, [isRecording]);

  async function startContinuousRecognition() {
    setIsConnecting(true);
    setDisplayText('');
    setIntermediateText('');

    const tokenObj = await getTokenOrRefresh();
    const speechConfig = SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = selectedLanguage;

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current = recognizer;

    // Handle intermediate results (while speaking)
    recognizer.recognizing = (_, e) => {
      // Update intermediate text without affecting final text
      setIntermediateText(e.result.text);
      // setIsLoading(true);
    };

    // Handle final results (when speech segment is complete)
    recognizer.recognized = (_, e) => {
      if (e.result.reason === ResultReason.RecognizedSpeech && e.result.text.trim()) {
        // Append final result to display text
        setDisplayText((prevText) => {
          const newText = prevText + (prevText ? ' ' : '') + e.result.text;
          return newText;
        });
        // Clear intermediate text since we now have the final result
        setIntermediateText('');
        setIsLoading(false);
      }
    };

    recognizer.sessionStopped = () => {
      console.log('\nSession stopped event.');
      setIsRecording(false);
    };


    recognizer.canceled = () => {
      setDisplayText('ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.');
      recognizer.stopContinuousRecognitionAsync();
      setIsLoading(false);
    };

    recognizer.startContinuousRecognitionAsync(
      () => {
        console.log('Continuous recognition started.');
        setIsConnecting(false);
        setIsRecording(true);
        setIsLoading(true);
      },
      (err) => {
        console.error('Error starting continuous recognition:', err);
        setDisplayText('ERROR: Could not start continuous recognition. Please check your microphone and network connection.');
        setIsLoading(false);
      }
    );
  }

  function stopContinuousRecognition() {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          console.log('Continuous recognition stopped');
          setIsLoading(false);
          recognizerRef.current?.close();
          recognizerRef.current = null;
        },
        (err) => {
          console.error('Error stopping recognition:', err);
          recognizerRef.current?.close();
          recognizerRef.current = null;
        }
      );
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header language={selectedLanguage} onLanguageChange={setSelectedLanguage} />

        {/* Microphone Button */}
        <MicroPhone
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          isConnecting={isConnecting}
        />
        {/* Language Selection */}


        <div className=" backdrop-blur-lg  p-6 rounded-lg  ">

          <section>
            <div id="transcriptionOutput" className="bg-slate-900/50 text-white  p-4 rounded  overflow-y-auto text-2xl ">
              {/* Display final transcribed text */}
              {displayText && (
                <span className="block mb-2">
                  {displayText.split(' ').map((word, index) => (
                    <span
                      key={index}
                      className="inline-block mr-1 animate-fadeIn"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              )}

              {/* Display intermediate text (while speaking) */}
              {intermediateText && (
                <span className="block text-blue-300 opacity-75 italic">
                  {intermediateText}
                  <span className="animate-pulse ml-1">|</span>
                </span>
              )}

              {/* Loading indicator */}
              {isLoading && !intermediateText && (
                <span className="inline-flex items-center">
                  <span className="animate-pulse text-blue-400">●</span>
                  <span className="animate-pulse text-blue-400 animation-delay-150">●</span>
                  <span className="animate-pulse text-blue-400 animation-delay-300">●</span>
                </span>
              )}


              {/* Placeholder text when nothing is transcribed */}
              {!displayText && !intermediateText && !isLoading && (
                <span className="text-gray-400 italic">Start speaking to see transcription...</span>
              )}
            </div>
          </section>
        </div>
      </div>

    </div>
  )
}

export default App
