import { useState, useRef, useCallback } from "react";

export const useInterviewVoiceBot = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fullTranscriptRef = useRef(""); // ✅ holds final transcript
  const manuallyStoppedRef = useRef(false);

  const initializeRecognition = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          fullTranscriptRef.current += text + " ";
        } else {
          interim += text;
        }
      }

      const combined = (fullTranscriptRef.current + interim).trim();
      setTranscript(combined);
    };

    recognition.onend = () => {
      setIsListening(false);

      if (!manuallyStoppedRef.current) {
        recognition.start();
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      let message = "Speech recognition error";
      if (event.error === "not-allowed") message = "Microphone access denied.";
      if (event.error === "no-speech") message = "No speech detected.";
      if (event.error === "audio-capture") message = "No microphone found.";
      setError(message);
    };

    return recognition;
  }, []);

  const startListening = useCallback(() => {
    if (isListening) return;

    const recognition = initializeRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
      manuallyStoppedRef.current = false;
      fullTranscriptRef.current = ""; 
      setTranscript(""); 
      recognition.start();
    }
  }, [initializeRecognition, isListening]);

  const stopListening = useCallback(() => {
    manuallyStoppedRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const clearTranscript = useCallback(() => {
    fullTranscriptRef.current = "";
    setTranscript("");
  }, []);

  return {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    clearTranscript,
  };
};

