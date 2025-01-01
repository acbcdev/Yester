export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  toWalletId?: string; // For transfers
}

export const EXPENSE_CATEGORIES = [
  'Alimentación',
  'Transporte',
  'Vivienda',
  'Servicios',
  'Ocio',
  'Salud',
  'Educación',
  'Ropa',
  'Tecnología',
  'Otros',
] as const;

export const INCOME_CATEGORIES = [
  'Salario',
  'Inversiones',
  'Freelance',
  'Regalo',
  'Reembolso',
  'Otros',
] as const;