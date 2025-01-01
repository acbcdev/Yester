'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { generatePassword, calculatePasswordStrength } from '@/lib/utils/password';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@uidotdev/usehooks';
interface PasswordGeneratorProps {
  onPasswordGenerated: (password: string) => void;
}

export function PasswordGenerator({ onPasswordGenerated }: PasswordGeneratorProps) {
  const { toast } = useToast();
  const [options, setOptions] = useState({
    mode: 'words' as 'characters' | 'words',
    length: 16,
    separator: '-',
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true,
    wordCount: 5,
    capitalizeWords: true,
  });
  const debounceValues = useDebounce(options, 200);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [strength, setStrength] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleGenerate();
  }, [debounceValues]);

  const handleGenerate = () => {
    const password = generatePassword(options);
    setGeneratedPassword(password);
    setStrength(calculatePasswordStrength(password));
    onPasswordGenerated(password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast({
      title: 'Copiado',
      description: 'Contraseña copiada al portapapeles',
    });
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'bg-green-500';
    if (strength >= 60) return 'bg-yellow-500';
    if (strength >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <Tabs
        value={options.mode}
        onValueChange={(value) =>
          setOptions((prev) => ({ ...prev, mode: value as 'characters' | 'words' }))
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="words">Palabras</TabsTrigger>
          <TabsTrigger value="characters">Caracteres</TabsTrigger>
        </TabsList>
        <TabsContent value="words" className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="wordCount">Número de palabras</Label>
            </div>
            <Input
              id="wordCount"
              type="number"
              min={1}
              max={10}
              value={options.wordCount}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);
                if (!Number.isNaN(value) && value > 0 && value <= 10) {
                  setOptions(prev => ({ ...prev, wordCount: value }));
                }
              }}
              placeholder="Número de palabras (1-10)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="separator">Separador</Label>
            <Input

              value={options.separator}
              onChange={(e) => {
                const value = e.target.value.trim();
                setOptions(prev => ({ ...prev, separator: value }));
              }}
              placeholder="Ingresa un separador (ej: -, _, @, #) default -"
              maxLength={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="capitalize">Capitalizar palabras</Label>
              <Switch
                id="capitalize"
                checked={options.capitalizeWords}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, capitalizeWords: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="word-numbers">Incluir números entre palabras</Label>
              <Switch
                id="word-numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, includeNumbers: checked }))
                }
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="characters" className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="length">Longitud</Label>
            </div>
            <Input
              id="length"
              type="number"
              min={8}
              max={128}
              value={options.length}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value);
                if (!(value) && value >= 8 && value <= 128) {
                  setOptions(prev => ({ ...prev, length: value }));
                }
              }}
              placeholder="Longitud de la contraseña (8-128)"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase">Minúsculas (a-z)</Label>
              <Switch
                id="lowercase"
                checked={options.includeLowercase}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, includeLowercase: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase">Mayúsculas (A-Z)</Label>
              <Switch
                id="uppercase"
                checked={options.includeUppercase}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, includeUppercase: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numbers">Números (0-9)</Label>
              <Switch
                id="numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, includeNumbers: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols">Símbolos (!@#$%^&*)</Label>
              <Switch
                id="symbols"
                checked={options.includeSymbols}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, includeSymbols: checked }))
                }
              />
            </div>
          </div>
        </TabsContent>


      </Tabs>

      <div className="space-y-2">
        <Label>Contraseña Generada</Label>
        <div className="flex gap-2">
          <Input
            value={generatedPassword}
            readOnly
            type="text"
            className="font-mono"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            disabled={!generatedPassword}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleGenerate}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        {generatedPassword && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Fortaleza</span>
              <span>{strength}%</span>
            </div>
            <Progress
              value={strength}
              className={getStrengthColor(strength)}
            />
          </div>
        )}
      </div>
    </div>
  );
}