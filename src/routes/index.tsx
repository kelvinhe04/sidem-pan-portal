import { createFileRoute } from "@tanstack/react-router";
import { MigraCheckApp } from "@/components/migracheck/MigraCheckApp";

export const Route = createFileRoute("/")({
  component: MigraCheckApp,
});
