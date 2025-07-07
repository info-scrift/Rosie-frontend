
import { useState, useRef, useCallback } from 'react';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ConversationContext {
  messages: ConversationMessage[];
  sessionId: string;
  isActive: boolean;
}

export const useConversationContext = () => {
  const [context, setContext] = useState<ConversationContext>({
    messages: [],
    sessionId: generateSessionId(),
    isActive: false
  });

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const message: ConversationMessage = {
      id: generateMessageId(),
      role,
      content,
      timestamp: new Date()
    };

    setContext(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      isActive: true
    }));

    return message;
  }, []);

  const startNewConversation = useCallback(() => {
    setContext({
      messages: [],
      sessionId: generateSessionId(),
      isActive: false
    });
  }, []);

  const getConversationHistory = useCallback(() => {
    return context.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  }, [context.messages]);

  const getLastUserMessage = useCallback(() => {
    const userMessages = context.messages.filter(msg => msg.role === 'user');
    return userMessages[userMessages.length - 1]?.content || '';
  }, [context.messages]);

  return {
    context,
    addMessage,
    startNewConversation,
    getConversationHistory,
    getLastUserMessage
  };
};

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
