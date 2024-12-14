'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ValidationResult {
  isValid: boolean;
  message: string;
  result?: string;
}

export function WordValidator() {
  const [input, setInput] = useState('');
  const [wordCount, setWordCount] = useState('3');
  const [separator, setSeparator] = useState(' ');
  const [minLength, setMinLength] = useState('3');
  const [maxLength, setMaxLength] = useState('10');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const validateWords = () => {
    // Split input by the selected separator
    const words = input.split(separator);
    const requiredCount = parseInt(wordCount);
    const min = parseInt(minLength);
    const max = parseInt(maxLength);

    // Validate word count
    if (words.length !== requiredCount) {
      setValidationResult({
        isValid: false,
        message: `Se requieren exactamente ${requiredCount} palabras. Has ingresado ${words.length}.`,
      });
      return;
    }

    // Validate each word length
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length < min || word.length > max) {
        setValidationResult({
          isValid: false,
          message: `La palabra "${word}" debe tener entre ${min} y ${max} caracteres.`,
        });
        return;
      }
    }

    // All validations passed
    setValidationResult({
      isValid: true,
      message: '¡Validación exitosa!',
      result: words.join(separator),
    });
  };

  const separators = [
    { value: ' ', label: 'Espacio' },
    { value: ',', label: 'Coma' },
    { value: '-', label: 'Guión' },
    { value: '_', label: 'Guión bajo' },
  ];

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Validador de Palabras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wordCount">Número de Palabras</Label>
            <Input
              id="wordCount"
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              min="1"
              max="10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="separator">Separador</Label>
            <Select
              value={separator}
              onValueChange={setSeparator}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {separators.map((sep) => (
                  <SelectItem key={sep.value} value={sep.value}>
                    {sep.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minLength">Longitud Mínima</Label>
            <Input
              id="minLength"
              type="number"
              value={minLength}
              onChange={(e) => setMinLength(e.target.value)}
              min="1"
              max="20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxLength">Longitud Máxima</Label>
            <Input
              id="maxLength"
              type="number"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
              min="1"
              max="20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="words">Palabras</Label>
          <Input
            id="words"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ingresa ${wordCount} palabras separadas por ${
              separators.find((s) => s.value === separator)?.label.toLowerCase()
            }`}
          />
        </div>

        <Button onClick={validateWords} className="w-full">
          Validar
        </Button>

        {validationResult && (
          <Alert variant={validationResult.isValid ? "default" : "destructive"}>
            <AlertDescription>
              {validationResult.message}
              {validationResult.result && (
                <div className="mt-2 font-mono bg-muted p-2 rounded">
                  {validationResult.result}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}