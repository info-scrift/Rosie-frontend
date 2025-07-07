
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Mic, MicOff, Volume2, VolumeX, X, Square, Play } from 'lucide-react';
import { useVoiceBot } from '@/hooks/useVoiceBot';

const GlobalVoiceBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const voiceBot = useVoiceBot();

  const handleVoiceToggle = () => {
    if (voiceBot.isListening) {
      voiceBot.stopListening();
    } else {
      voiceBot.startListening();
    }
  };

  const quickCommands = [
    "Find me jobs",
    "Upload resume help",
    "Salary information",
    "Profile improvement"
  ];

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 shadow-lg"
        >
          <Mic className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 w-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-2xl border-primary-200">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-primary-600" />
            </div>
            <span className="font-semibold text-sm">Voice Assistant</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Voice Controls */}
          <div className="flex items-center justify-center space-x-2">
            <Button
              onClick={handleVoiceToggle}
              className={`w-12 h-12 rounded-full ${
                voiceBot.isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-600 hover:bg-primary-700'
              }`}
            >
              {voiceBot.isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            {voiceBot.isSpeaking && (
              <Button
                onClick={voiceBot.stopSpeaking}
                variant="outline"
                size="sm"
                className="h-8"
              >
                <Square className="w-3 h-3 mr-1" />
                Stop
              </Button>
            )}

            <Button
              onClick={() => voiceBot.setMuted(!voiceBot.isMuted)}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {voiceBot.isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Volume</span>
              <span>{Math.round(voiceBot.volume * 100)}%</span>
            </div>
            <Slider
              value={[voiceBot.volume]}
              onValueChange={(value) => voiceBot.setVolume(value[0])}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Status */}
          <div className="text-center">
            {voiceBot.isListening && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Listening...
              </Badge>
            )}
            {voiceBot.isSpeaking && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Speaking... {Math.round(voiceBot.speechProgress * 100)}%
              </Badge>
            )}
            {voiceBot.isProcessing && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                Processing...
              </Badge>
            )}
          </div>

          {/* Transcript & Response */}
          <AnimatePresence>
            {voiceBot.transcript && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-50 rounded-lg p-3"
              >
                <p className="text-xs text-slate-500 mb-1">You said:</p>
                <p className="text-sm text-slate-900">"{voiceBot.transcript}"</p>
              </motion.div>
            )}

            {voiceBot.response && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-primary-50 rounded-lg p-3"
              >
                <p className="text-xs text-primary-600 mb-1">Assistant:</p>
                <p className="text-sm text-slate-900">{voiceBot.response}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Commands */}
          <div className="space-y-2">
            <p className="text-xs text-slate-600">Try these commands:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickCommands.map((command) => (
                <Button
                  key={command}
                  variant="outline"
                  size="sm"
                  onClick={() => voiceBot.playDemoCommand(command)}
                  disabled={voiceBot.isSpeaking}
                  className="text-xs h-8 px-2"
                >
                  <Play className="w-3 h-3 mr-1" />
                  {command}
                </Button>
              ))}
            </div>
          </div>

          {/* Error Display */}
          {voiceBot.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-700">{voiceBot.error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={voiceBot.clearError}
                className="mt-1 h-6 text-xs"
              >
                Dismiss
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GlobalVoiceBot;
