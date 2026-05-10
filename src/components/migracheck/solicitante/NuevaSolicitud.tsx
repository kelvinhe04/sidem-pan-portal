import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, Send, ChevronLeft, ChevronRight, AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Datos de Identidad", "Declaración de Solvencia", "Carga de Antecedentes"];

export function NuevaSolicitud() {
  const [step, setStep] = useState(0);
  const [solvencia, setSolvencia] = useState("");
  const solvenciaInvalid = solvencia !== "" && Number(solvencia) < 500;

  return (
    <Card className="mx-auto max-w-3xl shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="font-serif">Wizard de Evaluación Migratoria</CardTitle>
        <div className="mt-4 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                  i < step && "border-success bg-success text-success-foreground",
                  i === step && "border-institutional bg-institutional text-gold",
                  i > step && "border-border bg-background text-muted-foreground",
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className="hidden flex-1 sm:block">
                <p className={cn("text-xs font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>
                  Paso {i + 1}
                </p>
                <p className={cn("text-[11px]", i === step ? "text-institutional" : "text-muted-foreground")}>
                  {label}
                </p>
              </div>
              {i < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {step === 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombres</Label>
              <Input placeholder="María Isabel" />
            </div>
            <div className="space-y-2">
              <Label>Apellidos</Label>
              <Input placeholder="Fernández López" />
            </div>
            <div className="space-y-2">
              <Label>Nacionalidad</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Seleccione país" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="co">Colombia</SelectItem>
                  <SelectItem value="ve">Venezuela</SelectItem>
                  <SelectItem value="ec">Ecuador</SelectItem>
                  <SelectItem value="es">España</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>N.º de Pasaporte</Label>
              <Input placeholder="AB123456" className="font-mono uppercase" />
            </div>
            <div className="space-y-2">
              <Label>Fecha de nacimiento</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Categoría migratoria</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Seleccione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rt">Residencia temporal (Art. 28)</SelectItem>
                  <SelectItem value="rp">Residencia permanente (Art. 38)</SelectItem>
                  <SelectItem value="tu">Turismo prolongado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <Alert className="border-institutional/20 bg-institutional/5">
              <AlertCircle className="h-4 w-4 text-institutional" />
              <AlertTitle className="text-institutional">Requisito legal</AlertTitle>
              <AlertDescription>
                Debe declarar fondos por al menos <strong>USD 500.00</strong> conforme al Art. 28 del Decreto Ley 3/2008.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Monto declarado (USD)</Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="500.00"
                  value={solvencia}
                  onChange={(e) => setSolvencia(e.target.value)}
                  className={cn("font-mono", solvenciaInvalid && "border-danger ring-danger")}
                />
                {solvenciaInvalid && (
                  <p className="text-xs text-danger">Monto insuficiente. Mínimo USD 500.00.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Entidad bancaria</Label>
                <Input placeholder="Banco General" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>N.º de cuenta o referencia</Label>
                <Input placeholder="04-XXXX-XXXX" className="font-mono" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Label>Antecedentes penales (PDF, máx. 5MB)</Label>
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-12 text-center transition-colors hover:border-institutional hover:bg-institutional/5">
              <div className="rounded-full bg-institutional/10 p-3">
                <UploadCloud className="h-6 w-6 text-institutional" />
              </div>
              <div>
                <p className="text-sm font-medium">Arrastre el archivo aquí o haga clic para seleccionar</p>
                <p className="text-xs text-muted-foreground">Solo se admite formato PDF · Tamaño máximo 5 MB</p>
              </div>
              <Button variant="outline" size="sm">Seleccionar archivo</Button>
            </div>
            <Alert className="border-warning/30 bg-warning/10">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-foreground/80">
                El documento debe estar apostillado y vigente (no mayor a 6 meses).
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>

      <div className="flex items-center justify-between border-t bg-muted/30 px-6 py-4">
        <Button
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
        </Button>
        {step < STEPS.length - 1 ? (
          <Button
            className="bg-institutional text-gold hover:bg-institutional-hover"
            onClick={() => setStep((s) => s + 1)}
          >
            Siguiente <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
            <Send className="mr-2 h-4 w-4" /> Someter Evaluación
          </Button>
        )}
      </div>
    </Card>
  );
}
