'use client';

interface ExpensesLayoutProps {
  children: React.ReactNode;
}

export default function ExpensesLayout({ children }: ExpensesLayoutProps) {
  return (
    <div className="h-full space-y-4">
      <div className="border-b pb-4">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Gastos</h2>
        <p className="text-muted-foreground">
          Administra tus gastos, ingresos y presupuestos
        </p>
      </div>
      {children}
    </div>
  );
}