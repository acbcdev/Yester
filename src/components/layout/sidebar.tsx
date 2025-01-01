'use client';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallet, ArrowLeftRight, LineChart, Settings, History, KeyRound, FileText } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { usePathname } from 'next/navigation';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: 'Dashboard',
      icon: LineChart,
      href: '/',
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-400/10',
    },
    {
      label: 'Carteras',
      icon: Wallet,
      href: '/expenses',
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-500/10 dark:bg-blue-400/10',
    },
    {
      label: 'Claves',
      icon: KeyRound,
      href: '/credentials',
      color: 'text-violet-500 dark:text-violet-400',
      bgColor: 'bg-violet-500/10 dark:bg-violet-400/10',
    },
    {
      label: 'Configuración',
      icon: Settings,
      href: '/settings',
      color: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-500/10 dark:bg-rose-400/10',
    },
  ];

  return (
    <div className={cn(
      'pb-12 min-h-screen',
      'bg-background',
      'transition-all duration-300 ease-in-out',
      className
    )}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-foreground">
            Yester
          </h2>
          <p className="px-4 text-xs text-muted-foreground">
            Gestión inteligente de tu dinero
          </p>
          <div className="px-3 mb-2">
            <ThemeToggle />
          </div>
        </div>
        <ScrollArea className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer',
                  'rounded-lg transition-all duration-200 ease-in-out',
                  'hover:bg-accent/50 hover:text-accent-foreground',
                  pathname === route.href && route.bgColor,
                  pathname === route.href ? route.color : 'text-muted-foreground'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}