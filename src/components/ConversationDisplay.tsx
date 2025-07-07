
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User, Bot, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationDisplayProps {
  transcript: string;
  response: string;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  speechProgress: number;
  onStopSpeaking?: () => void;
}

const ConversationDisplay = ({ 
  transcript, 
  response, 
  isListening, 
  isSpeaking, 
  isProcessing,
  speechProgress,
  onStopSpeaking
}: ConversationDisplayProps) => {
  const showTranscript = transcript && !isListening;
  const showResponse = response;

  if (!showTranscript && !showResponse && !isListening && !isSpeaking && !isProcessing) {
    return null;
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardContent className="p-6 space-y-4">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-3 text-blue-600"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
              </div>
              <span className="font-medium">Listening...</span>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-3 text-yellow-600"
            >
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse" />
              </div>
              <span className="font-medium">Processing your request...</span>
            </motion.div>
          )}

          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3"
            >
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500 mb-1">You said:</p>
                <p className="text-slate-900 font-medium">"{transcript}"</p>
              </div>
            </motion.div>
          )}

          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3 text-green-600"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Speaking...</span>
                  {onStopSpeaking && (
                    <Button
                      onClick={onStopSpeaking}
                      variant="outline"
                      size="sm"
                      className="h-6 px-2"
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                  )}
                </div>
                <Progress value={speechProgress * 100} className="w-full h-2" />
                <p className="text-xs text-slate-500">{Math.round(speechProgress * 100)}% complete</p>
              </div>
            </motion.div>
          )}

          {showResponse && !isSpeaking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500 mb-1">AI Assistant:</p>
                <p className="text-slate-900">{response}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ConversationDisplay;
