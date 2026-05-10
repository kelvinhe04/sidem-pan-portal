import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, ShieldCheck, Gavel } from "lucide-react";

const ARTICLES = [
  {
    icon: ShieldCheck,
    art: "Art. 28",
    title: "Residencia temporal",
    body: "Permite la permanencia hasta por seis (6) años. Requiere antecedentes vigentes y solvencia mínima de USD 500.",
  },
  {
    icon: FileText,
    art: "Art. 38",
    title: "Residencia permanente",
    body: "Otorgada a quienes han mantenido residencia temporal por al menos dos años continuos sin observaciones.",
  },
  {
    icon: Gavel,
    art: "Art. 50",
    title: "Causales de inadmisibilidad",
    body: "El SNM podrá rechazar la entrada por antecedentes penales, alertas internacionales o documentación falsa.",
  },
];

export function MarcoLegal() {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-institutional shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-institutional/10 p-2">
              <Scale className="h-5 w-5 text-institutional" />
            </div>
            <div>
              <CardTitle className="font-serif">Decreto Ley 3 de 2008</CardTitle>
              <p className="text-sm text-muted-foreground">Crea el Servicio Nacional de Migración y dicta normas sobre migración.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-foreground/80">
          El presente decreto regula la entrada, permanencia y salida de extranjeros del territorio nacional,
          definiendo categorías migratorias, derechos, obligaciones y mecanismos de control fronterizo conforme
          a los principios constitucionales de la República de Panamá.
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {ARTICLES.map((a) => (
          <Card key={a.art} className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2 text-gold-foreground">
                <a.icon className="h-4 w-4 text-institutional" />
                <span className="text-xs font-bold uppercase tracking-wider text-institutional">{a.art}</span>
              </div>
              <CardTitle className="text-base">{a.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{a.body}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
