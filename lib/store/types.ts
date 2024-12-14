import { Transaction } from '../types/transaction';
import { Wallet } from '../types/wallet';

export interface WalletStore {
  wallets: Wallet[];
  transactions: Transaction[];
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  removeWallet: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
  getWalletBalance: (id: string) => number;
  getTotalBalance: () => number;
}