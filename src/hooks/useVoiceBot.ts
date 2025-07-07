
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

export const useVoiceBot = () => {
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

  // Initialize from storage on mount
  useEffect(() => {
    console.log('useVoiceBot: Initializing BlueBridge-focused voice bot...');
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
    console.log('Handling voice response for:', transcript);
    
    try {
      setState(prev => ({ ...prev, isProcessing: true, speechProgress: 0, liveResponse: '' }));
      
      // Add user message to conversation context
      addMessage('user', transcript);
      
      // Get conversation history for context
      const conversationHistory = getConversationHistory();
      
      // Generate response with conversation context using curated knowledge base
      const responseText = await voiceService.generateContextualResponse(transcript, conversationHistory);
      
      // Add assistant response to conversation context
      addMessage('assistant', responseText);
      
      console.log('Generated response:', responseText);
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        isSpeaking: true, 
        response: responseText,
        conversationActive: true
      }));
      
      // Play the response with live transcription
      await voiceService.playResponse(
        responseText, 
        (progress) => {
          setState(prev => ({ ...prev, speechProgress: progress }));
        },
        (text) => {
          setState(prev => ({ ...prev, response: text }));
        },
        (word, index) => {
          setState(prev => {
            const words = responseText.split(' ');
            const liveText = words.slice(0, index + 1).join(' ');
            return { ...prev, liveResponse: liveText };
          });
        }
      );
      
      setState(prev => ({ ...prev, isSpeaking: false, speechProgress: 0 }));
      
    } catch (error) {
      console.error('Error processing voice response:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Error processing voice response',
        isProcessing: false,
        isSpeaking: false
      }));
    }
  }, [addMessage, getConversationHistory]);

  const initializeSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setState(prev => ({ ...prev, error: 'Speech recognition not supported in this browser' }));
      return null;
    }

    const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionConstructor() as SpeechRecognition;
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setState(prev => ({ ...prev, isListening: true, error: null }));
      currentTranscriptRef.current = '';
    };

    recognition.onresult = (event) => {
      console.log('Speech recognition result:', event);
      let transcript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          transcript += event.results[i][0].transcript;
        }
      }
      
      const fullTranscript = finalTranscript || transcript;
      console.log('Processed transcript:', fullTranscript);
      currentTranscriptRef.current = fullTranscript;
      setState(prev => ({ ...prev, transcript: fullTranscript }));
    };

    recognition.onend = async () => {
      console.log('Speech recognition ended');
      isListeningRef.current = false;
      setState(prev => ({ ...prev, isListening: false }));
      
      const finalTranscript = currentTranscriptRef.current.trim();
      console.log('Final transcript for processing:', finalTranscript);
      
      if (finalTranscript && finalTranscript.length > 2) {
        await handleVoiceResponse(finalTranscript);
      } else {
        console.log('No valid transcript captured');
        setState(prev => ({ ...prev, error: 'No clear speech detected. Please speak clearly and try again.' }));
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
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
  }, [handleVoiceResponse]);

  const startListening = useCallback(() => {
    console.log('Start listening called');
    
    if (isListeningRef.current) {
      console.log('Already listening, ignoring');
      return;
    }

    // Stop any current speech
    stopSpeaking();

    const recognition = initializeSpeechRecognition();
    if (recognition) {
      recognitionRef.current = recognition;
      isListeningRef.current = true;
      console.log('Starting speech recognition');
      recognition.start();
    }
  }, [initializeSpeechRecognition, stopSpeaking]);

  const stopListening = useCallback(() => {
    console.log('Stop listening called');
    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const playDemoCommand = useCallback(async (command: string) => {
    console.log('Playing demo command:', command);
    
    setState(prev => ({ ...prev, transcript: command }));
    await handleVoiceResponse(command);
  }, [handleVoiceResponse]);

  return {
    ...state,
    conversationContext: context,
    startListening,
    stopListening,
    playDemoCommand,
    clearError,
    setVolume,
    setMuted,
    stopSpeaking,
    startNewConversation: startNewConversationFlow
  };
};
