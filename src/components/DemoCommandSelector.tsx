
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, X, Sparkles } from 'lucide-react';

interface DemoCommand {
  text: string;
  category: string;
  description: string;
}

const demoCommands: DemoCommand[] = [
  {
    text: "Find me marketing jobs",
    category: "Job Search",
    description: "Search for marketing positions"
  },
  {
    text: "How do I upload my resume?",
    category: "Navigation",
    description: "Get help with resume upload"
  },
  {
    text: "What are salary ranges for data scientists?",
    category: "Career Advice",
    description: "Learn about salary expectations"
  },
  {
    text: "Help me improve my profile",
    category: "Profile Help",
    description: "Get profile optimization tips"
  },
  {
    text: "Tell me about BlueBridge",
    category: "Company Info",
    description: "Learn about our platform"
  }
];

interface DemoCommandSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (command: string) => void;
  disabled?: boolean;
}

const DemoCommandSelector = ({ isOpen, onClose, onSelectCommand, disabled }: DemoCommandSelectorProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <CardTitle>Try Demo Commands</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 text-center mb-6">
                  Choose a command to hear the AI assistant in action!
                </p>
                
                <div className="grid gap-3">
                  {demoCommands.map((command, index) => (
                    <motion.button
                      key={command.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        onSelectCommand(command.text);
                        onClose();
                      }}
                      disabled={disabled}
                      className="w-full p-4 text-left bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="secondary" className="text-xs">
                              {command.category}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                            "{command.text}"
                          </h3>
                          <p className="text-sm text-slate-500">
                            {command.description}
                          </p>
                        </div>
                        <Play className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity ml-3 flex-shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoCommandSelector;
