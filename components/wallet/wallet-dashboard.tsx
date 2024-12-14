'use client';

import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import useWalletStore from '@/lib/store/wallet-store';
import { WalletList } from './wallet-list';
import { formatCurrency } from '@/lib/utils/currency';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function WalletDashboard() {
  const [mounted, setMounted] = useState(false);
  const { getTotalBalance } = useWalletStore();
  const totalBalance = getTotalBalance();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Gestor de Gastos</h1>
          <p className="text-muted-foreground">
            Administra tus carteras y controla tus gastos
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Balance Total
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance, 'EUR')}</div>
            <p className="text-xs text-muted-foreground">
              Suma de todas tus carteras
            </p>
          </CardContent>
        </Card>
      </div>

      <WalletList />
    </div>
  );
}