
const STORAGE_KEYS = {
  API_KEY: 'bluebridge_elevenlabs_api_key',
  CONVERSATION_STATE: 'bluebridge_conversation_state',
  USER_PREFERENCES: 'bluebridge_user_preferences'
};

export interface UserPreferences {
  volume: number;
  isMuted: boolean;
  voiceId?: string;
  autoStartConversation: boolean;
}

export class StorageService {
  // API Key Management
  setApiKey(apiKey: string): void {
    try {
      const encrypted = this.simpleEncrypt(apiKey);
      localStorage.setItem(STORAGE_KEYS.API_KEY, encrypted);
      console.log('API key stored successfully');
    } catch (error) {
      console.error('Failed to store API key:', error);
    }
  }

  getApiKey(): string | null {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEYS.API_KEY);
      if (!encrypted) {
        console.log('No API key found in storage');
        return null;
      }
      const decrypted = this.simpleDecrypt(encrypted);
      console.log('API key retrieved from storage');
      return decrypted;
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;
    }
  }

  removeApiKey(): void {
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
    console.log('API key removed from storage');
  }

  // User Preferences
  setUserPreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to store user preferences:', error);
    }
  }

  getUserPreferences(): UserPreferences | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to retrieve user preferences:', error);
      return null;
    }
  }

  // Simple encryption/decryption (for basic obfuscation)
  private simpleEncrypt(text: string): string {
    return btoa(text.split('').reverse().join(''));
  }

  private simpleDecrypt(encrypted: string): string {
    return atob(encrypted).split('').reverse().join('');
  }

  // Conversation State (for future persistence if needed)
  setConversationState(state: any): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATION_STATE, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to store conversation state:', error);
    }
  }

  getConversationState(): any | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATION_STATE);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to retrieve conversation state:', error);
      return null;
    }
  }

  clearConversationState(): void {
    localStorage.removeItem(STORAGE_KEYS.CONVERSATION_STATE);
  }

  // Utility methods
  clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  hasStoredApiKey(): boolean {
    const apiKey = this.getApiKey();
    const hasKey = !!apiKey;
    console.log('Checking for stored API key:', hasKey);
    return hasKey;
  }
}

export const storageService = new StorageService();
