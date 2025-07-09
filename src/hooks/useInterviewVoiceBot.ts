
import { useState, useRef, useCallback, useEffect } from 'react';
import { voiceService } from '@/services/voiceService';
import { useConversationContext } from './useConversationContext';
import { storageService } from '@/services/storageService';

export interface VoiceBotState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  response: string;
  liveResponse: string;
  error: string | null;
  volume: number;
  isMuted: boolean;
  speechProgress: number;
  isProcessing: boolean;
  conversationActive: boolean;
}

export const useInterviewVoiceBot = () => {
  const { context, addMessage, startNewConversation, getConversationHistory } = useConversationContext();

  const [state, setState] = useState<VoiceBotState>({
    isListening: false,
    isSpeaking: false,
    transcript: '',
    response: '',
    liveResponse: '',
    error: null,
    volume: 1,
    isMuted: false,
    speechProgress: 0,
    isProcessing: false,
    conversationActive: false
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const currentTranscriptRef = useRef('');
  const manuallyStoppedRef = useRef(false);

  useEffect(() => {
    const preferences = storageService.getUserPreferences();
    setState(prev => ({
      ...prev,
      volume: preferences?.volume || 1,
      isMuted: preferences?.isMuted || false,
      conversationActive: context.isActive
    }));
  }, [context.isActive]);

  const setVolume = useCallback((volume: number) => {
    voiceService.setVolume(volume);
    setState(prev => ({ ...prev, volume }));
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    voiceService.setMuted(muted);
    setState(prev => ({ ...prev, isMuted: muted }));
  }, []);

  const stopSpeaking = useCallback(() => {
    voiceService.stopCurrentAudio();
    setState(prev => ({ ...prev, isSpeaking: false, speechProgress: 0 }));
  }, []);

  const startNewConversationFlow = useCallback(() => {
    startNewConversation();
    setState(prev => ({
      ...prev,
      transcript: '',
      response: '',
      liveResponse: '',
      error: null,
      speechProgress: 0,
      isProcessing: false,
      conversationActive: false
    }));
  }, [startNewConversation]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const handleVoiceResponse = useCallback(async (transcript: string) => {
    setState(prev => ({ ...prev, isProcessing: false }));
  }, []);

  const initializeSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setState(prev => ({ ...prev, error: 'Speech recognition not supported in this browser' }));
      return null;
    }

    const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionConstructor() as SpeechRecognition;

    recognition.continuous = true; // ✅ allow pauses
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      setState(prev => ({ ...prev, isListening: true, error: null }));
      currentTranscriptRef.current = '';
      manuallyStoppedRef.current = false;
    };

recognition.onresult = (event) => {
  let interimTranscript = '';
  let newFinalText = '';

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const result = event.results[i];
    const text = result[0].transcript;

    if (result.isFinal) {
      newFinalText += text + ' ';
      currentTranscriptRef.current += text + ' ';
    } else {
      interimTranscript += text;
    }
  }

  const combined = (currentTranscriptRef.current + interimTranscript).trim();

  setState(prev => ({
    ...prev,
    transcript: combined
  }));
};




    recognition.onend = async () => {
      isListeningRef.current = false;
      setState(prev => ({ ...prev, isListening: false }));

      if (!manuallyStoppedRef.current) {
        recognition.start(); // auto-restart
      }
    };

    recognition.onerror = (event) => {
      let errorMessage = 'Speech recognition error. Please try again.';

      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please speak clearly.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone found. Please check your audio settings.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please allow microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your connection.';
          break;
      }

      setState(prev => ({
        ...prev,
        isListening: false,
        error: errorMessage
      }));
    };

    return recognition;
  }, []);

  const startListening = useCallback(() => {
    if (isListeningRef.current) return;

    stopSpeaking();

    const recognition = initializeSpeechRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
      isListeningRef.current = true;
      recognition.start();
    }
  }, [initializeSpeechRecognition, stopSpeaking]);

  const stopListening = useCallback(() => {
    manuallyStoppedRef.current = true;
    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const playDemoCommand = useCallback(async (command: string) => {
    setState(prev => ({ ...prev, transcript: command }));
    await handleVoiceResponse(command);
  }, [handleVoiceResponse]);

  const clearTranscript = () => {
  currentTranscriptRef.current = '';
  setState(prev => ({ ...prev, transcript: '' }));
};

  return {
    ...state,
    conversationContext: context,
    startListening,
    clearTranscript,
    stopListening,
    playDemoCommand,
    clearError,
    setVolume,
    setMuted,
    stopSpeaking,
    startNewConversation: startNewConversationFlow
  };
};
