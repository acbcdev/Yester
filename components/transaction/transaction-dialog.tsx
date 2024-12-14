'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { TransactionForm } from './transaction-form';
import { Transaction } from '@/lib/types/transaction';
import { Wallet } from '@/lib/types/wallet';
import { useState } from 'react';

interface TransactionDialogProps {
  wallet: Wallet;
  wallets: Wallet[];
  onSubmit: (values: Omit<Transaction, 'id'>) => void;
  trigger: React.ReactNode;
}

export function TransactionDialog({ wallet, wallets, onSubmit, trigger }: TransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: Omit<Transaction, 'id'>) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nuevo Movimiento</DialogTitle>
          <DialogDescription>
            Añade un nuevo movimiento a tu cartera
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          wallet={wallet}
          wallets={wallets}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}