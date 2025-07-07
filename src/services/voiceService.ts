
import { knowledgeBaseService } from './knowledgeBase';
import { storageService } from './storageService';

export interface VoiceResponse {
  question: string;
  response: string;
  category: 'job-search' | 'navigation' | 'career-advice' | 'application-help' | 'company-info' | 'platform-help';
}

export class VoiceService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private volume: number = 1;
  private isMuted: boolean = false;

  constructor() {
    this.initializeFromStorage();
    this.initializeSpeechSynthesis();
  }

  private initializeFromStorage() {
    const preferences = storageService.getUserPreferences();
    if (preferences) {
      this.volume = preferences.volume;
      this.isMuted = preferences.isMuted;
    }
    console.log('VoiceService initialized with curated knowledge base');
  }

  private initializeSpeechSynthesis() {
    // Ensure speech synthesis is ready
    if ('speechSynthesis' in window) {
      // Load voices
      speechSynthesis.getVoices();
      
      // Handle voice changes
      speechSynthesis.onvoiceschanged = () => {
        console.log('Speech synthesis voices loaded:', speechSynthesis.getVoices().length);
      };
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.isMuted ? 0 : this.volume;
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    this.savePreferences();
    if (this.currentUtterance) {
      this.currentUtterance.volume = muted ? 0 : this.volume;
    }
  }

  private savePreferences() {
    storageService.setUserPreferences({
      volume: this.volume,
      isMuted: this.isMuted,
      autoStartConversation: false
    });
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  getVolume(): number {
    return this.volume;
  }

  stopCurrentAudio() {
    if (this.currentUtterance || this.isPlaying) {
      speechSynthesis.cancel();
      this.currentUtterance = null;
      this.isPlaying = false;
      console.log('Speech synthesis stopped');
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  async generateContextualResponse(query: string, conversationHistory?: string): Promise<string> {
    console.log('Generating curated response for:', query);
    console.log('With conversation history:', conversationHistory);

    // Use only the curated knowledge base for responses
    const bestMatch = knowledgeBaseService.findBestMatch(query, conversationHistory);
    
    if (bestMatch) {
      console.log('Found knowledge base match:', bestMatch.category);
      
      // Personalize the response for BlueBridge
      let response = bestMatch.answer;
      
      // Add contextual follow-ups if available
      if (bestMatch.followUps && bestMatch.followUps.length > 0) {
        response += "\n\nWould you like me to elaborate on any of these topics: " + 
                   bestMatch.followUps.join(', ') + "?";
      }
      
      return response;
    }

    // Fallback response for queries not in knowledge base
    return "I specialize in helping with career advice, job searching, resume optimization, and BlueBridge platform features. Could you please rephrase your question to focus on one of these areas? For example, you could ask about finding jobs, improving your profile, interview preparation, or salary negotiation.";
  }

  async playResponse(text: string, onProgress?: (progress: number) => void, onTextUpdate?: (text: string) => void, onWordUpdate?: (word: string, index: number) => void): Promise<void> {
    try {
      this.stopCurrentAudio();
      
      console.log('Starting to play curated response:', text.substring(0, 100) + '...');
      console.log('Speech synthesis available:', 'speechSynthesis' in window);
      console.log('Current volume:', this.volume, 'Muted:', this.isMuted);
      
      // Show text immediately when starting to speak
      if (onTextUpdate) {
        onTextUpdate(text);
      }

      // Check if Web Speech API is available
      if (!('speechSynthesis' in window)) {
        console.error('Speech synthesis not supported');
        throw new Error('Speech synthesis not supported in this browser');
      }

      // Check if speech synthesis is enabled
      if (speechSynthesis.speaking) {
        console.log('Speech synthesis is currently speaking, cancelling...');
        speechSynthesis.cancel();
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Wait for voices to be loaded
      await this.waitForVoices();

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;
      
      // Configure utterance
      utterance.volume = this.isMuted ? 0 : this.volume;
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      // Find and set a suitable voice
      const voices = speechSynthesis.getVoices();
      console.log('Available voices:', voices.length);
      
      if (voices.length > 0) {
        const preferredVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Natural'))
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
          console.log('Using voice:', preferredVoice.name, 'Language:', preferredVoice.lang);
        }
      }

      this.isPlaying = true;

      // Simulate word-by-word updates for visual feedback
      if (onWordUpdate) {
        const words = text.split(' ');
        const estimatedDuration = this.calculateSpeechDuration(text);
        const wordDuration = estimatedDuration / words.length;
        
        words.forEach((word, index) => {
          setTimeout(() => {
            if (this.isPlaying && this.currentUtterance === utterance) {
              onWordUpdate(word, index);
            }
          }, index * wordDuration);
        });
      }

      return new Promise((resolve, reject) => {
        utterance.onstart = () => {
          console.log('Speech synthesis started successfully');
          this.isPlaying = true;
        };

        utterance.onend = () => {
          console.log('Speech synthesis ended');
          this.isPlaying = false;
          this.currentUtterance = null;
          resolve();
        };

        utterance.onerror = (error) => {
          console.error('Speech synthesis error:', error);
          this.isPlaying = false;
          this.currentUtterance = null;
          reject(new Error(`Speech synthesis failed: ${error.error}`));
        };

        // Track progress
        if (onProgress) {
          const startTime = Date.now();
          const estimatedDuration = this.calculateSpeechDuration(text);
          
          const progressInterval = setInterval(() => {
            if (!this.isPlaying || this.currentUtterance !== utterance) {
              clearInterval(progressInterval);
              return;
            }
            
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / estimatedDuration, 0.95);
            onProgress(progress);
          }, 100);

          utterance.onend = () => {
            clearInterval(progressInterval);
            if (onProgress) onProgress(1);
            this.isPlaying = false;
            this.currentUtterance = null;
            resolve();
          };

          utterance.onerror = (error) => {
            clearInterval(progressInterval);
            console.error('Speech synthesis error:', error);
            this.isPlaying = false;
            this.currentUtterance = null;
            reject(new Error(`Speech synthesis failed: ${error.error}`));
          };
        }

        // Start speech synthesis
        console.log('Starting speech synthesis with text length:', text.length);
        console.log('Speech synthesis speaking:', speechSynthesis.speaking);
        console.log('Speech synthesis pending:', speechSynthesis.pending);
        console.log('Speech synthesis paused:', speechSynthesis.paused);
        
        try {
          // For some browsers, we need to trigger speech synthesis in response to user interaction
          if (speechSynthesis.paused) {
            speechSynthesis.resume();
          }
          
          speechSynthesis.speak(utterance);
          console.log('Speech synthesis speak() called successfully');
          
          // Small delay to ensure speech starts
          setTimeout(() => {
            console.log('After delay - speaking:', speechSynthesis.speaking, 'pending:', speechSynthesis.pending);
          }, 100);
          
        } catch (error) {
          console.error('Error starting speech synthesis:', error);
          this.isPlaying = false;
          this.currentUtterance = null;
          reject(error);
        }
        
        // Fallback timeout to prevent hanging
        const timeoutDuration = Math.max(30000, this.calculateSpeechDuration(text) + 5000);
        setTimeout(() => {
          if (this.isPlaying && utterance === this.currentUtterance) {
            console.warn('Speech synthesis timeout, forcing completion');
            this.stopCurrentAudio();
            resolve();
          }
        }, timeoutDuration);
      });
    } catch (error) {
      this.isPlaying = false;
      this.currentUtterance = null;
      console.error('Error playing voice response:', error);
      throw error;
    }
  }

  private async waitForVoices(): Promise<void> {
    return new Promise((resolve) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve();
        return;
      }

      const timeoutId = setTimeout(() => {
        console.warn('Voice loading timeout, proceeding anyway');
        resolve();
      }, 3000);

      speechSynthesis.onvoiceschanged = () => {
        clearTimeout(timeoutId);
        console.log('Voices loaded:', speechSynthesis.getVoices().length);
        resolve();
      };
    });
  }

  private calculateSpeechDuration(text: string): number {
    // Estimate based on average speaking rate (150-160 words per minute)
    const wordsPerMinute = 155;
    const words = text.split(' ').length;
    return (words / wordsPerMinute) * 60 * 1000; // Convert to milliseconds
  }
}

export const voiceService = new VoiceService();
