'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CredentialsList } from '@/components/credentials/credentials-list';
import { PasswordGenerator } from '@/components/credentials/password-generator';

export default function CredentialsPage() {

  return (
    <div className="h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestión de Claves</h2>
            <p className="text-muted-foreground">
              Administra tus credenciales de forma segura
            </p>
          </div>
        </div>
        <Tabs defaultValue="credentials" className="space-y-4">
          <TabsList>
            <TabsTrigger value="credentials">Credenciales</TabsTrigger>
            <TabsTrigger value="generator">Generador de Contraseñas</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials">
            <CredentialsList />
          </TabsContent>
          <TabsContent value="generator">
            <div className="max-w-xl mx-auto">
              <PasswordGenerator />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}