'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Key, ExternalLink, Copy, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEnterpriseStore } from '@/lib/store/enterprise-store';
import { CredentialForm } from './credential-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function CredentialsList() {
  const [mounted, setMounted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const { credentials, addCredential, removeCredential } = useEnterpriseStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleAddCredential = async (values: any) => {
    try {
      await addCredential(values);
      setIsCreating(false);
      toast({
        title: 'Credencial creada',
        description: 'La credencial se ha guardado correctamente',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo crear la credencial',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado',
      description: `${type} copiado al portapapeles`,
    });
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Credenciales</h2>
          <p className="text-sm text-muted-foreground">
            Gestiona tus credenciales de forma segura
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" /> Nueva Credencial
        </Button>
      </div>

      {isCreating && (
        <CredentialForm
          onSubmit={handleAddCredential}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {credentials.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Mis Credenciales</CardTitle>
            <CardDescription>
              Lista de todas tus credenciales guardadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Contraseña</TableHead>
                  <TableHead>Nivel de Acceso</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credentials.map((credential) => (
                  <TableRow key={credential.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        {credential.name}
                      </div>
                    </TableCell>
                    <TableCell>{credential.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {credential.username}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(credential.username, 'Usuario')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">
                          {showPasswords[credential.id] ? '********' : '••••••••'}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePasswordVisibility(credential.id)}
                        >
                          {showPasswords[credential.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{credential.accessLevel}</TableCell>
                    <TableCell>
                      {format(new Date(credential.lastUpdated), 'PPP', {
                        locale: es,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {credential.url && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(credential.url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeCredential(credential.id)}
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No hay credenciales guardadas
        </div>
      )}
    </div>
  );
}