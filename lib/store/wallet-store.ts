import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WalletStore } from './types';
import { Transaction } from '../types/transaction';
import { Wallet } from '../types/wallet';

const initialState: Pick<WalletStore, 'wallets' | 'transactions'> = {
  wallets: [],
  transactions: [],
};

const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addWallet: (wallet) => {
        const newWallet = {
          ...wallet,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          wallets: [...state.wallets, newWallet],
        }));
      },

      removeWallet: (id) => {
        set((state) => ({
          wallets: state.wallets.filter((w) => w.id !== id),
          transactions: state.transactions.filter(
            (t) => t.walletId !== id && t.toWalletId !== id
          ),
        }));
      },

      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: crypto.randomUUID(),
        };

        set((state) => {
          const wallets = [...state.wallets];
          const sourceWallet = wallets.find((w) => w.id === transaction.walletId);

          if (!sourceWallet) return state;

          if (transaction.type === 'transfer' && transaction.toWalletId) {
            const targetWallet = wallets.find((w) => w.id === transaction.toWalletId);
            if (!targetWallet) return state;

            sourceWallet.balance -= transaction.amount;
            targetWallet.balance += transaction.amount;
          } else {
            sourceWallet.balance += transaction.type === 'income' 
              ? transaction.amount 
              : -transaction.amount;
          }

          return {
            wallets,
            transactions: [newTransaction, ...state.transactions],
          };
        });
      },

      removeTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      getWalletBalance: (id) => {
        const { wallets } = get();
        const wallet = wallets.find((w) => w.id === id);
        return wallet?.balance || 0;
      },

      getTotalBalance: () => {
        const { wallets } = get();
        return wallets.reduce((total, wallet) => total + wallet.balance, 0);
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWalletStore;