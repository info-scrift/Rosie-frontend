
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Search, Navigation, HelpCircle, Sparkles, AlertCircle, Square, Zap, Headphones, RotateCcw, History, Briefcase, Users, TrendingUp, FileText } from "lucide-react";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { useVoiceBot } from "@/hooks/useVoiceBot";
import ModernConversationDisplay from "@/components/ModernConversationDisplay";
import DemoCommandSelector from "@/components/DemoCommandSelector";
import ConversationHistory from "@/components/ConversationHistory";

const VoiceBot = () => {
  const [showDemoSelector, setShowDemoSelector] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const voiceBot = useVoiceBot();

  const features = [
    {
      icon: Briefcase,
      title: "Smart Job Search",
      description: "Find the perfect career opportunities with AI-powered job matching",
      command: "\"Find me software engineering jobs in my area\"",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileText,
      title: "Resume Optimization", 
      description: "Get personalized feedback to improve your resume and stand out",
      command: "\"How can I improve my resume for tech roles?\"",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Interview Preparation",
      description: "Master your interviews with tailored practice and expert tips",
      command: "\"Help me prepare for a software engineer interview\"",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Career Development",
      description: "Get strategic advice to advance your career and increase earnings",
      command: "\"What skills should I develop to advance my career?\"",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const handleVoiceToggle = () => {
    if (voiceBot.isListening) {
      voiceBot.stopListening();
    } else {
      voiceBot.startListening();
    }
  };

  const handleDemoCommand = (command: string) => {
    voiceBot.playDemoCommand(command);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Conversation History */}
      <ConversationHistory
        context={voiceBot.conversationContext}
        onStartNewConversation={voiceBot.startNewConversation}
        isVisible={showHistory}
        onToggleVisibility={() => setShowHistory(!showHistory)}
      />

      {/* Enhanced Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="bg-white/80 text-slate-700 px-4 py-2 text-sm font-semibold">
                BlueBridge Career Assistant
              </Badge>
              {voiceBot.conversationActive && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1 text-sm">
                  Conversation Active
                </Badge>
              )}
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent" 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
            >
              AI Career Assistant
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Experience intelligent career guidance with our AI-powered voice assistant. 
              Get personalized job recommendations, resume optimization, interview preparation, and strategic career advice through natural conversation.
            </motion.p>
          </div>

          {/* Error Display */}
          {voiceBot.error && (
            <Alert className="max-w-2xl mx-auto mb-8 border-red-200 bg-red-50/80 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-700">
                {voiceBot.error}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={voiceBot.clearError}
                  className="ml-2 h-auto p-1 text-red-600 hover:text-red-800"
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Modern Voice Interface */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-12 text-center">
                  <div className="relative mb-12">
                    <motion.div 
                      className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center relative shadow-2xl ${
                        voiceBot.isListening ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                        voiceBot.isSpeaking ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        voiceBot.isProcessing ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                        'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`} 
                      animate={voiceBot.isListening ? { scale: [1, 1.05, 1] } : {}} 
                      transition={{ duration: 2, repeat: voiceBot.isListening ? Infinity : 0 }}
                    >
                      {/* Animated rings */}
                      {(voiceBot.isListening || voiceBot.isSpeaking || voiceBot.isProcessing) && (
                        <>
                          <motion.div 
                            className="absolute inset-0 rounded-full border-4 border-white/40" 
                            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }} 
                            transition={{ duration: 2, repeat: Infinity }} 
                          />
                          <motion.div 
                            className="absolute inset-0 rounded-full border-4 border-white/20" 
                            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} 
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} 
                          />
                        </>
                      )}
                      
                      <motion.button 
                        onClick={handleVoiceToggle} 
                        className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-xl hover:bg-white/30 transition-all duration-300" 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        {voiceBot.isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                      </motion.button>
                    </motion.div>
                    
                    {/* Live audio visualization */}
                    {voiceBot.isListening && (
                      <motion.div 
                        className="flex items-center justify-center space-x-2 mt-8" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                      >
                        {[...Array(7)].map((_, i) => (
                          <motion.div 
                            key={i} 
                            className="w-1.5 bg-gradient-to-t from-blue-400 to-purple-500 rounded-full" 
                            animate={{ height: [12, 32, 12] }} 
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }} 
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-3xl font-bold text-slate-900">
                      {voiceBot.isSpeaking ? "🎤 Speaking..." : 
                       voiceBot.isProcessing ? "🧠 Processing..." :
                       voiceBot.isListening ? "👂 Listening..." : 
                       voiceBot.conversationActive ? "💬 Ready to Continue" : "🎯 Ready to Help"}
                    </h3>
                    
                    <p className="text-slate-600 text-lg leading-relaxed max-w-lg mx-auto">
                      {voiceBot.isSpeaking ? "I'm providing you with personalized career guidance..." : 
                       voiceBot.isProcessing ? "Analyzing your request and preparing personalized advice..." :
                       voiceBot.isListening ? "I'm listening for your career question. Ask about jobs, resumes, interviews, or career advice!" : 
                       voiceBot.conversationActive ? "Our conversation is active! Continue with more career questions." :
                       "Ask me about job searching, resume optimization, interview preparation, salary negotiation, or career development"}
                    </p>
                  </div>

                  {/* Enhanced Controls */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => voiceBot.setMuted(!voiceBot.isMuted)} 
                        className="border-slate-300 text-neutral-950 bg-blue-50/80 hover:bg-blue-100/80 backdrop-blur-sm shadow-lg"
                      >
                        {voiceBot.isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                      
                      <Button 
                        onClick={() => setShowHistory(!showHistory)}
                        variant="outline"
                        className="border-slate-300 text-neutral-950 bg-blue-50/80 hover:bg-blue-100/80 backdrop-blur-sm shadow-lg"
                      >
                        <History className="w-5 h-5 mr-2" />
                        History ({voiceBot.conversationContext.messages.length})
                      </Button>
                      
                      {voiceBot.conversationActive && (
                        <Button 
                          onClick={voiceBot.startNewConversation}
                          variant="outline"
                          className="border-orange-300 text-orange-600 bg-orange-50/80 hover:bg-orange-100/80 backdrop-blur-sm shadow-lg"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          New Conversation
                        </Button>
                      )}
                      
                      {voiceBot.isSpeaking && (
                        <Button 
                          onClick={voiceBot.stopSpeaking}
                          variant="outline"
                          className="border-red-300 text-red-600 bg-red-50/80 hover:bg-red-100/80 backdrop-blur-sm shadow-lg"
                        >
                          <Square className="w-4 h-4 mr-2" />
                          Stop Speaking
                        </Button>
                      )}
                      
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 px-6"
                        onClick={() => setShowDemoSelector(true)}
                        disabled={voiceBot.isSpeaking}
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Try Demo Commands
                      </Button>
                    </div>

                    {/* Enhanced Volume Control */}
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span className="flex items-center space-x-2">
                          <Volume2 className="w-4 h-4" />
                          <span>Volume</span>
                        </span>
                        <span className="font-semibold">{Math.round(voiceBot.volume * 100)}%</span>
                      </div>
                      <Slider
                        value={[voiceBot.volume]}
                        onValueChange={(value) => voiceBot.setVolume(value[0])}
                        max={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Modern Conversation Display */}
          <ModernConversationDisplay 
            transcript={voiceBot.transcript}
            response={voiceBot.response}
            liveResponse={voiceBot.liveResponse}
            isListening={voiceBot.isListening}
            isSpeaking={voiceBot.isSpeaking}
            isProcessing={voiceBot.isProcessing}
            speechProgress={voiceBot.speechProgress}
            onStopSpeaking={voiceBot.stopSpeaking}
          />
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Powered by BlueBridge AI
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                How Can I Help Your Career?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                From job searching to career advancement, I provide expert guidance tailored to your goals
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <Badge variant="secondary" className="font-mono text-xs bg-slate-100 text-slate-700 px-3 py-1">
                        {feature.command}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Command Selector */}
      <DemoCommandSelector
        isOpen={showDemoSelector}
        onClose={() => setShowDemoSelector(false)}
        onSelectCommand={handleDemoCommand}
        disabled={voiceBot.isSpeaking}
      />
    </div>
  );
};

export default VoiceBot;
