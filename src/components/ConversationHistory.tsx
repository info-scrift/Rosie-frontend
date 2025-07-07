
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Bot, MessageCircle, Trash2, Download } from 'lucide-react';
import { ConversationContext } from '@/hooks/useConversationContext';

interface ConversationHistoryProps {
  context: ConversationContext;
  onStartNewConversation: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const ConversationHistory = ({ 
  context, 
  onStartNewConversation, 
  isVisible, 
  onToggleVisibility 
}: ConversationHistoryProps) => {
  const exportConversation = () => {
    const conversationText = context.messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation_${context.sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <Button
          onClick={onToggleVisibility}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Show History ({context.messages.length})
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 w-80"
    >
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 max-h-[70vh]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
              Conversation
            </CardTitle>
            <Button
              onClick={onToggleVisibility}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {context.messages.length} messages
            </Badge>
            <div className="flex space-x-1">
              {context.messages.length > 0 && (
                <Button
                  onClick={exportConversation}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                >
                  <Download className="w-3 h-3" />
                </Button>
              )}
              <Button
                onClick={onStartNewConversation}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[50vh] px-4 pb-4">
            <AnimatePresence>
              {context.messages.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversation yet</p>
                  <p className="text-xs">Start talking to begin!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {context.messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start space-x-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-3 h-3 text-blue-600" />
                        </div>
                      )}
                      <div className={`max-w-[80%] ${
                        message.role === 'user' ? 'order-first' : ''
                      }`}>
                        <div className={`p-3 rounded-lg text-sm ${
                          message.role === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-100 text-slate-900'
                        }`}>
                          {message.content}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-slate-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConversationHistory;
