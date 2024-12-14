'use client';

import { useEffect, useState } from 'react';
import { PlusCircle, Wallet as WalletIcon, ArrowRightLeft } from 'lucide-react';
import useWalletStore from '@/lib/store/wallet-store';
import { Button } from '../ui/button';
import { Wallet } from '@/lib/types/wallet';
import { formatCurrency } from '@/lib/utils/currency';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { WalletForm } from './wallet-form';
import { TransactionList } from '../transaction/transaction-list';
import { TransactionDialog } from '../transaction/transaction-dialog';

export function WalletList() {
  const [mounted, setMounted] = useState(false);
  const { wallets, addWallet, removeWallet } = useWalletStore();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const { addTransaction } = useWalletStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleAddWallet = (wallet: Omit<Wallet, 'id'>) => {
    addWallet(wallet);
    setIsCreating(false);
  };
  
  const handleRemoveWallet = (id: string) => {
    removeWallet(id);
    if (selectedWallet?.id === id) {
      setSelectedWallet(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Mis Carteras</h2>
        <Button 
          onClick={() => setIsCreating(true)} 
          className="flex items-center gap-2"
          size="lg"
        >
          <WalletIcon className="h-5 w-5" /> Añadir Cartera
        </Button>
      </div>

      {isCreating && (
        <WalletForm onSubmit={handleAddWallet} onCancel={() => setIsCreating(false)} />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wallets.map((wallet) => (
          <Card key={wallet.id}>
            <CardHeader>
              <CardTitle>{wallet.name}</CardTitle>
              <CardDescription>Balance actual</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(wallet.balance, wallet.currency)}
              </p>
              <div className="mt-4 flex gap-2">
                <TransactionDialog
                  wallet={wallet}
                  wallets={wallets}
                  onSubmit={addTransaction}
                  trigger={
                    <Button
                      className="flex-1 flex items-center gap-2"
                      variant="secondary"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Añadir Movimiento
                    </Button>
                  }
                />
                <Button
                  className="flex-1 flex items-center gap-2"
                  variant="outline"
                  onClick={() => setSelectedWallet(wallet)}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Transferir
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedWallet(selectedWallet?.id === wallet.id ? null : wallet)}
              >
                {selectedWallet?.id === wallet.id ? 'Ocultar movimientos' : 'Ver movimientos'}
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleRemoveWallet(wallet.id)}
              >
                Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {selectedWallet && (
        <div className="mt-8">
          <TransactionList 
            wallet={selectedWallet} 
            wallets={wallets} 
            onAddTransaction={addTransaction}
          />
        </div>
      )}
    </div>
  );
}