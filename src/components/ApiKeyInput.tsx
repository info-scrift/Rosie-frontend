
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  isSet: boolean;
}

const ApiKeyInput = ({ onApiKeySet, isSet }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    
    setIsLoading(true);
    try {
      onApiKeySet(apiKey.trim());
    } finally {
      setIsLoading(false);
    }
  };

  if (isSet) {
    return (
      <Card className="max-w-md mx-auto mb-8 border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2 text-green-700">
            <Key className="w-5 h-5" />
            <span className="font-medium">ElevenLabs API Connected</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center space-x-2">
          <Key className="w-5 h-5" />
          <span>Enter ElevenLabs API Key</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={!apiKey.trim() || isLoading}>
            {isLoading ? 'Connecting...' : 'Connect Voice Assistant'}
          </Button>
        </form>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Get your free API key from{' '}
          <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            ElevenLabs.io
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
