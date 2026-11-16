"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:border-foreground"
    >
      <Printer aria-hidden="true" className="size-4" />
      Print or save as PDF
    </button>
  );
}
