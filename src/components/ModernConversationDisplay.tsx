
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User, Bot, Square, Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModernConversationDisplayProps {
  transcript: string;
  response: string;
  liveResponse: string;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  speechProgress: number;
  onStopSpeaking?: () => void;
}

const ModernConversationDisplay = ({ 
  transcript, 
  response, 
  liveResponse,
  isListening, 
  isSpeaking, 
  isProcessing,
  speechProgress,
  onStopSpeaking
}: ModernConversationDisplayProps) => {
  const showTranscript = transcript && !isListening;
  const showResponse = response || liveResponse;

  if (!showTranscript && !showResponse && !isListening && !isSpeaking && !isProcessing) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-12"
    >
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="absolute -inset-2 bg-blue-400 rounded-full opacity-30"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Listening...</h3>
                    <p className="text-blue-600 text-sm">Speak clearly and I'll help you</p>
                  </div>
                </motion.div>
              )}

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100"
                >
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <motion.div
                      className="w-6 h-6 bg-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-1">Processing...</h3>
                    <p className="text-yellow-600 text-sm">Analyzing your request</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {showTranscript && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-slate-200"
              >
                <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-semibold text-slate-900">You asked:</h4>
                  </div>
                  <p className="text-slate-800 text-lg font-medium leading-relaxed">
                    "{transcript}"
                  </p>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 relative">
                    <Volume2 className="w-6 h-6 text-white" />
                    <motion.div
                      className="absolute -inset-1 bg-green-400 rounded-full opacity-30"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-green-900">AI Assistant is speaking...</h4>
                      {onStopSpeaking && (
                        <Button
                          onClick={onStopSpeaking}
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 bg-white/80 hover:bg-white border-green-300 text-green-700 hover:text-green-800"
                        >
                          <Square className="w-3 h-3 mr-1" />
                          Stop
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <Progress 
                        value={speechProgress * 100} 
                        className="w-full h-2 bg-green-100"
                      />
                      <div className="flex items-center justify-between text-xs text-green-600">
                        <span>{Math.round(speechProgress * 100)}% complete</span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span>Live</span>
                        </span>
                      </div>
                    </div>
                    
                    {liveResponse && (
                      <div className="bg-white/70 rounded-xl p-4 border border-green-100">
                        <motion.p 
                          className="text-slate-800 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {liveResponse}
                          <motion.span
                            className="inline-block w-1 h-5 bg-green-500 ml-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </motion.p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {showResponse && !isSpeaking && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-200"
                >
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-semibold text-primary-900">AI Assistant:</h4>
                    </div>
                    <p className="text-slate-800 leading-relaxed">
                      {response}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModernConversationDisplay;
