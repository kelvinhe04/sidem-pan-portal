
# SIDEM-PAN: MigraCheck — Plan de Implementación

SPA institucional para el Servicio Nacional de Migración de Panamá, con 4 vistas (login, solicitante, agente, admin), sidebar dinámico por rol y subpáginas navegables internamente.

## Arquitectura

- **Stack**: TanStack Start (ya configurado) + shadcn/ui + Tailwind + Lucide.
- **Navegación**: una sola ruta `/` que renderiza un componente raíz `<MigraCheckApp />` con estado local `currentView` (`'login' | 'solicitante' | 'agente' | 'admin'`) y, dentro de cada rol, estado `currentPage` para la subpágina activa.
- **Logo institucional**: copiar el escudo subido a `src/assets/escudo-panama.png` y usarlo en login + cabecera del sidebar.
- Sin backend ni Lovable Cloud — todo es UI con datos mock (cumple "interactiva", no requiere persistencia).

## Sistema de diseño (src/styles.css)

Tokens semánticos en `oklch`:
- `--institutional` (azul marino profundo, ~blue-950)
- `--institutional-foreground` (blanco)
- `--gold` / `--gold-foreground` (amarillo oficial para acentos y CTAs)
- `--surface` (slate-100 para fondo principal)
- Estados: `--success` (verde aprobar), `--danger` (rojo rechazar), `--warning` (naranja subsanación)
- Tipografía formal: pareja **Libre Baskerville (display) + IBM Plex Sans (body)** vía Google Fonts en `__root.tsx`.
- Bordes `rounded-md`/`rounded-lg`, sombras `shadow-md` en tarjetas.

Todos los colores se aplican vía clases semánticas (`bg-institutional`, `text-gold`, etc.), nada hardcodeado en componentes.

## Estructura de archivos

```text
src/
  routes/
    __root.tsx            (head + fuentes)
    index.tsx             (renderiza <MigraCheckApp />)
  components/
    migracheck/
      MigraCheckApp.tsx   (estado currentView, layout switcher)
      LoginView.tsx       (split-screen)
      AppShell.tsx        (sidebar + main wrapper para roles)
      Sidebar.tsx         (dinámico + "Menú de Pruebas" abajo)
      Brand.tsx           (escudo + texto "República de Panamá - SNM")
      solicitante/
        Inicio.tsx
        NuevaSolicitud.tsx   (wizard 3 pasos)
        MisTramites.tsx
        MarcoLegal.tsx
      agente/
        ColaAuditoria.tsx    (split interno + semáforo + visor PDF mock)
        CasosPendientes.tsx
        HistorialDictamenes.tsx
      admin/
        MetricasSNM.tsx      (cards + barras con recharts)
        ListasControl.tsx    (upload CSV)
        CuentasAgentes.tsx   (tabla CRUD mock)
        Trazabilidad.tsx     (log inmutable)
  styles.css                 (tokens institucionales)
  assets/escudo-panama.png
```

## Detalle por pantalla

**Login (split 50/50)**
- Izquierda azul marino con escudo grande amarillo y texto institucional.
- Derecha blanca con `<Tabs>` Ciudadano / Institucional, inputs formales, alerta de seguridad en tab institucional.

**Solicitante** — sidebar: Inicio · Nueva Solicitud · Mis Trámites · Marco Legal
- Inicio: tarjeta de bienvenida + stepper de estado del trámite.
- Nueva Solicitud: wizard con `Stepper` propio, dropzone visual (sin upload real), validación de solvencia ≥ USD 500.
- Mis Trámites: `<Table>` con tickets mock y `<Badge>` de estado.
- Marco Legal: resumen del Decreto Ley 3 de 2008 en tarjetas.

**Agente** — sidebar: Cola de Auditoría · Casos Pendientes · Historial de Dictámenes
- Cola de Auditoría: grid 2 columnas. Izq: ficha expediente #PAN-2026-8942, semáforo de riesgo con `<Badge>`, grid de datos, `<Textarea>` justificación. Der: rectángulo oscuro "Visor PDF". Abajo: 3 botones (Aprobar verde, Rechazar rojo, Subsanar naranja).
- Casos Pendientes: lista de cards con motivo de devolución.
- Historial: tabla de dictámenes pasados.

**Admin** — sidebar: Métricas SNM · Listas de Control · Cuentas de Agentes · Trazabilidad
- Métricas: 4 KPI cards + gráfico de barras (recharts ya disponible vía shadcn chart).
- Listas de Control: dropzone para CSV + tabla de listas sincronizadas.
- Cuentas de Agentes: tabla CRUD con dialog de alta/baja.
- Trazabilidad: tabla densa monoespaciada (ID Log, Agente, Acción, Timestamp) con badge "Inmutable".

## Sidebar

- Ancho fijo 260px, fondo `bg-institutional`, texto blanco, item activo con barra lateral amarilla y `bg-institutional/80`.
- Cabecera: escudo + "República de Panamá – SNM" + subtítulo "SIDEM-PAN".
- Items cambian según rol (arrays declarados por rol).
- Footer: bloque "Menú de Pruebas" con 4 botones pequeños para forzar `currentView`.

## Notas

- Toda la navegación entre subpáginas es estado local (`useState`), sin rutas adicionales — coherente con el requisito de SPA con vistas conmutables.
- Datos mock en archivos `*.mock.ts` para tablas y métricas.
- Accesibilidad: labels en inputs, roles en nav, contraste AA en azul/amarillo.
