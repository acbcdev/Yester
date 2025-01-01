'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Currency, SUPPORTED_CURRENCIES } from '@/lib/types/currency';
import { Wallet } from '@/lib/types/wallet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { formatNumber } from '@/lib/utils/number';

const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  balance: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    { message: 'Debe ser un número válido y positivo' }
  ),
  currency: z.string().min(1, 'La moneda es requerida'),
});

interface WalletFormProps {
  onSubmit: (values: Omit<Wallet, 'id'>) => void;
  onCancel: () => void;
}

export function WalletForm({ onSubmit, onCancel }: WalletFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      balance: '0',
      currency: 'EUR',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      name: values.name,
      balance: Number(values.balance),
      currency: values.currency,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva Cartera</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Mi Cartera" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance Inicial</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={(() => {
                        const currency = SUPPORTED_CURRENCIES.find(c => c.code === field.value);
                        return currency ? `1e-${currency.decimals}` : '0.01';
                      })()}
                      placeholder="0.00"
                      onChange={(e) => {
                        const formatted = formatNumber(e.target.value);
                        if (formatted !== null) {
                          field.onChange(e.target.value);
                        }
                      }}
                      value={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moneda</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una moneda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="px-2 py-1.5 text-sm font-semibold">Monedas Fiat</div>
                      <div className="h-px bg-muted my-1" />
                      {SUPPORTED_CURRENCIES
                        .filter(c => c.type === 'fiat')
                        .map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      <div className="h-px bg-muted my-1" />
                      <div className="px-2 py-1.5 text-sm font-semibold">Criptomonedas</div>
                      <div className="h-px bg-muted my-1" />
                      {SUPPORTED_CURRENCIES
                        .filter(c => c.type === 'crypto')
                        .map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Crear Cartera</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}