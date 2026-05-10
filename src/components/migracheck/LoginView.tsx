import escudo from "@/assets/escudo-panama.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Lock, KeyRound } from "lucide-react";
import type { View } from "./MigraCheckApp";
import { TestMenu } from "./TestMenu";

export function LoginView({
  onLogin,
  switchView,
}: {
  onLogin: (v: View) => void;
  switchView: (v: View) => void;
}) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      {/* Branding side */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-institutional p-12 text-institutional-foreground lg:flex">
        <div className="flex items-center gap-3">
          <img src={escudo} alt="Escudo" className="h-10 w-10 object-contain" />
          <div className="leading-tight">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">República de Panamá</p>
            <p className="text-sm font-medium">Servicio Nacional de Migración</p>
          </div>
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-8 rounded-full bg-gold/10 p-8 ring-1 ring-gold/30">
            <img src={escudo} alt="Escudo institucional" className="h-40 w-40 object-contain" />
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight">SIDEM-PAN</h1>
          <p className="mt-3 max-w-md text-balance text-base text-institutional-foreground/80">
            Sistema Inteligente de Evaluación Migratoria.
          </p>
          <p className="mt-6 max-w-sm border-t border-gold/30 pt-6 font-serif text-sm italic text-gold">
            "Protegiendo nuestras fronteras."
          </p>
        </div>

        <p className="text-xs text-institutional-foreground/50">
          Plataforma oficial conforme al Decreto Ley 3 de 2008 · v2.4.1
        </p>

        {/* subtle decorative grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </aside>

      {/* Form side */}
      <main className="flex items-center justify-center bg-background p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-serif text-2xl font-bold text-foreground">Acceso al sistema</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Seleccione el tipo de credencial para continuar.
            </p>
          </div>

          <Tabs defaultValue="ciudadano" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ciudadano">Ciudadano Extranjero</TabsTrigger>
              <TabsTrigger value="institucional">Acceso Institucional</TabsTrigger>
            </TabsList>

            <TabsContent value="ciudadano" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="solicitante@ejemplo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass">Contraseña</Label>
                <Input id="pass" type="password" placeholder="••••••••" />
              </div>
              <Button
                className="w-full bg-institutional text-gold hover:bg-institutional-hover"
                onClick={() => onLogin("solicitante")}
              >
                <Lock className="mr-2 h-4 w-4" /> Ingresar al Portal
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                ¿Primera vez? <a className="font-medium text-institutional underline-offset-2 hover:underline" href="#">Cree su expediente migratorio</a>
              </p>
            </TabsContent>

            <TabsContent value="institucional" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent">ID de Agente</Label>
                <Input id="agent" placeholder="SNM-A-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apass">Contraseña institucional</Label>
                <Input id="apass" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">Token 2FA</Label>
                <Input id="otp" inputMode="numeric" maxLength={6} placeholder="000000" className="font-mono tracking-widest" />
              </div>
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90"
                onClick={() => onLogin("agente")}
              >
                <KeyRound className="mr-2 h-4 w-4" /> Acceder al Sistema
              </Button>
              <Alert className="border-warning/40 bg-warning/10 text-warning-foreground">
                <ShieldAlert className="h-4 w-4 text-danger" />
                <AlertTitle className="text-danger">Aviso de seguridad</AlertTitle>
                <AlertDescription className="text-foreground/80">
                  Solo personal autorizado. Acceso estrictamente auditado conforme al Decreto Ley 3/2008.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>

          <div className="mt-10">
            <TestMenu current="login" onChange={switchView} variant="light" />
          </div>
        </div>
      </main>
    </div>
  );
}
