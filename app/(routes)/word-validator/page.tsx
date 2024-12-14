'use client';

import { WordValidator } from '@/components/word-validator/word-validator';

export default function WordValidatorPage() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Validador de Palabras</h2>
          <p className="text-muted-foreground">
            Valida secuencias de palabras con criterios específicos
          </p>
        </div>
      </div>
      <WordValidator />
    </div>
  );
}