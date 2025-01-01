const CHARS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

const COMMON_WORDS = [
  'casa', 'tiempo', 'vida', 'día', 'año', 'trabajo', 'mundo', 'forma', 'parte', 'cosa',
  'hombre', 'mujer', 'lugar', 'momento', 'pueblo', 'familia', 'ciudad', 'historia', 'idea',
  'agua', 'tierra', 'mano', 'orden', 'grupo', 'libro', 'palabra', 'fuerza', 'amor', 'paz',
  'verde', 'azul', 'rojo', 'sol', 'luna', 'mar', 'río', 'viento', 'fuego', 'luz',
  'arte', 'música', 'baile', 'juego', 'fiesta', 'viaje', 'camino', 'puerta', 'mesa',
  'papel', 'café', 'pan', 'flor', 'árbol', 'perro', 'gato', 'ave', 'pez', 'estrella'
];

interface PasswordOptions {
  mode: 'characters' | 'words';
  // Opciones para modo caracteres
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  separator: string;
  // Opciones para modo palabras
  wordCount: number;
  includeNumbers: boolean;
  capitalizeWords: boolean;
}

function generateCharacterPassword(options: PasswordOptions): string {
  let chars = '';
  if (options.includeLowercase) chars += CHARS.lowercase;
  if (options.includeUppercase) chars += CHARS.uppercase;
  if (options.includeNumbers) chars += CHARS.numbers;
  if (options.includeSymbols) chars += CHARS.symbols;

  if (!chars) return '';

  let password = '';
  
  for (let i = 0; i < options.length; i++) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    password += chars[array[0] % chars.length];
  }

  return password;
}

function generateWordPassword(options: PasswordOptions): string {
  let words = [];
  for (let i = 0; i < options.wordCount; i++) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    let word = COMMON_WORDS[array[0] % COMMON_WORDS.length].trim();
    words.push(word);
  }
  
  if (options.capitalizeWords) {
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  }
  
  if (options.includeNumbers) {
    words = words.map((word, i) => {
      if (i === words.length - 1) return word;
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return `${word}${array[0] % 100}`;
    });
  }
  
  return words.join(options.separator || '');
}

export function generatePassword(options: PasswordOptions): string {
  return options.mode === 'characters'
    ? generateCharacterPassword(options)
    : generateWordPassword(options);
}
export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length contribution
  strength += Math.min(password.length * 4, 25);
  
  // Character variety contribution
  if (/[a-z]/.test(password)) strength += 10;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
  
  // Bonus for mixed character types
  const variations = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter(pattern => 
    pattern.test(password)
  ).length;
  strength += (variations - 1) * 5;
  
  return Math.min(strength, 100);
}