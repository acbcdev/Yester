'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { TransactionDialog } from './transaction-dialog';
import useWalletStore from '@/lib/store/wallet-store';
import { Wallet } from '@/lib/types/wallet';
import { formatCurrency } from '@/lib/utils/currency';
import { Transaction } from '@/lib/types/transaction';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface TransactionListProps {
  wallet: Wallet;
  wallets: Wallet[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionList({ wallet, wallets, onAddTransaction }: TransactionListProps) {
  const { transactions } = useWalletStore();

  const filteredTransactions = transactions.filter(
    (t) => t.walletId === wallet.id || t.toWalletId === wallet.id
  );

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return 'text-green-600 dark:text-green-400';
      case 'expense':
        return 'text-red-600 dark:text-red-400';
      case 'transfer':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return '';
    }
  };

  const getTransactionAmount = (transaction: Transaction) => {
    const amount = formatCurrency(transaction.amount, wallet.currency);
    return transaction.type === 'expense' ? `-${amount}` : amount;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Movimientos</h2>
          <p className="text-sm text-muted-foreground">
            Gestiona los gastos, ingresos y transferencias de tu cartera
          </p>
        </div>
        <TransactionDialog
          wallet={wallet}
          wallets={wallets}
          onSubmit={onAddTransaction}
        />
      </div>

      {filteredTransactions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(new Date(transaction.date), 'PPP', { locale: es })}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className={cn('text-right', getTransactionColor(transaction.type))}>
                  {getTransactionAmount(transaction)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No hay transacciones registradas
        </div>
      )}
    </div>
  );
}