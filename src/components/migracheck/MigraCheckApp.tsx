import { useState } from "react";
import { LoginView } from "./LoginView";
import { AppShell } from "./AppShell";

export type View = "login" | "solicitante" | "agente" | "admin";

export function MigraCheckApp() {
  const [currentView, setCurrentView] = useState<View>("login");

  if (currentView === "login") {
    return <LoginView onLogin={(v) => setCurrentView(v)} switchView={setCurrentView} />;
  }
  return <AppShell role={currentView} switchView={setCurrentView} />;
}
